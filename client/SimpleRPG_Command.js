//=============================================================================
// SimpleRPG_Command.js
//=============================================================================

/*:
 * @plugindesc Command
 * @author Aotokitsuruya
 */


var SimpleRPG = SimpleRPG || {};

(function() {
  function Command() {
    this.initialize.apply(this, arguments);
  };

  Command.prototype = Object.create(Object.prototype);
  Command.prototype.constructor = Command;

  Command.prototype.initialize = function() {};

  Command.prototype.negotiate = function(id, token) {
    this.server.send('negotiate', [id, token]);
  };

  SimpleRPG.Command = Command;
})();
