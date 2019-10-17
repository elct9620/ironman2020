//=============================================================================
// SimpleRPG_Map.js
//=============================================================================

/*:
 * @plugindesc Map Handler
 * @author Aotokitsuruya
 */

var SimpleRPG = SimpleRPG || {};

Input.keyMapper = Object.assign({}, Input.keyMapper, {
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9'
});

(function() {
  var _Scene_Map_initialize = Scene_Map.prototype.initialize;

  Scene_Map.prototype.initialize = function() {
    _Scene_Map_initialize.call(this);

    this._remotePlayers = {};
    this._remotePlayerSprites = {};
  };

  // On Map Loaded
  var _Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
  Scene_Map.prototype.onMapLoaded = function() {
    _Scene_Map_onMapLoaded.call(this);

    SimpleRPG.Servers.Map.setCurrentMap(this);
    SimpleRPG.Commands.Map.negotiate(SimpleRPG.PlayerName, '');
    SimpleRPG.Commands.Map.playerList();
    SimpleRPG.Commands.Map.join();

    // Hide Default Player
    $gamePlayer.setOpacity(0);
  }

  // Players
  Scene_Map.prototype.remotePlayers = function() {
    return Object.values(this._remotePlayers);
  };

  Scene_Map.prototype.findPlayer = function(id) {
    return this._remotePlayers[id];
  };

  Scene_Map.prototype.addPlayer = function(id) {
    if (this._remotePlayers[id]) {
      return this._remotePlayers[id];
    }

    this._remotePlayers[id] = new SimpleRPG.RemotePlayer();
    this._remotePlayerSprites[id] = new Sprite_Character(this._remotePlayers[id]);
    this._spriteset._tilemap.addChild(this._remotePlayerSprites[id]);

    return this._remotePlayers[id];
  };

  Scene_Map.prototype.removePlayer = function(id) {
    this._spriteset._tilemap.removeChild(this._remotePlayerSprites[id]);
    delete this._remotePlayerSprites[id];
    delete this._remotePlayers[id];
  };

  // Update Players
  var _Scene_Map_updateMain = Scene_Map.prototype.updateMain;
  Scene_Map.prototype.updateMain = function() {
    _Scene_Map_updateMain.call(this);
    this.updateRemotePlayers(this.isActive());
  };

  Scene_Map.prototype.updateRemotePlayers = function(active) {
    this.remotePlayers().forEach(function(player) {
      player.update(active);
    });
  };

  // Handling TouchInput
  Scene_Map.prototype.processMapTouch = function() {
    if (TouchInput.isTriggered() || this._touchCount > 0) {
      if (TouchInput.isPressed()) {
        if (this._touchCount === 0 || this._touchCount >= 15) {
          var x = $gameMap.canvasToMapX(TouchInput.x);
          var y = $gameMap.canvasToMapY(TouchInput.y);
          // $gameTemp.setDestination(x, y);
          SimpleRPG.Commands.Map.move(x, y);
        }
        this._touchCount++;
      } else {
        this._touchCount = 0;
      }
    }
  };

  // Handling Change Avatar
  var _Scene_Map_updateScene = Scene_Map.prototype.updateScene;
  Scene_Map.prototype.updateScene = function() {
    _Scene_Map_updateScene.call(this);

    for(var i = 1; i < 9; i++) {
      if (Input.isTriggered(i.toString())) {
        SimpleRPG.Commands.Map.avatar(i - 1);
      }
    }
  }
}());
