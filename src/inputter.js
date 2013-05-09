 ;(function(exports) {
  var Inputter = function() {
		window.addEventListener('keydown', this.keydown.bind(this), false);
		window.addEventListener('keyup', this.keyup.bind(this), false);

    // suppress scrolling
    window.addEventListener("keydown", function(e) {
      // space and arrow keys
      if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
      }
    }, false);
  };

  Inputter.prototype = {
    _state: {},
    bindings: {},

    state: function(keyCode, state) {
      if (state !== undefined) {
        this._state[keyCode] = state;
      } else {
        return this._state[keyCode] || false;
      }
    },

    keydown: function(e) {
      this.state(e.keyCode, true);
    },

    keyup: function(e) {
      this.state(e.keyCode, false);
    },

	  LEFT_ARROW: 37,
	  RIGHT_ARROW: 39,
	  UP_ARROW: 38,
	  DOWN_ARROW: 40,
    SPACE: 32
  };
  exports.Inputter = Inputter;
})(typeof exports === 'undefined' ? this.Coquette : exports);
