// GAMEBOARD HTML FROM: https://github.com/codethejason/checkers/blob/master/index.html

import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

var boardState = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0]
];

var tiles = [];
var pieces = [];

var dictionary = ["0vmin", "10vmin", "20vmin", "30vmin", "40vmin", "50vmin", "60vmin", "70vmin", "80vmin", "90vmin"];

var playerTurn = 1;

class Stats extends React.Component {
    static propTypes = {
        player1: PropTypes.string,
        player2: PropTypes.string
    };

    constructor(props)
    {
        super(props);

        this.player1 = this.props.player1;
        this.player2 = this.props.player2;
    }
    
    render()
    {
        return (
            <div className="stats">
                <h2>Game Statistics</h2>
                <div className="wrapper">
                    <div id="player1">
                        <h3>{this.props.player1 + " (Top)"}</h3>
                    </div>
                    <div id="player2">
                        <h3>{this.props.player2 + " (Bottom)"}</h3>
                    </div>
                </div>
                <div className="turn"/>
            </div>
        )
    }
}

class Info extends React.Component {
    render()
    {
        return (
            <div className="info">
                <h1>Checkers</h1>
                <hr />
            </div>
        )
    }
}

class Tile extends React.Component {
    static propTypes = {
        position: PropTypes.object
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
            <div className="tile" style={style}/>
        )
    }
}

class Tiles extends React.Component {
    render()
    {
        return (
            [tiles]
        )
    }
}

class Piece extends React.Component {
    static propTypes = {
        king: PropTypes.bool,
        player: PropTypes.number,
        position: PropTypes.object
    };

    constructor(props)
    {
        super(props);

        this.king = this.props.king;
        this.player = this.props.player;
        this.position = this.props.position;
        
        this.state = {
            selected: false
        };

        this.onClick = this.onClick.bind(this);
    }

    toggleSelected()
    {
        this.setState({selected: !this.state.selected});
    }

    onClick()
    {
        if (playerTurn === this.player)
        {
            this.toggleSelected();
        }
    }

    render()
    {
        var style = {
            top: dictionary[this.position.row],
            left: dictionary[this.position.column]
        };

        var className = "piece";
        if (this.state.selected) className = "piece selected";
        
        return (
            <div className={className} style={style} onClick={this.onClick}/>
        )
    }
}

class PlayerPieces extends React.Component {
    static propTypes = {
        pieces: PropTypes.array
    }
    
    render()
    {
        return (
            [this.props.pieces]
        )
    }
}

class Pieces extends React.Component {
    constructor()
    {
        super();

        this.player1pieces = [];
        this.player2pieces = [];

        for (var idx in pieces)
        {
            var piece = pieces[idx];
            if (piece.props.player === 1)
            {
                this.player1pieces.push(piece);
            }
            else if (piece.props.player === 2)
            {
                this.player2pieces.push(piece);
            }
        }
    }
    
    render ()
    {
        return (
            <div className="pieces">
                <div className="player1pieces">
                    <PlayerPieces pieces={this.player1pieces}/>
                </div>
                <div className="player2pieces">
                    <PlayerPieces pieces={this.player2pieces}/>
                </div>
            </div>
        )
    }
}

class Board extends React.Component {
    constructor()
    {
        super();

        for (let row = 0; row < 8; row++)
        {
            var oddRow = (row % 2 !== 0) ? true : false;
            for (let column = 0; column < 8; column++)
            {
                var oddColumn = (column % 2 !== 0) ? true : false;
                var position = { row: row, column: column };
                var tileID = "tile" + ((row * 8) + (column + 1));
                var pieceID = "piece" + pieces.length;

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

                if (validTile)
                {
                    tiles.push(<Tile key={tileID} position={position}/>);

                    if (boardState[row][column] === 1)
                    {
                        pieces.push(<Piece key={pieceID} player={1} position={position} king={false}/>);
                    }
                    else if (boardState[row][column] === 2)
                    {
                        pieces.push(<Piece key={pieceID} player={2} position={position} king={false}/>);
                    }
                    else if (boardState[row][column] === 3)
                    {
                        pieces.push(<Piece key={pieceID} player={1} position={position} king={true}/>);
                    }
                    else if (boardState[row][column] === 4)
                    {
                        pieces.push(<Piece key={pieceID} player={2} position={position} king={true}/>);
                    }
                }
            }
        }
    }

    render()
    {
        return (
            <div className="board">
                <Tiles tiles={tiles}/>
                <Pieces/>
            </div>
        )
    }
}

class GameBoard extends React.Component {
    render()
    {
        // NOTE: Changing the body tag to div hides the game board.
        return (
            <body>
                <div className="column">
                    <Info/>
                    <Stats player1="Player 1" player2="Player 2"/>
                </div>
                <div className="column">
                    <Board/>
                </div>
            </body>
        )
    }
}

export default GameBoard;