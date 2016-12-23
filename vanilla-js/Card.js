(function (global) {
	function Card(cardNum, cardS, game) {
		this.cardNumber = cardNum;
		this.cardSuit = cardS;
		this.html = $('<div class=\'card ' + this.cardSuit + '\'> <div class=\'cardsize _' + this.cardNumber + '\'> </div></div>');
		this.htmlBack = $('<div class=\'cardBack\'></div>');

		this.pile = null;

		this._game = game;
	}

	Card.prototype.getHtml = function getHtml() {
		return this.html;
	};

	Card.prototype.getBackHtml = function getBackHtml() {
		return this.htmlBack;
	};

	Card.prototype.canDropOnOpenCard = function canDropOnOpenCard(card) {
		return this.cardNumber - card.cardNumber == 1 && this.cardSuit == card.cardSuit;
	};

	Card.prototype.canDropOnDropZoneCard = function canDropOnDropZoneCard(card) {
		return this.cardNumber - card.cardNumber == -1 && this.cardSuit == card.cardSuit;
	};

	Card.prototype.clickHandler = function clickHandler() {
		var card = this;
		return (function () {
			//ignore click if this is not the top
			if (card.pile.peekTop() != card) {
				return;
			}
			card.pile.clickHandler(card);
		});
	};

	Card.prototype.select = function select() {
		this._game.selectedCard = this;
		this.html.addClass('selectedCard');
	};

	Card.prototype.deselect = function deselect() {
		this.html.removeClass('selectedCard');
		this._game.selectedCard = undefined;
	};


	global.Card = Card;
})(window);
