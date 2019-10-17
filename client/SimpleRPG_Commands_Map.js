//=============================================================================
// SimpleRPG_Commands_Map.js
//=============================================================================

/*:
 * @plugindesc Map Command
 * @author Aotokitsuruya
 */


var SimpleRPG = SimpleRPG || {};
SimpleRPG.Commands = SimpleRPG.Commands || {};

(function() {
  function Command() {
    this.initialize.apply(this, arguments);
  };

  Command.prototype = Object.create(SimpleRPG.Command.prototype);
  Command.prototype.constructor = Command;

  Command.prototype.initialize = function() {
    this.server = SimpleRPG.Servers.Map;
  };

  Command.prototype.join = function() {
    this.server.send('join', []);
  };

  Command.prototype.playerList = function() {
    this.server.send('player_list', []);
  };

  Command.prototype.move = function(x, y) {
    this.server.send('move', [x, y]);
  };

  Command.prototype.avatar = function(idx) {
    this.server.send('avatar', [idx]);
  }

  var instance = null;
  Object.defineProperties(SimpleRPG.Commands, {
    Map: {
      get: function() {
        if (instance == null) {
          instance = new Command();
        }

        return instance;
      }
    }
  });
})();
