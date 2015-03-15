(function (global) {
	function PlayStack(sel, game) {
		this._stack = [];
		this._element = $(sel);
		this._game = game;
	}

	PlayStack.prototype.setup = function setup() {
		var self = this;
		var stack = self._stack;
		var ft = this._game;
		this._element.click(function () {
			if (stack.length == 0 && ft.selectedCard && ft.selectedCard.pile) {
				self.pushCard(ft.selectedCard.pile.pop());
			}
		});
	};

	PlayStack.prototype.pop = function pop() {
		return this._stack.pop();
	};

	PlayStack.prototype.peekTop = function peekTop() {
		var stack = this._stack;
		if (stack.length == 0)
			return undefined;

		return stack[stack.length - 1];
	};

	PlayStack.prototype.pushCard = function pushCard(card) {
		var stack = this._stack;

		var cardHtml = card.getHtml();
		if (stack.length > 0) {
			cardHtml = cardHtml.css('top', stack.length * 25);
		}
		else {
			cardHtml = cardHtml.css('top', 0);
		}

		this._element.append(cardHtml);

		stack.push(card);
		card.pile = this;

		card.getHtml().click(card.clickHandler());

		this._game.undoCount = 0;
		this._game.score++;
	};

	PlayStack.prototype.clickHandler = function clickHandler(card) {
		var ft = this._game;
		if (ft.selectedCard != undefined) {
			if (card.canDropOnOpenCard(ft.selectedCard)) {
				card.pile.pushCard(ft.selectedCard.pile.pop());
			}
			else {
				//if we cant move, just deselect old card and select new
				ft.selectedCard.deselect();
				ft.selectedCard = card;
				ft.selectedCard.select();
			}
		}
		//if selected card doesnt exist yet, select this one
		else {
			ft.selectedCard = card;
			card.select();
		}
	};


	global.PlayStack = PlayStack;
})(window);