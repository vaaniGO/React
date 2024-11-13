import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Whenever a componenet does not have a state of it's own, describing it as a function is much easier
function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}
class Game extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i])
            return;
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState(
            {
                history: history.concat([{
                    squares: squares,
                }]),
                stepNumber: history.length,
                xIsNext: !this.state.xIsNext,
            });
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step%2) ===0,
      });
    }

    handleMoveChange = (event) => {
      this.setState({ selectedMove: parseInt(event.target.value, 10) });
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const status =  winner ? ('Winner: ' + winner) : ('Next player: ' + (this.state.xIsNext ? 'X' : 'O'));
        const moves = history.map((step, move) => {
            const desc = move ?
              'Go to move #' + move :
              'Go to game start';
            return (
              <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
              </li>
            );
          });
        
        return (
          <div className="game">
            <div className="game-board">
              <Board
              squares = {current.squares}
              onClick = {(i) => this.handleClick(i)} />
            </div>
            <div className="game-info">
              <div className = "status">{status}</div>
              <select onChange={this.handleMoveChange} value = {this.state.selectedMove}>
                {history.map((step, move) =>(
                <option key={move} value={move}>
                  {move ? `Go to move #${move}` : 'Go to game start'}
                </option>
              ))}
              </select>
              <button onClick = {() => this.jumpTo(this.state.selectedMove)}>Jump To Move</button>
            </div>
          </div>
        );
    }
}
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        }
    }
    renderSquare(i) {
        return (
          <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
          />
        );
    }
    //Renders the board in terms of squares
    render() {
        //returns the board to be displayed
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

//Calculates if the 'squares' result in a winner
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

// Render the Board component to the DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);
