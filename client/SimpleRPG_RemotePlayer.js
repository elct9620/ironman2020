//=============================================================================
// SimpleRPG_RemotePlayer.js
//=============================================================================

/*:
 * @plugindesc RemotePlayer
 * @author Aotokitsuruya
 */

var SimpleRPG = SimpleRPG || {};

(function() {
  function Player() {
    this.initialize.apply(this, arguments);
  };

  Player.prototype = Object.create(Game_Player.prototype);
  Player.prototype.constructor = Player;

  Player.prototype.initMembers = function() {
    Game_Player.prototype.initMembers.call(this);
    this._destinationX = null;
    this._destinationY = null;
  };

  Player.prototype.isDestinationValid = function() {
    return this._destinationX !== null;
  };

  Player.prototype.moveTo = function(x, y) {
    this._destinationX = x;
    this._destinationY = y;
  };

  Player.prototype.moveByInput = function() {
    if (!this.isMoving() && this.canMove()) {
      var direction = 0;
      if (this.isDestinationValid()){
        var x = this._destinationX;
        var y = this._destinationY;
        direction = this.findDirectionTo(x, y);
      }
      if (direction > 0) {
        this.executeMove(direction);
      }
    }
  };

  Player.prototype.update = function(sceneActive) {
    var wasMoving = this.isMoving();
    this.updateDashing();
    if (sceneActive) {
      this.moveByInput();
    }
    Game_Character.prototype.update.call(this);
    if (!this.isMoving()) {
      this.updateNonmoving(wasMoving);
    }
  };

  SimpleRPG.RemotePlayer = Player;
})();
