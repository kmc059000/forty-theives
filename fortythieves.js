﻿var ft = {
	cardNumbers : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
	cardSuits : ["C", "D", "S", "H"],
	discardPile: null,
	drawPile : null,
	playStacks : [],
	dropZones : [],
	selectedCard : undefined,
	logOn : false,
	logs : [],
	undoCount : 0,
	timer : null,
	startTime : new Date(),
	moves : 0,
};

ft.randOrd = function () {
    return (Math.round(Math.random()) - 0.5);
}

ft.generateDeck = function() {
	var deck, index, seed, i, j;

    deck = new Array(104);
    index = 0;
	for (i = 0; i < ft.cardNumbers.length; i++) {
		for (j = 0; j < ft.cardSuits.length; j++) {
			deck[index++] = getCard(ft.cardNumbers[i], ft.cardSuits[j]);
			deck[index++] = getCard(ft.cardNumbers[i], ft.cardSuits[j]);
		}
	}

	//var seed = 13616;
	//var seed = 49585; //winnable
	//var seed = 39838; //winnable
	//var seed = 2033; //winnable
	seed = Math.round((Math.random() * 100000));
	
	$('#infoList').append('<li>Game #: ' + seed + '</li>');
	
	Math.seedrandom(seed);
	
    deck.sort(ft.randOrd).sort(ft.randOrd).sort(ft.randOrd);

    return deck;
}

ft.deal = function() {
	var deck, selector, i, j, stack;

    deck = ft.generateDeck();

    selector = '#s';
	ft.logOn = false;

    for(i = 0; i < 10; i++) {
		stack = getPlayStack(selector + i);
		
		ft.playStacks.push(stack);
		
        for(j = 0; j < 4; j++) {
            stack.pushCard(deck.pop());   
        }
		
		stack.setup();
    }

    ft.drawPile = getDrawPile('.drawPile');
    while(deck.length > 0)
    {
        ft.drawPile.pushCard(deck.pop());
    }
	

    ft.discardPile = getDiscardPile('.discardPile');
	
	
	selector = '#d';
    for (i = 0; i < 8; i++) {
        stack = getDropZone(selector + i);
        ft.dropZones.push(stack);
		stack.setup();
    }
	
	$("#left, #right").click(deselectSelected);

	ft.logOn = true;
	ft.moves = 0;
}


function deselectSelected()
{
	if (ft.selectedCard != undefined)
        ft.selectedCard.getHtml().removeClass('selectedCard');
    ft.selectedCard = undefined;
}




/*********** Draw Pile */

var getDrawPile = function(sel) {
	var selector = sel;
	var stack = [];

	var pushCard = function (card) {
		stack.push(card);
		card.pile = this;

		if ($(selector).is(':empty')) {
			var cardBack = card.getBackHtml();
			cardBack.click(function () { 
				var c = card.pile.draw(); 
				ft.discardPile.pushCard(c); 
			});

			$(selector).append(cardBack);			
		}
	};
	
	var draw = function() {	
		var top = stack.pop();

		$(selector).empty();
		var nextToTop = stack.pop();

		if (nextToTop != undefined) {
			this.pushCard(nextToTop);
		};
		
		ft.moves++;
		return top;
	};
	
	return {
		draw : draw,
		pushCard : pushCard,
	}
}


/********Discard Pie ********* */

var getDiscardPile = function(sel){
	var selector = sel;
	var stack = [];
	
	var draw = function () {
		var top = stack.pop();

		var nextToTop = stack.pop();
		if (nextToTop != undefined) {
			this.pushCard(nextToTop);
		}
		else {
			$(selector).empty();
		}

		return top;
	};
	
	
	var peekTop = function () {
		if (stack.length == 0)
			return undefined;

		return stack[stack.length - 1];
	};
	
	
	var pushCard = function (card) {
		stack.push(card);
		card.pile = this;
		$(selector).append(card.getHtml());

		if (ft.selectedCard != undefined)
			ft.selectedCard.getHtml().removeClass('selectedCard');
		ft.selectedCard = undefined;

		//remove the click event of all cards
		for (var i = 0; i < stack.length; i++) {
			stack[i].getHtml().unbind('click');
		}


		card.getHtml().click(card.clickHandler(card));
		
		ft.undoCount++;
		
	};
	
	var clickHandler = function (card) {
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

	return {
		draw : draw,
		pop : draw,
		peekTop : peekTop,
		pushCard : pushCard,
		clickHandler : clickHandler,
	};
};


/*************Play Stack*/

var getPlayStack = function(sel) {
	var selector = sel;
	var stack = [];
	
	var setup = function() {
		var pile = this;
		$(selector).click(function () {
			if (stack.length == 0 && ft.selectedCard && ft.selectedCard.pile) {
				pile.pushCard(ft.selectedCard.pile.pop());            
			}
		});
	};
	
	var pop = function () {
		return stack.pop();
	};
	
	
	var peekTop = function () {
		if (stack.length == 0)
			return undefined;

		return stack[stack.length - 1];
	};
	
	var pushCard = function (card) {
		var cardHtml = card.getHtml();
		if (stack.length > 0) {
			cardHtml = cardHtml.css('top', stack.length * 25); 
		}
		else { 
			cardHtml = cardHtml.css('top', 0); 
		}

		$(selector).append(cardHtml);

		stack.push(card);
		card.pile = this;

		card.getHtml().click(card.clickHandler());
		
		ft.undoCount = 0;
		ft.moves++;
		
	};
	
	var clickHandler = function (card) {
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
	
	return {
		pop : pop,
		peekTop : peekTop,
		pushCard : pushCard,
		clickHandler : clickHandler,
		setup : setup,
	};
};







/********* Drop Zone ****/

var getDropZone = function(sel) {
	var selector = sel;
	var stack = [];
	
	
	var isFull = function() {
		return stack.length == 13;
	};
	
	var peekTop = function () {
		var top = stack.pop();

		if (top != undefined)
			stack.push(top);
		return top;
	};
	
	var pop = function () {
		var popped = stack.pop();

		popped.getHtml().click(popped.clickHandler(popped));

		return stack.pop();
	};
	
	var pushCard = function (card) {
		var cardHtml = card.getHtml();

		cardHtml = cardHtml.css('top', 0); 

		$(selector).append(cardHtml);

		stack.push(card);
		card.pile = this;

		for (var i = 0; i < stack.length; i++) {
			stack[i].getHtml().unbind('click');
		}

		card.getHtml().click(card.clickHandler(card));
		
		checkForWin();
		
		ft.undoCount = 0;
		
		if(ft.selectedCard) ft.selectedCard.deselect();
		ft.moves--;
		
	};
	
	var setup = function(){
		var pile = this;
		$(selector).click(function () {
			if (stack.length == 0 && (ft.selectedCard != undefined && ft.selectedCard.cardNumber == 1)) {
				pile.pushCard(ft.selectedCard.pile.pop());
			}
		});
	};
	
	var clickHandler = function (card) {
		if (ft.selectedCard != undefined) {
			if (card.canDropOnDropZoneCard(ft.selectedCard)) {
				card.pile.pushCard(ft.selectedCard.pile.pop());

				//not sure when ft.selectedCard becomes undefined between here and the if above... need to check it out
				if (ft.selectedCard != undefined) {
					ft.selectedCard.deselect();
				}
			}
			else {
				//if we cant move, just deselect old card and select new
				ft.selectedCard.deselect();
				ft.selectedCard = card;

				card.select();
			}
		}
	
	};
	
	return {
		peekTop : peekTop,
		pop : pop,
		pushCard : pushCard,
		clickHandler : clickHandler,
		isFull : isFull,
		setup : setup,
	};
	
	
	
};











/******** Card */



var getCard = function (cardNum, cardS) {
	
	
    var cardNumber = cardNum;
    var cardSuit = cardS;
    var html = $('<div class=\'card ' + cardSuit + '\'> <div class=\'cardsize _' + cardNumber + '\'> </div></div>');
    var htmlBack = $('<div class=\'cardBack\'></div>');

    var pile;
	
	var getHtml = function() {
		return html;
	};
	
	var getBackHtml = function() {
		return htmlBack;
	};
	
    var canDropOnZone = function(dropZone) {
        var topCard = zone.peekTop();
        return this.cardNumber - topCard.cardNumber == 1 && cardSuit == topCard.cardSuit;
    };

    var canDropOnOpenCard = function (card) {
        return cardNumber - card.cardNumber == 1 && cardSuit == card.cardSuit;
    };
	
    var canDropOnDropZoneCard = function (card) {
        return cardNumber - card.cardNumber == -1 && cardSuit == card.cardSuit;
    };	
	
	var clickHandler = function () {
		var card = this;
		return (function () {
			//ignore click if this is not the top
			if (card.pile.peekTop() != card) {
				return;
			}
			card.pile.clickHandler(card);
		});
	};
	
	var select = function() {
		ft.selectedCard = this;
		html.addClass('selectedCard');
	};
	
	var deselect = function() {
		html.removeClass('selectedCard');
		ft.selectedCard = undefined;
	};
	
	return {
		canDropOnZone : canDropOnZone,
		canDropOnOpenCard : canDropOnOpenCard,
		canDropOnDropZoneCard : canDropOnDropZoneCard,
		clickHandler : clickHandler,
		getHtml : getHtml,
		getBackHtml : getBackHtml,
		select : select,
		deselect : deselect,
		cardNumber : cardNumber,
		cardSuit : cardSuit,
		pile : pile
	};
};

function undo()
{	
	if(ft.undoCount <= 0 || !ft.discardPile.peekTop()) {
		alert('INVALID: cannot undo.');
		return;
	}
	
	ft.drawPile.pushCard(ft.discardPile.pop());
	ft.undoCount--;
	
	if(ft.selectedCard)
		ft.selectedCard.deselect();
	ft.moves+=5;
}

function checkForWin()
{

    for (var i = 0; i < ft.dropZones.length; i++) {
        var dropZone = ft.dropZones[i];
        if(!dropZone.isFull()) return;
    }
	
	for(var i=0;i<10;i++)
	{
		cornify_add();
	}
	
}

function toggleInfo()
{
	var infoPanel = $('#infoPanel');
	
	var off = infoPanel.css('display') == 'none';
	if(off)
		infoPanel.css('display', 'block');
	else
		infoPanel.css('display', 'none');
	
	$('#btnInfo').html(off ? 'Hide Info' : 'Show Info');
}

function viewLog()
{
	var list = $('#log');
	list.empty();

	for(var i = 0; i< ft.logs.length; i++)
	{
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
	elapsedMins = Math.floor(elapsed/minutes);
	elapsedSecs = Math.floor((elapsed/seconds)%60);
	
	if(elapsedSecs < 10)
		elapsedSecs = '0' + elapsedSecs;
	
	str = 'Time: ' + elapsedMins + ':' + elapsedSecs + ' Score: ' + ft.moves;
	
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
