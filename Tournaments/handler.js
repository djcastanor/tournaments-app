const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");

require('dotenv').config();

const TournamentsRepository = require('./infraestruture/TournamentRepository');
const GetAllTournamentsUseCase = require('./application/use_cases/getAllTournamentsUseCase');
const CreateTournamentUseCase = require('./application/use_cases/CreateTournamentUseCase');
const TicketRepository =require('./infraestruture/TicketRepository');
const authMiddleware = require('./interfaces/http/middleware/authMiddleware');
const authRoutes = require('./interfaces/routes/authRoutes');

const repo = new TournamentsRepository();
const ticketRepo = new TicketRepository();

const express = require("express");
const serverless = require("serverless-http");
const BuyTicketUseCase = require("./application/use_cases/BuyTicketUseCase");

const app = express();

const TOURNAMENTS_TABLE = process.env.TOURNAMENTS_TABLE;
const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

app.use(express.json());
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
})

app.get('/tournaments', authMiddleware, async(req, res) => {
    const useCase = new GetAllTournamentsUseCase(repo);
    const result = await useCase.execute();
    res.status(200).json(result);
})

app.post('/tournaments', authMiddleware, async(req, res) => {
  const { name, description, category, responsible,price , startDate, endDate } = req.body;

  try {
    const useCase = new CreateTournamentUseCase(repo);
    const newTournament = await useCase.execute({ name, description, category, responsible, price,startDate, endDate });

    res.status(201).json(newTournament);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al guardar torneo' });
  }
});

app.post('/tournaments/:tournamentId/tickets', authMiddleware, async(req, res) => {
  const { tournamentId } = req.params;
  const { buyer } = req.body;

  try {
    const useCase = new BuyTicketUseCase(ticketRepo);
    const ticket = await useCase.execute({ tournamentId, buyer });
    res.status(201).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al vender ticket' });
  }
});

app.get("/users/:userId", async (req, res) => {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  };

  try {
    const command = new GetCommand(params);
    const { Item } = await docClient.send(command);
    if (Item) {
      const { userId, name } = Item;
      res.json({ userId, name });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find user with provided "userId"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retrieve user" });
  }
});

app.post("/users", async (req, res) => {
  const { userId, name } = req.body;
  if (typeof userId !== "string") {
    res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: USERS_TABLE,
    Item: { userId, name },
  };

  try {
    const command = new PutCommand(params);
    await docClient.send(command);
    res.json({ userId, name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create user" });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
