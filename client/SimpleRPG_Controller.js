//=============================================================================
// SimpleRPG_Controller.js
//=============================================================================

/*:
 * @plugindesc Controller
 * @author Aotokitsuruya
 */

var SimpleRPG = SimpleRPG || {};

(function() {
  function Controller() {
    this.initialize.apply(this, arguments);
  };

  Controller.prototype = Object.create(Object.prototype);
  Controller.prototype.constructor = Controller;

  Controller.prototype.initialize = function() {};

  // Execute
  Controller.prototype.execute = function(command, parameters) {
    if (!this[command]) {
      // TODO: Handling unknown command error
      return;
    }

    this[command].apply(this, parameters);
  };

  SimpleRPG.Controller = Controller;
})();
