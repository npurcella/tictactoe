import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 1. Display the location for each move in the format (col.row) in move history list - DONE
 2. Bold the currently selected item in the move list - DONE
 3. Rewrite Board to use two loops to make the squares instead of hardcoding them - TODO
 4. Add a toggle button that lets you sort the moves in either ascending or descending order - 1/2 DONE
 5. When someone wins, highlight the three squares that caused the win - TODO
 6. When no one wins, display a message about the result being a draw - DONE
*/

function Square(props) {
  return (
    <button className={props.class} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
  }
  // need to pass array of winning indexes from Game to here and set class
  renderSquare(i, yellow) {
    return (
      <Square
        value={this.props.squares[i]}
        class={yellow ? "square-yellow" : "square"}
        onClick={() => this.props.onClick(i)}
        winners={this.props.winners}
      />
    );
  }

  render() {	
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		history: [
  		  {
  			squares: Array(9).fill(null),
  		  }
  		],
  		stepNumber: 0,
  		xIsNext: true,
  		pos: null,
  	};
  }

  getPosition(indexOfSquare) {
  	let position = '';
  	switch(indexOfSquare) {
  		case 0:
  		position = ' (1, 1)';
  		break;
  		case 1:
  		position = ' (1, 2)';
  		break;
  		case 2:
  		position = ' (1, 3)';
  		break;
  		case 3:
  		position = ' (2, 1)';
  		break;
  		case 4:
  		position = ' (2, 2)';
  		break;
  		case 5:
  		position = ' (2, 3)';
  		break;
  		case 6:
  		position = ' (3, 1)';
  		break;
  		case 7:
  		position = ' (3, 2)';
  		break;
  		case 8:
  		position = ' (3, 3)';
  		break;
  		default:
  		position = ' (-1, -1)';
  		break;  		  		
  	}
  	return position;
  }
  handleClick(i) {
  	const history = this.state.history.slice(0, this.state.stepNumber + 1);
  	const current = history[history.length - 1];
  	const squares = current.squares.slice();
  	const pos = i;

  	if(calculateWinner(squares) || squares[i]) {
  		return;
  	}
  	squares[i] = this.state.xIsNext ? 'X' : 'O';
  	this.setState({
  		history: history.concat([
  		  {
  			squares: squares,
  			pos: pos,
  		  }
  		]),
  		stepNumber: history.length,
  		xIsNext: !this.state.xIsNext,
  	});
  }
  jumpTo(step) {
  	this.setState({
  		stepNumber: step,
  		xIsNext: (step % 2) === 0,
  	});
  }

  // The step #s are off in reverse, need to work on this
  reverse() {
    let reverse = [];
    this.setState({reverse: !this.state.reverse});
  	for(let i = 0; i < this.state.history.length; i++) {
      reverse.unshift(this.state.history[i]);
    }
    this.setState({history: reverse});
  }

  render() {
  	const history = this.state.history;
  	const current = history[this.state.stepNumber];
  	const winner = calculateWinner(current.squares);
    const winningSquares = calculateWinner(current.squares, true)

  	const moves = history.map((step, move) => {
      let desc;
  		const coords = this.getPosition(step.pos);
		  const isCurrentStep = this.state.stepNumber === move;
      coords === " (-1, -1)" ? desc = 'Game Start' : desc = 'Go to move#' + move + coords
      return (
        <li key = {move}>
          <button onClick={() => this.jumpTo(move)} className={isCurrentStep? 'currentState': 'notCurrentState'}>
            {desc}
          </button>
        </li>);
  	});

  	let status;
  	if(winner) {
  		status = 'Winner!: ' + winner;
  	}
  	else {
  		if(this.state.stepNumber === 9) {
  			status = 'It\'s a TIE!';
  		}
  		else {
  			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');  			
  		}
  	}

    return (
      <div className="container">
        <h1>Tic Tac Toe</h1>
        <div className="game">
          <div className="game-board">
            <Board 
              squares = {current.squares}
              onClick = {i => this.handleClick(i)}
              winners = {winningSquares}
              // do ternary if i == index of current && winner, add class
            />
          </div>
          <div className="game-info">
            <div className={winner ? 'red-bold' : ''}>{ status }</div>
            <ol>{ moves }</ol>
            <button onClick={() => this.reverse()}>Reverse</button>
          </div>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares, getIndexes) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5], 
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for(let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      if(getIndexes) {
        return lines[i];
      }
      else {
			 return squares[a];
      }
		}
	}
	return null;
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
