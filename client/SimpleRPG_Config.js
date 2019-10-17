//=============================================================================
// SimpleRPG_Config.js
//=============================================================================

/*:
 * @plugindesc SimpleRPG Config
 * @author Aotokitsuruya
 *
 * @param Map Server Host
 * @default ws://localhost:9292
 */

var SimpleRPG = SimpleRPG || {};
SimpleRPG.Config = {};

(function() {
  var Config = PluginManager.parameters('SimpleRPG_Config');

  // Servers
  var Servers = {};
  Servers.Map = Config['Map Server Host'];
  SimpleRPG.Config.Servers = Servers;
})();
