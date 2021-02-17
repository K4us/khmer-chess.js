const KhmerChess = require('../index').KhmerChess;

test('KhmerChess', () => {
    const kChess = new KhmerChess();
    expect(kChess.game_over()).toBe(false);
});
