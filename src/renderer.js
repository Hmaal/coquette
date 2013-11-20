;(function(exports) {
  var Maths;
  if(typeof module !== 'undefined' && module.exports) { // node
    Maths = require('./collider').Collider.Maths;
  } else { // browser
    Maths = Coquette.Collider.Maths;
  }

  var Renderer = function(coquette, game, canvas, wView, hView, backgroundColor) {
    this.coquette = coquette;
    this.game = game;
    canvas.style.outline = "none"; // stop browser outlining canvas when it has focus
    canvas.style.cursor = "default"; // keep pointer normal when hovering over canvas
    this.ctx = canvas.getContext('2d');
    this.backgroundColor = backgroundColor;

    canvas.width = wView;
    canvas.height = hView;
    this._viewSize = { x:wView, y:hView };
    this._viewCenterPos = { x: this._viewSize.x / 2, y: this._viewSize.y / 2 };
  };

  Renderer.prototype = {
    getCtx: function() {
      return this.ctx;
    },

    getViewSize: function() {
      return this._viewSize;
    },

    getViewCenterPos: function() {
      return this._viewCenterPos;
    },

    setViewCenterPos: function(pos) {
      this._viewCenterPos = { x:pos.x, y:pos.y };
    },

    update: function(interval) {
      var ctx = this.getCtx();

      var viewTranslate = viewOffset(this._viewCenterPos, this._viewSize);

      // translate so all objs placed relative to viewport
      ctx.translate(-viewTranslate.x, -viewTranslate.y);

      // draw background
      ctx.fillStyle = this.backgroundColor;
      ctx.fillRect(this._viewCenterPos.x - this._viewSize.x / 2,
                   this._viewCenterPos.y - this._viewSize.y / 2,
                   this._viewSize.x,
                   this._viewSize.y);

      // draw game and entities
      var drawables = [this.game]
        .concat(this.coquette.entities.all().concat().sort(zindexSort));
      for (var i = 0, len = drawables.length; i < len; i++) {
        if (drawables[i].draw !== undefined) {
          drawables[i].draw(ctx);
        }
      }

      // translate back
      ctx.translate(viewTranslate.x, viewTranslate.y);
    },

    onScreen: function(obj) {
      return Maths.rectanglesIntersecting(obj, {
        size: this._viewSize,
        pos: {
          x: this._viewCenterPos.x - this._viewSize.x / 2,
          y: this._viewCenterPos.y - this._viewSize.y / 2
        }
      });
    }
  };

  var viewOffset = function(viewCenterPos, viewSize) {
    return {
      x:viewCenterPos.x - viewSize.x / 2,
      y:viewCenterPos.y - viewSize.y / 2
    }
  };

  // sorts passed array by zindex
  // elements with a higher zindex are drawn on top of those with a lower zindex
  var zindexSort = function(a, b) {
    return (a.zindex || 0) < (b.zindex || 0) ? -1 : 1;
  };

  exports.Renderer = Renderer;
})(typeof exports === 'undefined' ? this.Coquette : exports);
