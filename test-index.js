const { KhmerChess } = require("./index");

// const kc = new KhmerChess('bhgqkghb/8/1ff5/8/8/FFFFFFFF/8/BHGKQGHB w ---- -- -.- ffffff');
const kc = new KhmerChess('4k3/8/8/8/8/8/8/3K4 w ---- -- -.- bhgqghbffffffffFFFFFFFFBHGQGHB');
// console.log(kc.ren());
console.log(kc.ascii());
// console.log(kc.board());
// console.log(kc.validate_ren('bhgqkghb/8/1ff5/8/8/FFFFFFFF/8/BHGKQGHB w ---- -- -.- ffffffK'));