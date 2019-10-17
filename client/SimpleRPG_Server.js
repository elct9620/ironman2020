//=============================================================================
// SimpleRPG_Server.js
//=============================================================================

/*:
 * @plugindesc Abstract Server
 * @author Aotokitsuruya
 */

var SimpleRPG = SimpleRPG || {};

(function() {
  function Server() {
    this.initialize.apply(this, arguments);
  };

  Server.prototype = Object.create(Object.prototype);
  Server.prototype.constructor = Server;

  Server.prototype.initialize = function(server) {
    this.socket = new WebSocket(server);
    this.socket.onopen = this._connected.bind(this);
    this.socket.onmessage = this._received.bind(this);
    this.socket.onclose = this._disconnected.bind(this);

    this.initMembers();
  };

  Server.prototype.initMembers = function() {
    this.controller = null;
    this._commands = [];
    this.connected = false;
    this.authed = false;
  };

  Server.prototype._connected = function(ev) {
    this.connected = true;
    this.processCommand();
  };

  Server.prototype._received = function(ev) {
    if (this.controller && ev.data) {
      var data = JSON.parse(ev.data);

      if (data['command'] === 'negotiate') {
        this.authed = data['parameters'][0];
        return;
      }

      this.controller.execute(data['command'], data['parameters']);
    }
  };

  Server.prototype._disconnected = function(ev) {
    // TODO
  };

  Server.prototype.send = function(command, parameters) {
    this._commands.push({ command: command, parameters: parameters });
  };

  Server.prototype.processCommand = function() {
    if (this.connected && this._commands.length > 0) {
      var command = this._commands.shift();
      this.socket.send(JSON.stringify(command));
    }

    requestAnimationFrame(this.processCommand.bind(this));
  };

  SimpleRPG.Server = Server;
})();
