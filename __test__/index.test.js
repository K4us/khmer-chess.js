const KhmerChess = require('..').KhmerChess;

test('KhmerChess', () => {
    let kChess = new KhmerChess();
    expect(kChess.game_over()).toBe(false);
});