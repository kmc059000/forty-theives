(function (global) {
	function DrawPile(sel, discardPile, game) {
		this._stack = [];
		this._element = $(sel);
		this._game = game;
		this._discardPile = discardPile;
	}

	DrawPile.prototype.pushCard = function pushCard(card) {
		var self = this;
		this._stack.push(card);
		card.pile = this;

		if (this._element.is(':empty')) {
			var cardBack = card.getBackHtml();
			cardBack.click(function () {
				var c = card.pile.draw();
				self._discardPile.pushCard(c);
			});

			this._element.append(cardBack);
		}
	};

	DrawPile.prototype.draw = function draw() {
		var top = this._stack.pop();

		this._element.empty();
		var nextToTop = this._stack.pop();

		if (nextToTop != undefined) {
			this.pushCard(nextToTop);
		}

		this._game.score++;
		return top;
	};

	global.DrawPile = DrawPile;
})(window);