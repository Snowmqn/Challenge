angular.module('challenge')

.service('boggleService', function () {
    
    var letterList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    
    this.runBoggle = function () {
        result = {}
            // points - int
            // wordCount - int
            // words - array[words]
            // letters - array[letters]
        
        result.letters = getLetters()

        result.words = getWords(result.letters);

        result.wordCount = result.words.length;

        result.points = getPoints(result.words);
        return result;
    }

    //returns array[16] random from letter list
    var getLetters = function() {
        var result = [];
        for (let i=0;i<16;i++) {
            result[i] = letterList[Math.floor(Math.random()*letterList.length)];
        }
        return result;
    }

    var getPoints = function(words) {
        var points = 0;
        for (let i=0;i<words.length;i++) {
            if      (words[i].length  === 4 || 
                     words[i].length  === 3) points += 1;
            else if (words[i].length  === 5) points += 2;
            else if (words[i].length  === 6) points += 3;
            else if (words[i].length  === 7) points += 5;
            else if (words[i].length  >= 8)  points += 11;
        }
        return points;
    }

    function Branch (letter) {
        this.letter = letter;
        this.isWord = false;
        this.child = [];
    }

    function find(array, attr, value) {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }
    
    var dictTree = function() {
        result = [];
        // poplulate the root values of result
        for (let i=0;i<letterList.length;i++) {
            result[i] = new Branch(letterList[i]);
        }

        //go through dict every word
        for (let i=0;i<dict.length;i++) {
            var word = dict[i];
            var current = result[find(result, "letter", word[0])];
            //go through each letter
            for (let j=1;j<word.length;j++) {
                var test = find(current.child, "letter", word[j]);
                if (test > -1) {
                    current = current.child[test];
                }
                else {
                    var arr = current.child;
                    arr.push(new Branch(word[j]));
                    current = arr[arr.length - 1];
                }
            }
            current.isWord = true;
        }

        return result
    }();

    function Square (id, letter) {
        this.id = id;
        this.left = null;
        this.right = null;
        this.up = null;
        this.down = null;
        this.letter = letter;
    }

    var createBoard = function(letters) {
        var board = []
        for (let i=0;i<16;i++) {
            board.push(new Square(i, letters[i]));
        }

        for (let i=0;i<16;i++) {
            if (i > 3) {
                board[i].up = board[i - 4];
                board[i - 4].down = board[i];
            }

            if ((i + 1) % 4 != 0) {
                board[i].right = board[i+1];
            }

            if ((i + 1) % 4 != 1) {
                board[i].left = board[i - 1];
            }
        }
        return board;
    }

    var getWords = function(letters) {
        var board = createBoard(letters);
        var words = [];

        board.forEach((val, index) => {
            findWords(words, val.letter, val, new Square(null, null), dictTree[letterList.indexOf(val.letter)]);
        });
        return words;
    }

    var findWords = function (words, word, square, lastSquare, branch) {
        if (branch.isWord) {
            words.push(word);
        };

        var nextLetters = branch.child;
        var up = square.up;
        var down = square.down;
        var left = square.left;
        var right = square.right;

        if(up && up.id !== lastSquare.id && find(nextLetters, 'letter', up.letter) !== -1) {
            findWords(words, word + up.letter, up, square, nextLetters[find(nextLetters, 'letter', up.letter)]);
        }

        if(left && left.id !== lastSquare.id && find(nextLetters, 'letter', left.letter) !== -1) {
            findWords(words, word + left.letter, left, square, nextLetters[find(nextLetters, 'letter', left.letter)]);
        }

        if(down && down.id !== lastSquare.id && find(nextLetters, 'letter', down.letter) !== -1) {
            findWords(words, word + down.letter, down, square, nextLetters[find(nextLetters, 'letter', down.letter)]);
        }

        if(right && right.id !== lastSquare.id && find(nextLetters, 'letter', right.letter) !== -1) {
            findWords(words, word + right.letter, right, square, nextLetters[find(nextLetters, 'letter', right.letter)]);
        }
    }
});

