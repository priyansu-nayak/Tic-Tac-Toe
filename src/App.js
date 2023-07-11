import React from 'react';
import { useState } from 'react';

function Square({ value, onSquareClick }) {

  return <button className='square' onClick={onSquareClick}>{value}</button>
}


export default function Board() {
  const winner = calculateWinner(squares);
  let status;
  if(winner){
    status = "Winner: "+winner;
  }
  else{
    status ="Next player: "+(xIsNext?"X":"O");
  }

  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  /*
  Array(9) means creates array of size 9
  fill(null) puts null at 9 nines
  */
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
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
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
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

function calculateWinner(squares){
  const lines=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    
    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
  ];

  for(let i=0;i<lines.length;i++){
    const [a,b,c]=lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a]=== squares[c]){
      return squares[a];
    }
  }

  return null;
}

