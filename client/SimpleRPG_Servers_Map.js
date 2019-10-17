//=============================================================================
// SimpleRPG_Servers_Map.js
//=============================================================================

/*:
 * @plugindesc Map Server
 * @author Aotokitsuruya
 */

var SimpleRPG = SimpleRPG || {};
SimpleRPG.Servers = SimpleRPG.Servers || {};

(function() {
  function Server() {
    this.initialize.apply(this, arguments);
  };

  Server.prototype = Object.create(SimpleRPG.Server.prototype);
  Server.prototype.constructor = Server;

  Server.prototype.initialize = function() {
    SimpleRPG.Server.prototype.initialize.call(this, SimpleRPG.Config.Servers.Map);
  };

  Server.prototype.setCurrentMap = function(map) {
    this.controller = new SimpleRPG.MapController(map);
  };

  var instance = null;
  Object.defineProperties(SimpleRPG.Servers, {
    Map: {
      get: function() {
        if (!instance) {
          instance = new Server();
        }

        return instance;
      }
    }
  });
})();
