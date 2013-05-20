;(function(exports) {
  var Renderer = function(coquette, canvasId, width, height, backgroundColor) {
    this.coquette = coquette;
    var canvas = document.getElementById(canvasId);
    canvas.style.outline = "none"; // stop browser outlining canvas when it has focus
    canvas.style.cursor = "default"; // keep pointer normal when hovering over canvas
    this.ctx = canvas.getContext('2d');
    this.backgroundColor = backgroundColor;
    canvas.width = this.width = width;
    canvas.height = this.height = height;
  };

  Renderer.prototype = {
    getCtx: function() {
      return this.ctx;
    },

    draw: function(ctx) {
      ctx.fillStyle = this.backgroundColor;
      ctx.fillRect(0, 0, this.width, this.height);
    },

    center: function() {
      return {
        x: this.width / 2,
        y: this.height / 2
      };
    },

    onScreen: function(obj) {
      return obj.pos.x > 0 && obj.pos.x < this.coquette.renderer.width &&
        obj.pos.y > 0 && obj.pos.y < this.coquette.renderer.height;
    }
  };

  exports.Renderer = Renderer;
})(typeof exports === 'undefined' ? this.Coquette : exports);
