document.addEventListener("DOMContentLoaded", function () {
    var origboard;
    var huplayer = '0';
    var aiplayer  = 'X';
    var wincombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const cells = document.querySelectorAll('.cell');
    startgame();

    document.querySelector('button').addEventListener('click', startgame);

    function startgame() {
        document.querySelector(".endgame").style.display = "none";
        origboard = Array.from(Array(9).keys());
        for (var i = 0; i < cells.length; i++) {
            cells[i].innerText = '';
            cells[i].style.removeProperty('background-color');
            cells[i].addEventListener('click', turnclick, false);
        }
    }

    function turnclick(square) {
        if (typeof origboard[square.target.id] === 'number') {
            turn(square.target.id, huplayer);
            if (!checkTie()) turn(bestspot(), aiplayer);
        }
    }

    function turn(squareid, player) {
        origboard[squareid] = player;
        document.getElementById(squareid).innerText = player;
        let gamewon = checkWon(origboard, player);
        if (gamewon) gameover(gamewon);
    }

    function checkWon(board, player) {
        let plays = board.reduce((a, e, i) =>
            (e === player) ? a.concat(i) : a, []);
        let gameWon = null;
        for (let [index, win] of wincombos.entries()) {
            if (win.every(elem => plays.indexOf(elem) > -1)) {
                gameWon = { index: index, player: player };
                break;
            }
        }
        return gameWon;
    }
    

    function gameover(gamewon) {
        for (let index of wincombos[gamewon.index]) {
            document.getElementById(index).style.backgroundColor = (gamewon.player === huplayer) ? "blue" : "red";
        }

        for (var i = 0; i < cells.length; i++) {
            cells[i].removeEventListener('click', turnclick, false);
        }
        declarewinner(gamewon.player === huplayer ? "You Win!" : "You Lose");
    }

    function emptysquares() {
        return origboard.filter(s => typeof s === 'number');
    }

    function bestspot() {
        return minimax(origboard, aiplayer).index;
    }

    function checkTie() {
        if (emptysquares().length === 0) {
            for (var i = 0; i < cells.length; i++) {
                cells[i].style.backgroundColor = "green";
                cells[i].removeEventListener('click', turnclick, false);
            }
            declarewinner("Tie Game");
            return true;
        }
        return false;
    }

    function declarewinner(who) {
        document.querySelector(".endgame").style.display = "block";
        document.querySelector(".endgame .text").innerText = who;
    }

    function minimax(newboard, player) {
        var availspots = emptysquares(newboard);
    
        if (checkWon(newboard, huplayer)) {
            return { score: -10 };
        } else if (checkWon(newboard, aiplayer)) {
            return { score: 10 };
        } else if (availspots.length === 0) {
            return { score: 0 };
        }
    
        var moves = [];
        for (var i = 0; i < availspots.length; i++) {
            var move = {};
            move.index = newboard[availspots[i]];
            newboard[availspots[i]] = player;
    
            if (player === aiplayer) {
                var result = minimax(newboard, huplayer);
                move.score = result.score;
            } else {
                var result = minimax(newboard, aiplayer);
                move.score = result.score;
            }
    
            newboard[availspots[i]] = move.index;
            moves.push(move);
        }
    
        var bestmove = 0;
        if (player === aiplayer) {
            var bestscore = -10000;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score > bestscore) {
                    bestscore = moves[i].score;
                    bestmove = i;
                }
            }
        }
    
        return moves[bestmove];
    }
    
    // typing effect 
    const authorText = "Created by Sarvesh Raikar";
    const authorSpan = document.getElementById("author-text");
    let index = 0;

    function typeAuthor() {
        if (index < authorText.length) {
            authorSpan.textContent += authorText.charAt(index);
            index++;
            setTimeout(typeAuthor, 100);
        }
    }

    typeAuthor();
    

});
