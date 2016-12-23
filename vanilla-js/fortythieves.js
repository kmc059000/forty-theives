(function() {

	var DrawPile = window.DrawPile;
	var DiscardPile = window.DiscardPile;
	var DropZone = window.DropZone;
	var PlayStack = window.PlayStack;
	var Card = window.Card;

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
				deck.push(new Card(cardNumber, cardSuit, ft));
				deck.push(new Card(cardNumber, cardSuit, ft));
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