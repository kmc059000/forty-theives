(function() {

	var DrawPile = window.DrawPile;
	var DiscardPile = window.DiscardPile;
	var DropZone = window.DropZone;
	var PlayStack = window.PlayStack;

	var ft = {
		cardNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
		cardSuits: ["C", "D", "S", "H"],
		decks: 2,
		discardPile: null,
		drawPile: null,
		playStacks: [],
		dropZones: [],
		selectedCard: undefined,
		logOn: false,
		logs: [],
		undoCount: 0,
		timer: null,
		startTime: new Date(),
		score: 0
	};

	ft.generateDeck = function generateDeck() {
		var deck = [];

		_.forEach(ft.cardNumbers, function (cardNumber) {
			_.forEach(ft.cardSuits, function (cardSuit) {
				deck.push(createCard(cardNumber, cardSuit));
				deck.push(createCard(cardNumber, cardSuit));
			});
		});

		//one shuffle didnt seem all that random. Similar cards seemed to beright next to each other
		deck = _(deck).shuffle().shuffle().shuffle().value();

		return deck;
	};

	ft.deal = function deal() {
		var deck, selector, i, j, stack;

		deck = ft.generateDeck();

		selector = '#s';
		ft.logOn = false;

		for (i = 0; i < 10; i++) {
			stack = new PlayStack(selector + i, ft);

			ft.playStacks.push(stack);

			for (j = 0; j < 4; j++) {
				stack.pushCard(deck.pop());
			}

			stack.setup();
		}

		ft.discardPile = new DiscardPile('.discardPile', ft);

		ft.drawPile = new DrawPile('.drawPile', ft.discardPile, ft);

		while (deck.length > 0) {
			ft.drawPile.pushCard(deck.pop());
		}





		selector = '#d';
		for (i = 0; i < 8; i++) {
			stack = new DropZone(selector + i, ft);
			ft.dropZones.push(stack);
			stack.setup();
		}

		$("#left, #right").click(deselectSelected);

		ft.logOn = true;
		ft.score = 0;
	};


	function deselectSelected() {
		if (ft.selectedCard != undefined)
			ft.selectedCard.getHtml().removeClass('selectedCard');
		ft.selectedCard = undefined;
	}


	/******** Card */

	function createCard(cardNum, cardS) {


		var cardNumber = cardNum;
		var cardSuit = cardS;
		var html = $('<div class=\'card ' + cardSuit + '\'> <div class=\'cardsize _' + cardNumber + '\'> </div></div>');
		var htmlBack = $('<div class=\'cardBack\'></div>');

		var pile;

		function getHtml() {
			return html;
		}

		function getBackHtml() {
			return htmlBack;
		}

		function canDropOnZone(dropZone) {
			var topCard = zone.peekTop();
			return this.cardNumber - topCard.cardNumber == 1 && cardSuit == topCard.cardSuit;
		}

		function canDropOnOpenCard(card) {
			return cardNumber - card.cardNumber == 1 && cardSuit == card.cardSuit;
		}

		function canDropOnDropZoneCard(card) {
			return cardNumber - card.cardNumber == -1 && cardSuit == card.cardSuit;
		}

		function clickHandler() {
			var card = this;
			return (function () {
				//ignore click if this is not the top
				if (card.pile.peekTop() != card) {
					return;
				}
				card.pile.clickHandler(card);
			});
		}

		function select() {
			ft.selectedCard = this;
			html.addClass('selectedCard');
		}

		function deselect() {
			html.removeClass('selectedCard');
			ft.selectedCard = undefined;
		}

		return {
			canDropOnZone: canDropOnZone,
			canDropOnOpenCard: canDropOnOpenCard,
			canDropOnDropZoneCard: canDropOnDropZoneCard,
			clickHandler: clickHandler,
			getHtml: getHtml,
			getBackHtml: getBackHtml,
			select: select,
			deselect: deselect,
			cardNumber: cardNumber,
			cardSuit: cardSuit,
			pile: pile
		};
	}

	function undo() {
		if (ft.undoCount <= 0 || !ft.discardPile.peekTop()) {
			alert('INVALID: cannot undo.');
			return;
		}

		ft.drawPile.pushCard(ft.discardPile.pop());
		ft.undoCount--;

		if (ft.selectedCard)
			ft.selectedCard.deselect();
		ft.score += 5;
	}

	ft.checkForWin = function checkForWin() {

		for (var i = 0; i < ft.dropZones.length; i++) {
			var dropZone = ft.dropZones[i];
			if (!dropZone.isFull()) return;
		}

		for (i = 0; i < 10; i++) {
			cornify_add();
		}
	};

	function toggleInfo() {
		var infoPanel = $('#infoPanel');

		var off = infoPanel.css('display') == 'none';
		if (off)
			infoPanel.css('display', 'block');
		else
			infoPanel.css('display', 'none');

		$('#btnInfo').html(off ? 'Hide Info' : 'Show Info');
	}

	function viewLog() {
		var list = $('#log');
		list.empty();

		for (var i = 0; i < ft.logs.length; i++) {
			list.append('<li>' + ft.logs[i] + '</li>');
		}
	}

	function newGame() {
		location.reload(true);
	}

	function updateStatus() {

		//memory leak?
		var elapsed, elapsedMins, elapsedSecs,
			str,
			seconds, minutes;

		seconds = 1000;
		minutes = seconds * 60;

		elapsed = new Date().getTime() - ft.startTime.getTime();
		elapsedMins = Math.floor(elapsed / minutes);
		elapsedSecs = Math.floor((elapsed / seconds) % 60);

		if (elapsedSecs < 10)
			elapsedSecs = '0' + elapsedSecs;

		str = 'Time: ' + elapsedMins + ':' + elapsedSecs + ' Score: ' + ft.score;

		$('#lblInfo').text(str);

		ft.timer = setTimeout(updateStatus, 250);
	}

	$(document).ready(function () {
		$('#btnNewGame').click(newGame);
		$('#btnUndo').click(undo);
		$('#btnInfo').click(toggleInfo);
		$('#btnViewLog').click(viewLog);

		updateStatus();
		ft.timer = setTimeout(updateStatus, 250);


		ft.deal();

	});
})();