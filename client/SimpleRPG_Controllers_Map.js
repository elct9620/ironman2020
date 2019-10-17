//=============================================================================
// SimpleRPG_Controllers_Map.js
//=============================================================================

/*:
 * @plugindesc Map Controller
 * @author Aotokitsuruya
 */

var SimpleRPG = SimpleRPG || {};

(function() {
  function MapController() {
    this.initialize.apply(this, arguments);
  };

  MapController.prototype = Object.create(SimpleRPG.Controller.prototype);
  MapController.prototype.constructor = MapController;

  MapController.prototype.initialize = function(map) {
    this.map = map;
  };

  MapController.prototype.join = function(id, avatarIdx, x, y) {
    var player = this.map.addPlayer(id);
    // TODO: Allow set image
    player.setImage('Actor2', avatarIdx);
    player.locate(x, y);
  };

  // TODO: Rename to JavaScript naming conversion
  MapController.prototype.player_list = function(players) {
    players.forEach(function(item) {
      var id = item[0];
      var avatarIdx = item[1];
      var x = item[2];
      var y = item[3];

      var player = this.map.addPlayer(id);
      // TODO: Allow set image
      player.setImage('Actor2', avatarIdx);
      player.locate(x, y);

    });
  };

  MapController.prototype.move = function(id, x, y) {
    var player = this.map.findPlayer(id);
    if (player) {
      player.moveTo(x, y);
    }
  };

  MapController.prototype.avatar = function(id, avatarIdx) {
    var player = this.map.findPlayer(id);
    if (player) {
      player.setImage('Actor2', avatarIdx);
    }
  }

  MapController.prototype.exit = function(id) {
    this.map.removePlayer(id);
  }

  SimpleRPG.MapController = MapController;
})();
