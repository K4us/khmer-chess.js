var KhmerChess = function() {
  this.game_over = function(){
    return false;
  };
  return this;
};

/* export KhmerChess object if using node or any other CommonJS compatible
 * environment */
if (typeof exports !== 'undefined') exports.KhmerChess = KhmerChess
/* export KhmerChess object for any RequireJS compatible environment */
if (typeof define !== 'undefined')
  define(function() {
    return KhmerChess
  })
