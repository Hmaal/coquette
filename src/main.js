;(function(exports) {
  var Coquette = function(game, canvasId, width, height, backgroundColor, autoFocus) {
    this.renderer = new Coquette.Renderer(this, canvasId, width, height, backgroundColor);
    this.inputter = new Coquette.Inputter(this, canvasId, autoFocus);
    this.updater = new Coquette.Updater(this);
    this.entities = new Coquette.Entities(this, game);
    this.runner = new Coquette.Runner(this);
    this.collider = new Coquette.Collider(this);

    new Coquette.Ticker(this, function(interval) {
      self.collider.update(interval);
      self.runner.update(interval);
      if (game.update !== undefined) {
        game.update(interval);
      }

      self.entities.update(interval)
      self.renderer.update(interval);
    });
  };

  exports.Coquette = Coquette;
})(this);
