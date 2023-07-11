import React from 'react';
import { useState } from 'react';

function Square({value,onSquareClick}) {
  
  return <button className='square' onClick={onSquareClick}>{value}</button>
}


export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  /*
  Array(9) means creates array of size 9
  fill(null) puts null at 9 nines
  */
  function handleClick(i){
    const nextSquares = squares.slice();
    /* the slice() method can be used with an array to create
     a new array that is a shallow copy of a portion of the 
     original array. When you call squares.slice(), it will 
     create a copy of the entire squares array. */
    nextSquares[i]="X";
    setSquares(nextSquares);
  }
  
  return (
    <React.Fragment>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={handleClick} />
        <Square value={squares[1]} onSquareClick={handleClick} />
        <Square value={squares[2]} onSquareClick={handleClick} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={handleClick} />
        <Square value={squares[4]} onSquareClick={handleClick} />
        <Square value={squares[5]} onSquareClick={handleClick} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={handleClick} />
        <Square value={squares[7]} onSquareClick={handleClick} />
        <Square value={squares[8]} onSquareClick={handleClick} />
      </div>

    </React.Fragment>
  );
}