!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var i in n)("object"==typeof exports?exports:t)[i]=n[i]}}(self,(function(){return(()=>{"use strict";var t={497:(t,e,n)=>{function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var o=n(163).KPGN,s=n(620),c=n(490),a=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),r(this,"moveHelper",new s),r(this,"renInstance",c.toRen()),r(this,"kpgnInstance",new o),this.renInstance=c.toRen(e)}var e,n;return e=t,(n=[{key:"load",value:function(t){this.renInstance=c.toRen(t)}},{key:"reset",value:function(){this.renInstance=c.toRen()}},{key:"moves",value:function(){return[]}},{key:"in_check",value:function(){return null}},{key:"in_checkmate",value:function(){return null}},{key:"in_stalemate",value:function(){return null}},{key:"in_draw",value:function(){return!1}},{key:"in_draw_count",value:function(){return null}},{key:"game_over",value:function(){return!1}},{key:"validate_ren",value:function(t){try{return c.toRen(t),{valid:!0,error_number:0,error:"No errors."}}catch(t){return{valid:!1,error_number:1,error:t.message}}}},{key:"ren",value:function(){return this.renInstance.toString()}},{key:"board",value:function(){return this.renInstance.board.toMultiArray()}},{key:"kpgn",value:function(){return this.kpgnInstance.toJson()}},{key:"load_kpgn",value:function(t,e){this.kpgnInstance=new o(t)}},{key:"ascii",value:function(){var t=this.renInstance.board.toMultiArray(),e=t.reduce((function(e,n,i){var r=n.map((function(t){return" ".concat(t?t.toString():" "," ")})).join("┃"),o=i==t.length-1?"┗━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┛":"┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫";return e+"\n".concat(8-i," ┃").concat(r,"┃\n  ").concat(o)}),"  ┏━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┓"),n=this.renInstance.graveyard.pieces.map((function(){return"━━━"})).join("┳"),i=this.renInstance.graveyard.pieces.map((function(t){return" ".concat(t?t.toString():" "," ")})).join("┃"),r=this.renInstance.graveyard.pieces.map((function(){return"━━━"})).join("┻"),o="  ┏".concat(n,"┓\n  ┃").concat(i,"┃\n  ┗").concat(r,"┛");return"".concat(e,"\n    a   b   c   d   e   f   g   h\n").concat(o)}},{key:"turn",value:function(){this.renInstance.turn}},{key:"move",value:function(t){}},{key:"undo",value:function(){return!1}},{key:"clear",value:function(){this.renInstance=c.toRen("4k3/8/8/8/8/8/8/3K4 w ---- -- -.- bhgqghbffffffffFFFFFFFFBHGQGHB")}},{key:"put",value:function(t,e){return null}},{key:"get",value:function(t){return null}},{key:"remove",value:function(t){return null}},{key:"history",value:function(){return this.kpgnInstance.moves}},{key:"addUpdateRenderEventListener",value:function(t){}},{key:"removeUpdateRenderEventListener",value:function(t){}}])&&i(e.prototype,n),t}();t.exports={KhmerChess:a}},163:(t,e,n)=>{function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function o(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var c=n(218).REN,a=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";i(this,t),s(this,"name",""),s(this,"id",""),this.id=e,this.name=n}return o(t,[{key:"toJson",value:function(){return{id:this.id,name:this.name}}}]),t}(),u=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;i(this,t),s(this,"win",0),s(this,"draw",0),s(this,"lost",0),this.win=e,this.draw=n,this.lost=r}return o(t,[{key:"toJson",value:function(){return{win:this.win,draw:this.draw,lost:this.lost}}}]),t}(),h=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";i(this,t),s(this,"from",""),s(this,"to",""),s(this,"jump",!1),s(this,"capture",""),this.from=e,this.to=n,this.jump=r,this.capture=o}return o(t,[{key:"toJson",value:function(){return{from:this.from,to:this.to,jump:this.jump,capture:this.capture}}}]),t}(),l=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;i(this,t),s(this,"totalSecond",0),s(this,"currentWhite",0),s(this,"currentBlack",0),this.totalSecond=e,this.currentWhite=n,this.currentBlack=r}return o(t,[{key:"toJson",value:function(){return{totalSecond:this.totalSecond,currentWhite:this.currentWhite,currentBlack:this.currentBlack}}}]),t}(),E=function(){function t(e){i(this,t),s(this,"event",""),s(this,"date",""),s(this,"location",""),s(this,"players",{white:new a,black:new a}),s(this,"result",{last:{whiteWin:!1,blackWin:!1},white:new u}),s(this,"moves",[new h]),s(this,"ren",new c),s(this,"timer",new l)}return o(t,[{key:"toJson",value:function(){return{event:this.event,date:this.date,location:this.location,players:{white:this.players.white.toJson(),black:this.players.black.toJson()},result:{last:{whiteWin:this.result.last.whiteWin,blackWin:this.result.last.blackWin},white:this.result.white.toJson()},moves:this.moves.map((function(t){return t.toJson()})),ren:this.ren.toString(),timer:this.timer.toJson()}}}]),t}();t.exports={KPGN:E,Player:a,Result:u,Move:h,Timer:l}},218:(t,e,n)=>{function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function o(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var c=n(806).PIECE_TYPE_BORK,a=n(806),u=n(659),h="bhgqkghb/8/ffffffff/8/8/FFFFFFFF/8/BHGKQGHB",l="-",E=function(){function t(e,n){i(this,t),s(this,"type",a.PIECE_TYPE_TREY),s(this,"color",a.PIECE_COLOR_WHITE),u.isUndefined(n)&&(u.isUndefined(e)&&(e=a.toWhitePiece(a.PIECE_TYPE_TREY)),n=u.isUpperCase(e)?a.PIECE_COLOR_WHITE:a.PIECE_COLOR_BLACK,e=e.toLowerCase()),this.type=e,this.color=n}return o(t,[{key:"toOrigin",value:function(){return this.type==c?new t(this.color,a.PIECE_TYPE_TREY):this}},{key:"toString",value:function(){var t=this.type;return a.isWhite(this.color)&&(t=a.toWhitePiece(t)),t}}]),t}(),P=function(){function t(e,n,r){i(this,t),s(this,"h","a"),s(this,"v",1),s(this,"x",0),s(this,"y",0),s(this,"p",new E),this.p=e,u.isUndefined(r)&&(r=n.v,n=n.h),this.h=n,this.v=r,this.x=a.HORIZONTAL_CODE_LETTERS.indexOf(this.h),this.y=this.v-1}return o(t,[{key:"toString",value:function(){return"".concat(this.toPString()).concat(this.h).concat(this.v)}},{key:"toPString",value:function(){return u.isNull(this.p)?a.EMPTY_PIECE:this.p.toString()}}]),t}(),f=function(){function t(e){i(this,t),s(this,"poses",Array.from({length:a.getSubBoardNumber()},(function(t,e){var n=a.numToCodeP(e);return new P(null,n)}))),u.isUndefined(e)&&(e=h);var n=this.extract(e).replace(/\//g,"");if(n.length<a.getSubBoardNumber()||!a.isValidPiecesString(n))throw new Error("Invalid board string ".concat(e));this.poses=n.split("").map((function(t,e){var n=a.numToCodeP(e);return new P(t==a.EMPTY_PIECE?null:new E(t),n)}))}return o(t,[{key:"toMultiArray",value:function(){var t=[[],[],[],[],[],[],[],[]];return this.poses.forEach((function(e){t[e.y][e.x]=e.p})),t}},{key:"compress",value:function(t){var e=new RegExp("(\\".concat(a.EMPTY_PIECE,"+)"),"g");return t.replace(e,(function(t){return t.length}))}},{key:"extract",value:function(t){return t.replace(/(\d+)/g,(function(t){return Array.from({length:t},(function(){return a.EMPTY_PIECE})).join("")}))}},{key:"toStringFull",value:function(){return this.poses.map((function(t,e){var n=t.toPString();return e&&e%8==0&&e!=a.getSubBoardNumber()?"".concat(a.BOARD_SEPARATOR).concat(n):n})).join("")}},{key:"toString",value:function(){var t=this.toStringFull();return this.compress(t)}}]),t}(),g=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";i(this,t),s(this,"whiteKing",!1),s(this,"whiteQueen",!1),s(this,"blackKing",!1),s(this,"blackQueen",!1);var n=a;this.whiteKing=!!~e.indexOf(n.toWhitePiece(n.PIECE_TYPE_SDECH)),this.whiteQueen=!!~e.indexOf(n.toWhitePiece(n.PIECE_TYPE_NEANG)),this.blackKing=!!~e.indexOf(n.PIECE_TYPE_SDECH),this.blackQueen=!!~e.indexOf(n.PIECE_TYPE_NEANG)}return o(t,[{key:"toString",value:function(){var t="".concat(this.whiteKing?a.toWhitePiece(a.PIECE_TYPE_SDECH):l);return t+="".concat(this.whiteQueen?a.toWhitePiece(a.PIECE_TYPE_NEANG):l),(t+="".concat(this.blackKing?a.PIECE_TYPE_SDECH:l))+"".concat(this.blackQueen?a.PIECE_TYPE_NEANG:l)}}]),t}(),C=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";i(this,t),s(this,"whiteKing",!1),s(this,"blackKing",!1);var n=a;this.whiteKing=!!~e.indexOf(n.toWhitePiece(n.PIECE_TYPE_SDECH)),this.blackKing=!!~e.indexOf(n.PIECE_TYPE_SDECH)}return o(t,[{key:"toString",value:function(){return"".concat(this.whiteKing?a.toWhitePiece(a.PIECE_TYPE_SDECH):l)+"".concat(this.blackKing?a.PIECE_TYPE_SDECH:l)}}]),t}(),_=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";i(this,t),s(this,"white",null),s(this,"black",null);var n=e.split(".");if(this.white=u.isStringNumber(n[0])?Number(n[0]):null,this.black=u.isStringNumber(n[1])?Number(n[1]):null,!u.isNull(this.white)&&!u.isNull(this.white))throw new Error("Invalid countdown string ".concat(e))}return o(t,[{key:"toString",value:function(){return"".concat(u.isNull(this.white)?l:this.white)+".".concat(u.isNull(this.black)?l:this.black)}}]),t}(),v=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(i(this,t),s(this,"pieces",[]),e.length>30||!a.isValidPiecesString(e,!0))throw new Error("Invalid graveyard string ".concat(e));this.pieces=e.split("").map((function(t,n){var i=new E(t);if(i.type==a.PIECE_TYPE_SDECH)throw new Error("King cannot die graveyard:".concat(e));return i}))}return o(t,[{key:"toString",value:function(){return this.pieces.map((function(t){return t.toString()})).join("")}}]),t}(),d=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a.PIECE_COLOR_WHITE,r=arguments.length>2?arguments[2]:void 0,o=arguments.length>3?arguments[3]:void 0,c=arguments.length>4?arguments[4]:void 0,u=arguments.length>5?arguments[5]:void 0;i(this,t),s(this,"board",new f),s(this,"turn",a.PIECE_COLOR_WHITE),s(this,"kqMoved",new g),s(this,"kAttacked",new C),s(this,"countdown",new _),s(this,"graveyard",new v),this.board=new f(e),this.turn=n,this.kqMoved=new g(r),this.kqMoved=new C(o),this.countdown=new _(c),this.graveyard=new v(u);var h=this.isInvalidPieceCount();if(h)throw new Error("Invalid piece string board:".concat(e,", graveyard:").concat(u,", count:").concat(h))}return o(t,[{key:"isInvalidPieceCount",value:function(){var t=this.board.poses.map((function(t){return t.p})).filter((function(t){return!u.isNull(t)})).concat(this.graveyard.pieces).map((function(t){return t.toOrigin()})).reduce((function(t,e){return t[e.toString()]=t[e.toString()]||0,t[e.toString()]++,t}),{}),e=Object.keys(t).map((function(e){return"".concat(e).concat(t[e])})).sort().join("");return"B2F8G2H2K1Q1b2f8g2h2k1q1"!=e&&e}},{key:"toString",value:function(){var t=this.board.toString();return t+=" ".concat(this.turn.toString()),t+=" ".concat(this.kqMoved.toString()),t+=" ".concat(this.kAttacked.toString()),(t+=" ".concat(this.countdown.toString()))+" ".concat(this.graveyard.toString())}}]),t}();t.exports={Piece:E,Pos:P,Board:f,KqMoved:g,CountDown:_,Graveyard:v,REN:d,DEFAULT_BOARD_STR:h}},806:(t,e,n)=>{function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function r(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var o=n(659),s=n(922),c=function(){function t(e,n,i,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.x=e,this.y=n,this.width=i,this.height=r}var e,n;return e=t,(n=[{key:"isContainsPoint",value:function(t){var e=t.x,n=t.y;return this.x<=e&&this.x+this.width>=e&&this.y<=n&&this.y+this.height>=n}}])&&r(e.prototype,n),t}(),a=null,u={HORIZONTAL_CODE_LETTERS:"abcdefgh",PIECE_COLOR_WHITE:"w",PIECE_COLOR_BLACK:"b",PIECE_TYPE_TOUK:"b",PIECE_TYPE_SES:"h",PIECE_TYPE_KOL:"g",PIECE_TYPE_SDECH:"k",PIECE_TYPE_NEANG:"q",PIECE_TYPE_TREY:"f",PIECE_TYPE_BORK:"t",EMPTY_PIECE:".",BOARD_SEPARATOR:"/",ROW_NUMBER:8,ROW_FIRST_INDEX:0,ROW_LAST_INDEX:7,mask:null,isValidPiecesString:function(t,e){var n=this;o.isNull(a)&&(a=[this.PIECE_TYPE_TOUK,this.PIECE_TYPE_SES,this.PIECE_TYPE_KOL,this.PIECE_TYPE_SDECH,this.PIECE_TYPE_NEANG,this.PIECE_TYPE_TREY,this.PIECE_TYPE_BORK,this.toWhitePiece(this.PIECE_TYPE_TOUK),this.toWhitePiece(this.PIECE_TYPE_SES),this.toWhitePiece(this.PIECE_TYPE_KOL),this.toWhitePiece(this.PIECE_TYPE_SDECH),this.toWhitePiece(this.PIECE_TYPE_NEANG),this.toWhitePiece(this.PIECE_TYPE_TREY),this.toWhitePiece(this.PIECE_TYPE_BORK),this.EMPTY_PIECE,this.BOARD_SEPARATOR]);var i=e?a.filter((function(t){return!~[n.EMPTY_PIECE,n.BOARD_SEPARATOR].indexOf(t)})):a;return!t.split("").some((function(t){return!~i.indexOf(t)}))},toWhitePiece:function(t){return t.toUpperCase()},isValidPosXY:function(t,e){return!o.isUndefined(t)&&(o.isUndefined(e)||(t=this.p(t,e)),!o.isUndefined(t.x)&&!o.isUndefined(t.y)&&this.rect(0,0,this.ROW_LAST_INDEX,this.ROW_LAST_INDEX).isContainsPoint(t))},isValidPiece:function(t){return t!=u.EMPTY_PIECE},isWhite:function(t){return t===u.PIECE_COLOR_WHITE},isBlack:function(t){return t===u.PIECE_COLOR_BLACK},codeP:function(t,e){return{h:t,v:e}},p:function(t,e){return{x:t,y:e}},res:function(t,e){return{width:t,height:e}},rect:function(t,e,n,i){return new c(t,e,n,i)},getSubBoardNumber:function(){return u.ROW_NUMBER*u.ROW_NUMBER},nerdPosToXY:function(t){if(o.isNumber(t.x)&&o.isNumber(t.y))return t;if(o.isNumber(t)){var e=t%this.ROW_NUMBER,n=Math.floor(t/this.ROW_NUMBER);return this.p(e,n)}return null},nerdXyToPos:function(t,e){return o.isUndefined(e)?t.x+t.y*this.ROW_NUMBER:t+e*this.ROW_NUMBER},isPosInBoard:function(t){return o.isNumber(t)&&t>=0&&t<=this.getSubBoardNumber()-1},getCharPieceFromString:function(t,e){return this.isPosInBoard(e)&&t.length===this.getSubBoardNumber()?t.charAt(e):this.EMPTY_PIECE},getPieceProperties:function(t){var e=this.pieceHash[t];return{color:e?e[0]:this.PIECE_COLOR_EMPTY,type:e?e[1]:this.EMPTY_PIECE}},getCharPieceInPos:function(t,e){return this.getCharPieceFromString(e,t)},getPieceInPos:function(t,e,n){o.isNumber(e)?t=this.nerdXyToPos(t,e):o.isString(e)&&(n=e);var i=this.getCharPieceInPos(t,n),r=this.PIECE_COLOR_WHITE,s=this.PIECE_TYPE_TREY;if(this.isValidPiece(i)){var c=this.getPieceProperties(i);r=c.color,s=c.type}return{isValidPiece:this.isValidPiece(i),color:r,type:s}},convertMask:function(t,e,n){var i=this.isWhite(n)?1:-1;return e=this.nerdPosToXY(e),t.x=t.x*i+e.x,t.y=t.y*i+e.y,this.isValidPosXY(t)?this.nerdXyToPos(t):null},getPieceCanMovePoses:function(t,e,n){var i=this,r=[];return this.mask=this.mask||s(this),this.mask[t].forEach((function(t){var s=i.convertMask(i.p(t[0],t[1]),e,n);o.isNull(s)||r.push(s)})),r},getPieceCanMovePosesValid:function(t,e,n,i){for(var r,s,c=this.getPieceCanMovePoses(t,e,n),a=[],u=c.length,h=this.nerdPosToXY(e),l=0;l<u;l++){if(r=this.nerdPosToXY(c[l]),(s=this.getPieceInPos(r.x,r.y,i)).isValidPiece?(n===s.color||t===this.PIECE_TYPE_TREY&&r.x===h.x)&&(r=null):t===this.PIECE_TYPE_TREY&&r.x!=h.x&&(r=null),!o.isNull(r)&&t===this.PIECE_TYPE_TOUK){var E=h.x,P=h.y,f=void 0,g=void 0;if(r.x===h.x){for(f=Math.abs(r.y-h.y),g=h.y<r.y?1:-1;--f>0;)if(this.getPieceInPos(E,P+g*f,i).isValidPiece){r=null;break}}else if(r.y===h.y)for(f=Math.abs(r.x-h.x),g=h.x<r.x?1:-1;--f>0;)if(this.getPieceInPos(E+g*f,P,i).isValidPiece){r=null;break}}o.isNull(r)||a.push(c[l])}return a},replacePiecesString:function(t,e,n){return t.substring(0,n)+e+t.substring(n+1)},injectPiece:function(t,e,n){var i=t.charAt(e);return this.isCharPiecesInBoard(i,t)?(t=this.replacePiecesString(t,this.EMPTY_PIECE,e),t=this.replacePiecesString(t,i,n)):null},getPieceCode:function(t,e){var n=t+e;for(var i in this.pieceHash)if(n===this.pieceHash[i])return i;return this.EMPTY_PIECE},getKingWillInDanger:function(t,e){for(var n,i,r,o=e.indexOf(this.getPieceCode(t,this.PIECE_TYPE_SDECH)),s=e.length,c=0;c<s;c++)if((i=this.getPieceInPos(c,e)).isValidPiece&&i.color!=t&&i.type===this.PIECE_TYPE_TOUK)for(n=this.getPieceCanMovePoses(i.type,c,i.color,e),r=0;r<n.length;r++)if(n[r]===o)return[this.numToCode(c),this.numToCode(o)];return null},getKingInDanger:function(t,e){for(var n,i,r,o=e.indexOf(this.getPieceCode(t,this.PIECE_TYPE_SDECH)),s=e.length,c=0;c<s;c++)if((i=this.getPieceInPos(c,e)).isValidPiece&&i.color!=t)for(n=this.getPieceCanMovePosesValid(i.type,c,i.color,e),r=0;r<n.length;r++)if(n[r]===o)return[this.numToCode(c),this.numToCode(o)];return null},numToCodeP:function(t){return this.codeP(this.HORIZONTAL_CODE_LETTERS[t%8],1+(t/8|0))},numToCode:function(t){var e=this.numToCodeP(t);return"".concat(e.h).concat(e.v)},generatePosesCanMove:function(t,e,n,i,r){var s,c=this.getPieceCanMovePosesValid(t,e,n,i),a=this.isHaveCaptured(i);t===this.PIECE_TYPE_SDECH?a||r||((s=this.convertMask(this.p(2,1),e,n))&&!this.getPieceInPos(s,i).isValidPiece&&c.push(s),(s=this.convertMask(this.p(-2,1),e,n))&&!this.getPieceInPos(s,i).isValidPiece&&c.push(s)):t===this.PIECE_TYPE_NEANG&&(a||r||(s=this.convertMask(this.p(-0,2),e,n))&&!this.getPieceInPos(s,i).isValidPiece&&c.push(s));for(var u,h=c.length,l=[],E=0;E<h;E++)u=this.injectPiece(i,e,c[E]),o.isNull(this.getKingInDanger(n,u))&&l.push(this.numToCode(c[E]));return l},isCharPiecesInBoard:function(t,e){return!!~e.indexOf(t)},getPiecesInBoard:function(t){var e=this;return t.split("").filter((function(t){return e.isValidPiece(t)}))},isHaveCaptured:function(t){return this.getPiecesInBoard(t).length<4*this.ROW_NUMBER},filterPieceInBoard:function(t){for(var e,n,i,r=[],o=[],s=0;s<t.length;s++)e=t.charAt(s),this.isValidPiece(e)&&(i={color:(n=this.getPieceProperties(e)).color,type:n.type,index:s,code:this.numToCode(s)},this.isWhite(i.color)?r.push(i):o.push(i));return{whitePieces:r,blackPieces:o}},extractPiecesToArray:function(t){var e,n=this;t=t.split("");var r=(i(e={},this.PIECE_COLOR_BLACK,[]),i(e,this.PIECE_COLOR_WHITE,[]),e);return t.forEach((function(t){if(t!==n.EMPTY_PIECE){var e=n.getPieceProperties(t);r[e.color].push(e.type)}})),r},isStateCount:function(t,e){return 1===this.extractPiecesToArray(e)[t].length},checkCountable:function(t,e){var n=this.extractPiecesToArray(e),i=n[t],r=n[this.oppositeColor(t)];return i.length<=2&&r.length>=2},checkCount:function(t,e,n){var i,r,o=function(t,e){return t.join("").split(e).length-1},s=this.extractPiecesToArray(e),c=s[t],a=s[this.oppositeColor(t)];if(1===c.length&&a.length>1){if(i=a,r=this.PIECE_TYPE_TREY,!~i.indexOf(r)){var u=64,h=o(a,this.PIECE_TYPE_TOUK);return h?u=h>1?8:16:o(a,this.PIECE_TYPE_KOL)>1?u=22:o(a,this.PIECE_TYPE_SES)>1?u=32:o(a,this.PIECE_TYPE_KOL)&&(u=44),[a.length+1,u]}return[0,64]}return n&&this.checkCountable(t,e)?[0,64]:null},getHashKey:function(t){var e=this,n=Object.keys(this.pieceHash).filter((function(n){return e.pieceHash[n]===t}));return 1===n.length?n[0]:this.EMPTY_PIECE},getPieceKeyByProp:function(t){var e;for(var n in this.pieceHash)if(e=this.getPieceProperties(n),t.color===e.color&&t.type===e.type)return n;return this.EMPTY_PIECE},getPieceKeyByName:function(t){return this.getPieceKeyByProp({color:t[0],type:t[1]})},oppositeColor:function(t){return this.isWhite(t)?this.PIECE_COLOR_BLACK:this.PIECE_COLOR_WHITE}};u.pieceHash={a:u.PIECE_COLOR_WHITE+u.PIECE_TYPE_TOUK,b:u.PIECE_COLOR_WHITE+u.PIECE_TYPE_SES,c:u.PIECE_COLOR_WHITE+u.PIECE_TYPE_KOL,d:u.PIECE_COLOR_WHITE+u.PIECE_TYPE_SDECH,e:u.PIECE_COLOR_WHITE+u.PIECE_TYPE_NEANG,f:u.PIECE_COLOR_WHITE+u.PIECE_TYPE_TREY,g:u.PIECE_COLOR_WHITE+u.PIECE_TYPE_BORK,h:u.PIECE_COLOR_BLACK+u.PIECE_TYPE_TOUK,i:u.PIECE_COLOR_BLACK+u.PIECE_TYPE_SES,j:u.PIECE_COLOR_BLACK+u.PIECE_TYPE_KOL,k:u.PIECE_COLOR_BLACK+u.PIECE_TYPE_SDECH,l:u.PIECE_COLOR_BLACK+u.PIECE_TYPE_NEANG,m:u.PIECE_COLOR_BLACK+u.PIECE_TYPE_TREY,n:u.PIECE_COLOR_BLACK+u.PIECE_TYPE_BORK},t.exports=u},922:(t,e,n)=>{var i=n(806);t.exports=function(){var t={};return t[i.PIECE_TYPE_TOUK]=[[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[0,-7],[0,-8],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[-1,0],[-2,0],[-3,0],[-4,0],[-5,0],[-6,0],[-7,0],[-8,0]],t[i.PIECE_TYPE_SES]=[[-1,-2],[1,-2],[-2,-1],[2,-1],[-1,2],[1,2],[-2,1],[2,1]],t[i.PIECE_TYPE_NEANG]=[[-1,-1],[1,-1],[-1,1],[1,1]],t[i.PIECE_TYPE_KOL]=t[i.PIECE_TYPE_NEANG].concat([[0,1]]),t[i.PIECE_TYPE_SDECH]=t[i.PIECE_TYPE_KOL].concat([[0,-1],[1,0],[-1,0]]),t[i.PIECE_TYPE_TREY]=[[0,1],[-1,1],[1,1]],t[i.PIECE_TYPE_BORK]=t[i.PIECE_TYPE_NEANG],t}},659:t=>{var e={isValid:function(t){return!this.isNull(t)&&!this.isUndefined(t)},isNull:function(t){return null===t},isUndefined:function(t){return void 0===t},isString:function(t){return this.isValid(t)&&"string"==typeof t},isNotEmpty:function(t){return this.isValidString(t)&&""!=t},isNumber:function(t){return this.isValid(t)&&"number"==typeof t},isStringNumber:function(t){return this.isString(t)&&""!=t&&!isNaN(Number(t))},isArray:function(t){return this.isValid(t)&&t instanceof Array},isFunction:function(t){return this.isValid(t)&&"function"==typeof t},isObject:function(t){return this.isValid(t)&&t instanceof Object},isBoolean:function(t){return this.isValid(t)&&"boolean"==typeof t},isTrue:function(t){return this.isValidBoolean(t)&&t},isFalse:function(t){return this.isValidBoolean(t)&&!t},isPoint:function(t){return this.isValid(t)&&this.isValidObject(t)&&this.isValidNumber(t.x)&&this.isValidNumber(t.y)},isSize:function(t){return this.isValid(t)&&this.isValidObject(t)&&this.isValidNumber(t.width)&&this.isValidNumber(t.height)},isOdd:function(t){return!!(t%2)},isEven:function(t){return!this.isOdd(t)},isUpperCase:function(t){return t===t.toUpperCase()}};t.exports=e},620:(t,e,n)=>{function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var r=n(806),o=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,n;return e=t,(n=[{key:"init",value:function(t){this.piecesString=t.piecesString,this.currentTurn=t.currentTurn,this.isNeangMoved=t.isNeangMoved,this.isSdechMoved=t.isSdechMoved,this.genCanMove=t.genCanMove,this.genCanMoveForAnother=t.genCanMoveForAnother,this.whiteMoves=[],this.blackMoves=[],this.whiteKingInDanger=null,this.whiteKingWillInDanger=null,this.blackKingInDanger=null,this.blackKingWillInDanger=null,this.winColor=null,this.stuckColor=null}},{key:"generateCanMoves",value:function(){var t=this,e=r.filterPieceInBoard(this.piecesString);this.whiteMoves=e.whitePieces,this.blackMoves=e.blackPieces;var n=function(e){for(var n=0;n<e.length;n++){var i=e[n].type,o=i===r.PIECE_TYPE_SDECH,s=i===r.PIECE_TYPE_NEANG,c=t.isSdechMoved;o||(c=!!s&&t.isNeangMoved);var a=r.generatePosesCanMove(i,e[n].index,e[n].color,t.piecesString,c);e[n].canMoveIndexes=a}};n(this.whiteMoves),n(this.blackMoves)}},{key:"cleanPieceNoMove",value:function(){var t=function(t){for(var e=!0;e;){e=!1;for(var n=0;n<t.length;n++){var i=t[n];if(!i.canMoveIndexes||!i.canMoveIndexes.length){t.splice(n,1),e=!0;break}}}};t(this.whiteMoves),t(this.blackMoves)}},{key:"checkIfKingInDanger",value:function(){this.whiteKingInDanger=r.getKingInDanger(r.PIECE_COLOR_WHITE,this.piecesString),this.whiteKingWillInDanger=r.getKingWillInDanger(r.PIECE_COLOR_WHITE,this.piecesString),this.blackKingInDanger=r.getKingInDanger(r.PIECE_COLOR_BLACK,this.piecesString),this.blackKingWillInDanger=r.getKingWillInDanger(r.PIECE_COLOR_BLACK,this.piecesString)}},{key:"genWinLost",value:function(){this.whiteKingInDanger&&!this.whiteMoves.length?this.winColor=r.PIECE_COLOR_BLACK:this.blackKingInDanger&&!this.blackMoves.length&&(this.winColor=r.PIECE_COLOR_WHITE)}},{key:"getStuck",value:function(){this.winColor||(r.isWhite(this.currentTurn)&&!this.whiteMoves.length?this.stuckColor=r.PIECE_COLOR_WHITE:r.isBlack(this.currentTurn)&&!this.blackMoves.length&&(this.stuckColor=r.PIECE_COLOR_BLACK))}},{key:"calcCanMove",value:function(t){this.init(t),this.generateCanMoves(),this.cleanPieceNoMove();var e=[];this.genCanMove&&(e=r.isWhite(this.currentTurn)?this.whiteMoves:this.blackMoves);var n=[];return this.genCanMoveForAnother&&(n=r.isBlack(this.currentTurn)?this.whiteMoves:this.blackMoves),{moves:e,anotherMoves:n}}},{key:"calcState",value:function(t){return this.init(t),this.generateCanMoves(),this.cleanPieceNoMove(),this.checkIfKingInDanger(),this.genWinLost(),this.getStuck(),{blackKingInDanger:this.blackKingInDanger,whiteKingInDanger:this.whiteKingInDanger,blackKingWillInDanger:this.blackKingWillInDanger,whiteKingWillInDanger:this.whiteKingWillInDanger,winColor:this.winColor,stuckColor:this.stuckColor,blackCountable:r.checkCountable(r.PIECE_COLOR_BLACK,this.piecesString),whiteCountable:r.checkCountable(r.PIECE_COLOR_WHITE,this.piecesString)}}},{key:"calCount",value:function(t){return{countingBlack:r.checkCount(r.PIECE_COLOR_BLACK,t.piecesString,t.force),countingWhite:r.checkCount(r.PIECE_COLOR_WHITE,t.piecesString,t.force)}}}])&&i(e.prototype,n),t}();t.exports=o},490:(t,e,n)=>{var i=n(218),r=i.REN,o=i.DEFAULT_BOARD_STR,s=n(659),c={toRen:function(t){s.isUndefined(t)&&(t=o);var e=t.split(" ");return new r(e[0],e[1],e[2],e[3],e[4],e[5])}};t.exports=c}},e={};return function n(i){if(e[i])return e[i].exports;var r=e[i]={exports:{}};return t[i](r,r.exports,n),r.exports}(497)})()}));