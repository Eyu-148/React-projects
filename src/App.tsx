
import { useState } from "react";

interface squareProps {
  value: string;
  handleSquareClick: React.MouseEventHandler<HTMLButtonElement>;
}
// function component Square
function Square({value, handleSquareClick} : squareProps) {
  
  // syntax: const [property, setProperty] = useState<type>(default value)
  //const [value, setValue] = useState<string>("");

  //function handleClick() {
  //  console.log("Clicked!");
  //}

  return (
    <button className="square" onClick={handleSquareClick}>
      {value}
    </button>
  );
}

interface boardProps {
  isXNext:boolean;
  squares:string[];
  onPlay: Function;
}

// export the game board
function Board({isXNext, squares, onPlay}:boardProps) {

  // when rendering the board
  const winner = findWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  }
  else {
    status = "Next Player: " + (isXNext? "X":"O");
  }

  function handleClick(i:number) {
    // check if a. squares[i] is already filled / b. a winner has been declared
    if (squares[i] || findWinner(squares)) {
      return;
    }

    const newSquares = squares.slice(); // create a copy of the current squares array
    if (isXNext) {
      newSquares[i] = "X";                // update the value
    } 
    else {
      newSquares[i] = "O";
    }
    onPlay(newSquares);
  }

  // ()=> is the syntax of arrow function
  // passing properties using ()=> to avoid calling function before clicking
  // which means to place the handler inside a function
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} handleSquareClick={()=>handleClick(0)} />
        <Square value={squares[1]} handleSquareClick={()=>handleClick(1)} />
        <Square value={squares[2]} handleSquareClick={()=>handleClick(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} handleSquareClick={()=>handleClick(3)} />
        <Square value={squares[4]} handleSquareClick={()=>handleClick(4)} />
        <Square value={squares[5]} handleSquareClick={()=>handleClick(5)} />      
      </div>

      <div className="board-row">
        <Square value={squares[6]} handleSquareClick={()=>handleClick(6)} />
        <Square value={squares[7]} handleSquareClick={()=>handleClick(7)} />
        <Square value={squares[8]} handleSquareClick={()=>handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  // syntax: const [property, setProperty] = useState<type>(default value)
  const [currentMove, setCurrentMove] = useState<number>(0);
  const isXNext = currentMove % 2 === 0;
  // default value to history array: an empty array [] containg 9 null value -> at game start
  const [history, setHistory] = useState<string[][]>([Array(9).fill(null)]);
  const currentSquare = history[currentMove];

  function handlePlay(newSquares:string[]) {
    const newHistory = [...history.slice(0, currentMove+1), newSquares];
    setHistory(newHistory);                 // update the history array
    setCurrentMove(newHistory.length - 1);  // update the current move
  }

  function jumpTo(move:number) {
    setCurrentMove(move);                   //update the current move
  }

  console.log(history);
  // syntax: array.map((element, index) => ...)
  const moves = history.map((squares, move) => {
    let info;
    if (move > 0) {
      info = "Go to Move#" + move;
    } else {
      info = "Go to Start";
    }
    // notice: assigning a key to each list element
    return (
      <li key={move}>
        <button onClick={()=>jumpTo(move)}>{info}</button>
      </li>
    );
  });

  return (
    <div className="game-play">
      <div className="game-board">
        <Board isXNext={isXNext} squares={currentSquare} onPlay={handlePlay}/>
      </div>
      <div className="game-history">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}


function findWinner(squares:string[]) {
  // define the winning lines
  const winLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
  ];

  for (let i=0; i<winLines.length; ++i) {
    const [a, b, c] = winLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return "";
}
