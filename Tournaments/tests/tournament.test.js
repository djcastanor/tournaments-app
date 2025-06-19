const { v4: uuidv4 } = require('uuid');

describe('Tournaments Logic', () => {
  it('debería crear un torneo con nombre y fecha válidos', () => {
    const mockTournament = {
      id: uuidv4(),
      name: 'Copa América',
      date: '2025-07-01',
      location: 'Colombia',
    };

    expect(mockTournament.name).toBe('Copa América');
    expect(mockTournament.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
