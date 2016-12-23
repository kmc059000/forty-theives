(function (global) {
	function DropZone(sel, game) {
		this._stack = [];
		this._element = $(sel);
		this._game = game;
	}

	DropZone.prototype.isFull = function isFull() {
		return this._stack.length == 13;
	};

	DropZone.prototype.peekTop = function peekTop() {
		var top = this._stack.pop();

		if (top) {
			this._stack.push(top);
		}

		return top;
	};

	DropZone.prototype.pop = function pop() {
		var popped = this._stack.pop();

		popped.getHtml().click(popped.clickHandler(popped));

		return this._stack.pop();
	};

	DropZone.prototype.pushCard = function pushCard(card) {
		var cardHtml = card.getHtml();
		var stack = this._stack;

		cardHtml = cardHtml.css('top', 0);

		this._element.append(cardHtml);

		stack.push(card);
		card.pile = this;

		for (var i = 0; i < stack.length; i++) {
			stack[i].getHtml().unbind('click');
		}

		card.getHtml().click(card.clickHandler(card));

		this._game.checkForWin();

		this._game.undoCount = 0;

		if (this._game.selectedCard) this._game.selectedCard.deselect();
		this._game.score--;
	};

	DropZone.prototype.setup = function setup() {
		var self = this;
		this._element.click(function () {
			if (self._stack.length == 0 && (self._game.selectedCard != undefined && self._game.selectedCard.cardNumber == 1)) {
				self.pushCard(self._game.selectedCard.pile.pop());
			}
		});
	};

	DropZone.prototype.clickHandler = function clickHandler(card) {
		if (this._game.selectedCard != undefined) {
			if (card.canDropOnDropZoneCard(this._game.selectedCard)) {
				card.pile.pushCard(this._game.selectedCard.pile.pop());

				//not sure when ft.selectedCard becomes undefined between here and the if above... need to check it out
				if (this._game.selectedCard != undefined) {
					this._game.selectedCard.deselect();
				}
			}
			else {
				//if we cant move, just deselect old card and select new
				this._game.selectedCard.deselect();
				this._game.selectedCard = card;

				card.select();
			}
		}
	};

	global.DropZone = DropZone;
})(window);