import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
//////////////
  		//var coords = this.getPosition(step.pos);
		//var isCurrentStep = this.state.stepNumber == move;
  		//const desc = move ?
  		//	'Go to move #' + move + coords : 
  	//		'Go to game start';
  	//	return (
  	//		<li key = {move}>
  	//			<button onClick={() => this.jumpTo(move)} 
  	//				className = {isCurrentStep? 'currentState' : 'notCurrentState'}
  	//			>{desc}</button>
  	//		</li>
  	//	);
//////////////
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
  	var position = '';
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

  reverse() {
  	for(var i = 0; i < this.history.stepNumber.length; i++)
	  	alert(this.history[i].pos);
  }

  render() {
  	const history = this.state.history;
  	const current = history[this.state.stepNumber];
  	const winner = calculateWinner(current.squares);

  	const moves = history.map((step, move) => {
  		var coords = this.getPosition(step.pos);
		var isCurrentStep = this.state.stepNumber === move;
  		const desc = move ?
  			'Go to move #' + move + coords : 
  			'Go to game start';
  		return (
  			<li key = {move}>
  				<button onClick={() => this.jumpTo(move)} 
  					className = {isCurrentStep? 'currentState' : 'notCurrentState'}
  				>{desc}</button>
  			</li>
  		);
  	});

  	let status;
  	if(winner) {
  		status = 'Winner: ' + winner;
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
      <div className="game">
        <div className="game-board">
          <Board 
            squares = {current.squares}
            onClick = {i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
          <button onClick={() => this.reverse()}>Reverse</button>
        </div>
      </div>

    );
  }
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
		[2, 4, 6],
	];
	for(let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
