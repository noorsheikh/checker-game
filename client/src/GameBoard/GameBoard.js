// GAMEBOARD HTML FROM: https://github.com/codethejason/checkers/blob/master/index.html

import King1 from './img/king1.png';
import King2 from './img/king2.png';
import PropTypes from 'prop-types';
import React from 'react';

import './style.scss';

const DEBUG = true;
const dictionary = ["0vmin", "10vmin", "20vmin", "30vmin", "40vmin", "50vmin", "60vmin", "70vmin", "80vmin", "90vmin"];

function dist(x1, y1, x2, y2)
{
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

function Stats(props)
{
    var turnBackground = "linear-gradient(to right, transparent 50%, #BEEE62 50%)";
    if (props.playerTurn === 1)
    {
        turnBackground = "linear-gradient(to right, #BEEE62 50%, transparent 50%)";
    }

    var turnStyle = {
        background: turnBackground
    }
    
    return (
    <div className="stats">
        <h2>Game Statistics</h2>
        <div className="wrapper">
            <div id="player1">
                <h3>{props.player1 + " (Top)"}</h3>
            </div>
            <div id="player2">
                <h3>{props.player2 + " (Bottom)"}</h3>
            </div>
        </div>
        <div className="turn" style={turnStyle}/>
    </div>);
}

function Info()
{
    return (
        <div className="info">
            <h1>Checkers</h1>
            <hr />
        </div>
    );
}

function Pieces(props) {
    return (
        <div className="pieces">
            <div className="player1pieces">
                {[props.player1pieces]}
            </div>
            <div className="player2pieces">
                {[props.player2pieces]}
            </div>
        </div>
    );
}

class Tile extends React.Component {
    static propTypes = {
        position: PropTypes.object.isRequired
    };

    constructor(props)
    {
        super(props);

        this.position = this.props.position;
    }
    
    render()
    {
        var style = {
            top: dictionary[this.props.position.row],
            left: dictionary[this.props.position.column]
        };
        
        return (
            <div className="tile" style={style} onClick={()=> this.props.handleClick(this.props.position)}/>
        )
    }
}

class Piece extends React.Component {
    static propTypes = {
        king: PropTypes.bool.isRequired,
        player: PropTypes.number.isRequired,
        playerTurn: PropTypes.number.isRequired,
        position: PropTypes.object.isRequired,
        selected: PropTypes.bool.isRequired
    };

    constructor(props)
    {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick()
    {
        this.props.handleClick(this.props.player, this.props.position, this.props.king);
    }

    render()
    {
        var style = {
            top: dictionary[this.props.position.row],
            left: dictionary[this.props.position.column]
        };

        var className = "piece";
        if (this.props.selected && this.props.playerTurn === this.props.player)
        {
            className += " selected";
        }

        if (this.props.king)
        {
            if (this.props.player === 1) style.backgroundImage = 'url(' + King1 + ')';
            else if (this.props.player === 2) style.backgroundImage = 'url(' + King2 + ')';
        }
        
        return (
            <div className={className} style={style} onClick={this.onClick}/>
        )
    }
}

class Board extends React.Component {
    constructor()
    {
        super();

        this.state = {
            boardState: [
                [0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [2, 0, 2, 0, 2, 0, 2, 0],
                [0, 2, 0, 2, 0, 2, 0, 2],
                [2, 0, 2, 0, 2, 0, 2, 0]],
            playerTurn: 1,
            selectedPiece: undefined
        }

        this.onTileClick = this.onTileClick.bind(this);
        this.onPieceClick = this.onPieceClick.bind(this);
    }

    tick()
    {
        // TODO: Pull game board state from server and update state
    }
    
    componentDidMount()
    {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount()
    {
        clearInterval(this.interval);
    }

    isValidPlaceToMove(position)
    {
        var row = position.row;
        var column = position.column;
        if (row < 0 || row > 7 || column < 0 || column > 7) return false;
        if (this.state.boardState[row][column] === 0) {
            if (DEBUG) console.log("isValidPlaceToMove:true");
            return true;
        }
        return false;
    }

    makeKing(position)
    {
        var boardState = this.state.boardState;
        if (boardState[position.row][position.column] === 1)
        {
            boardState[position.row][position.column] = 3;
        }
        else if (boardState[position.row][position.column] === 2)
        {
            boardState[position.row][position.column] = 4;
        }
        this.setState({ boardState: boardState });
    }

    getBoardValue(selectedPiece)
    {
        if (selectedPiece !== undefined)
        {
            if (selectedPiece.king)
            {
                if (selectedPiece.player === 1)
                {
                    return 3;
                }
                else if (selectedPiece.player === 2)
                {
                    return 4;
                }
            }
            else
            {
                return selectedPiece.player;
            }
        }
    }

    toggleTurn()
    {
        this.setState({ playerTurn: (this.state.playerTurn === 1) ? 2 : 1 });
        // TODO: check if jump exists
    }

    movePiece(tilePosition)
    {
        var selectedPiece = this.state.selectedPiece;
        var boardState = this.state.boardState;

        if (selectedPiece)
        {
            if (selectedPiece.player !== this.state.playerTurn) return;

            //make sure piece doesn't go backwards if it's not a king
            if (selectedPiece.player === 1 && selectedPiece.king === false) {
                if (tilePosition.row < selectedPiece.position.row) return false;
            } else if (selectedPiece.player === 2 && selectedPiece.king === false) {
                if (tilePosition.row > selectedPiece.position.row) return false;
            }
            //remove the mark from board and put it in the new spot
            boardState[selectedPiece.position.row][selectedPiece.position.column] = 0;

            if (selectedPiece.king)
            {
                boardState[tilePosition.row][tilePosition.column] = this.getBoardValue(selectedPiece);

            }
            else
            {
                boardState[tilePosition.row][tilePosition.column] = selectedPiece.player;
            }
            this.setState({ boardState: boardState });
            //if piece reaches the end of the row on opposite side crown it a king (can move all directions)
            if (!selectedPiece.king && (selectedPiece.position.row === 0 || selectedPiece.position.row === 7))
                this.makeKing(tilePosition);

            this.toggleTurn();
        }
    }

    onTileClick(tilePosition)
    {
        if (DEBUG) console.log("onTileClick:" + JSON.stringify({tilePosition}));
        if (!this.isValidPlaceToMove(tilePosition)) return;
        this.movePiece(tilePosition);
    }

    onPieceClick(player, position, king)
    {
        if (DEBUG) console.log("onPieceClick:" + JSON.stringify({player, position, king}));

        this.setState({ selectedPiece: {player: player, position: position, king: king} });
        if (this.state.selectedPiece !== undefined)
        {
            if (this.state.playerTurn === this.state.selectedPiece.player &&
                this.state.selectedPiece.position.row === position.row &&
                this.state.selectedPiece.position.column === position.column)
            {
                this.setState({ selectedPiece: undefined });
            }
        }
    }

    render()
    {
        var tiles = [];
        var player1pieces = [];
        var player2pieces = [];

        for (let row = 0; row < 8; row++)
        {
            var oddRow = (row % 2 !== 0) ? true : false;
            for (let column = 0; column < 8; column++)
            {
                var oddColumn = (column % 2 !== 0) ? true : false;
                var position = { row: row, column: column };
                var tileID = "tile" + ((row * 8) + (column + 1));

                var validTile = false;
                if (oddRow)
                {
                    if (!oddColumn)
                    {
                        validTile = true;
                    }
                }
                else
                {
                    if (oddColumn)
                    {
                        validTile = true;
                    }
                }

                var selected = false;
                if (this.state.selectedPiece !== undefined)
                {
                    if (this.state.selectedPiece.position.row === position.row
                        && this.state.selectedPiece.position.column === position.column)
                    {
                        selected = true;
                    }
                }

                if (validTile)
                {
                    tiles.push(<Tile key={tileID} position={position} handleClick={this.onTileClick}/>);

                    if (this.state.boardState[row][column] === 1)
                    {
                        player1pieces.push(<Piece key={player1pieces.length} player={1} position={position} king={false} selected={selected} playerTurn={this.state.playerTurn} handleClick={this.onPieceClick}/>);
                    }
                    else if (this.state.boardState[row][column] === 2)
                    {
                        player2pieces.push(<Piece key={player2pieces.length} player={2} position={position} king={false} selected={selected} playerTurn={this.state.playerTurn} handleClick={this.onPieceClick}/>);
                    }
                    else if (this.state.boardState[row][column] === 3)
                    {
                        player1pieces.push(<Piece key={player1pieces.length} player={1} position={position} king={true} selected={selected} playerTurn={this.state.playerTurn} handleClick={this.onPieceClick}/>);
                    }
                    else if (this.state.boardState[row][column] === 4)
                    {
                        player2pieces.push(<Piece key={player2pieces.length} player={2} position={position} king={true} selected={selected} playerTurn={this.state.playerTurn} handleClick={this.onPieceClick}/>);
                    }
                }
            }
        }

        return (
            <body>
                <div className="column">
                    <Info/>
                    <Stats playerTurn={this.state.playerTurn} player1="Player 1" player2="Player 2"/>
                </div>
                <div className="column">
                    <div className="board">
                        {[tiles]}
                        <Pieces player1pieces={player1pieces} player2pieces={player2pieces}/>
                    </div>
                </div>
            </body>
        )
    }
}

function GameBoard() {
    return (
        <Board />
    );
}

export default GameBoard;