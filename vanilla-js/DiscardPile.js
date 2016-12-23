(function (global) {
	function DiscardPile(sel, game) {
		this._stack = [];
		this._element = $(sel);
		this._game = game;
	}

	DiscardPile.prototype.draw = function draw() {
		var top = this._stack.pop();

		var nextToTop = this._stack.pop();
		if (nextToTop) {
			this.pushCard(nextToTop);
		}
		else {
			this._element.empty();
		}

		return top;
	};
	DiscardPile.prototype.pop = DiscardPile.prototype.draw;

	DiscardPile.prototype.peekTop = function peekTop() {
		if (this._stack.length === 0)
			return undefined;

		return this._stack[this._stack.length - 1];
	};

	DiscardPile.prototype.pushCard = function pushCard(card) {
		this._stack.push(card);
		card.pile = this;
		this._element.append(card.getHtml());

		if (this._game.selectedCard != undefined)
			this._game.selectedCard.getHtml().removeClass('selectedCard');
		this._game.selectedCard = undefined;

		//remove the click event of all cards
		for (var i = 0; i < this._stack.length; i++) {
			this._stack[i].getHtml().unbind('click');
		}


		card.getHtml().click(card.clickHandler(card));

		this._game.undoCount++;
	};

	DiscardPile.prototype.clickHandler = function clickHandler(card) {
		if (this._game.selectedCard != undefined) {
			if (card.canDropOnOpenCard(this._game.selectedCard)) {
				card.pile.pushCard(this._game.selectedCard.pile.pop());
			}
			else {
				//if we cant move, just deselect old card and select new
				this._game.selectedCard.deselect();
				this._game.selectedCard = card;
				this._game.selectedCard.select();
			}
		}
		//if selected card doesnt exist yet, select this one
		else {
			this._game.selectedCard = card;
			card.select();
		}
	};

	global.DiscardPile = DiscardPile;
})(window);