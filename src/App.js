import React from 'react';
import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return <button className='square'
    onClick={onSquareClick}>
    {value}
  </button>
  /*

  onSquareClick is an parameter 
  value is an parameter
  onClick here is an built-in attribute in html button element
  onClick's work = whenever there's a click on the button it invokes the 
  function mentioned
   
   */
}



function Board({ xIsNext, squares, onPlay }) {

  /*
  Array(9) means creates array of size 9
  fill(null) puts null at 9 nines
  */
  function handleClick(i) {

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    /* the slice() method can be used with an array to create
     a new array that is a shallow copy of a portion of the 
     original array. When you call squares.slice(), it will 
     create a copy of the entire squares array. */

    if (xIsNext) {
      nextSquares[i] = "X";
    }
    else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);

  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  }
  else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }


  return (
    <React.Fragment>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>

    </React.Fragment>
  );
}


export default function Game() {



  const [history, setHistory] = useState([Array(9).fill(null)]);

  /*
  console.log(history)
  Output:  
  [[null, null, null, null, null, null, null, null, null]]
  now look carefully, "Array(9).fill(null)" is wrapped inside [] 
  which means that the array is itself a single element in history

  Note that the outer square brackets represent the 
  history array, and the inner square brackets represent 
  the array contained within history itself.
  */
  const [currentMove, setCurrentMove] = useState(0);
  // const currentSquares = history[history.length - 1];

  /*
  history.length = 9 
  and index of history array starts from 0 and ends at 8
  so , currentSquares is storing the value of last element 
  of history array which is "null" at this line

  */
  const [xIsNext, setXIsNext] = useState(true);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    // setHistory([...history, nextSquares]);
    /*
      ...history means elements of the history array 
      nextSquares is an array 
      nextSquares is appended to the history array

    */
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory);
    console.log("nextHistory: ", nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
    /*
     toggles xIsNext between true or false
    */
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    console.log("move: ", move);
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    }
    else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

      return squares[a];

    }
  }

  return null;
}
