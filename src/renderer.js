;(function(exports) {
  var Renderer = function(canvasId, width, height) {
    var canvas = document.getElementById(canvasId);
    this.ctx = canvas.getContext('2d');
    canvas.width = this.width = width;
    canvas.height = this.height = height;
  };

  Renderer.prototype = {
    clear: function(color) {
      this.ctx.fillStyle = color;
		  this.ctx.fillRect(0, 0, this.width, this.height);
    },

    center: function() {
      return {
        x: this.width / 2,
        y: this.height / 2
      };
    },

    onScreen: function(obj) {
      return obj.pos.x > 0 && obj.pos.x < Coquette.get().renderer.width &&
        obj.pos.y > 0 && obj.pos.y < Coquette.get().renderer.height;
    }
  };

  exports.Renderer = Renderer;
})(typeof exports === 'undefined' ? this.Coquette : exports);
