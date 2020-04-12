// GAMEBOARD HTML FROM: https://github.com/codethejason/checkers/blob/master/index.html

import King1 from './img/king1.png';
import King2 from './img/king2.png';
import React from 'react';

import './style.scss';
import { Container, Row, Col, Card, CardGroup, Button, NavLink } from 'react-bootstrap';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { CurrentUserState } from '../../reducers/auth';

const DEBUG = true;
const dictionary = ['0vmin', '10vmin', '20vmin', '30vmin', '40vmin', '50vmin', '60vmin', '70vmin', '80vmin', '90vmin'];

function dist(x1: any, y1: any, x2: any, y2: any) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function Stats(props: any) {
  let turnBackground = 'linear-gradient(to right, transparent 50%, #BEEE62 50%)';
  if (props.playerTurn === 1) {
    turnBackground = 'linear-gradient(to right, #BEEE62 50%, transparent 50%)';
  }

  const turnStyle = {
    background: turnBackground,
  };

  let p1idx = 0;
  const p1score: JSX.Element[] = [];
  while (p1idx < props.player1score) {
    p1score.push(<p key={p1idx} className="capturedPiece"></p>);
    p1idx++;
  }

  let p2idx = 0;
  const p2score = [];
  while (p2idx < props.player2score) {
    p2score.push(<p key={p2idx} className="capturedPiece"></p>);
    p2idx++;
  }

  return (
    <Card className="statistics">
      <Card.Body>
        <Card.Title style={{ textAlign: 'center' }}>
          <strong>Game Statistics</strong>
          <Card.Link as={Button} style={{ marginLeft: 20 }} href="#">Reset Game</Card.Link>
        </Card.Title>
        <div>
          <CardGroup>
            <Card className="player1">
              <Card.Body>
                <Card.Title>{`${props.player1} (Top)`}</Card.Title>
                <div>{[p1score]}</div>
              </Card.Body>
            </Card>
            <Card className="player2">
              <Card.Body>
                <Card.Title>{`${props.player2} (Bottom)`}</Card.Title>
                <div>{[p2score]}</div>
              </Card.Body>
            </Card>
          </CardGroup>
          <div className="turn" style={turnStyle} />
          {props.winnder && <span className="winner">{props.winner} won!</span>}
        </div>
      </Card.Body>
    </Card>
  );
}

const Pieces = (props: any) => {
  const player1pieces = [];
  const player2pieces = [];

  for (const idx in props.pieces) {
    const piece = props.pieces[idx];
    if (piece.props.player === 1) player1pieces.push(piece);
    else if (piece.props.player === 2) player2pieces.push(piece);
  }

  return (
    <div className="pieces">
      <div className="player1pieces">{[player1pieces]}</div>
      <div className="player2pieces">{[player2pieces]}</div>
    </div>
  );
};

interface TProps {
  position: any;
  handleClick: Function;
  id: string;
}

interface TState {
  position: any;
}

class Tile extends React.Component<TProps, TState> {
  componentDidMount() {
    this.setState({ position: this.props.position });
  }

  render() {
    const style = {
      top: dictionary[this.props.position?.row],
      left: dictionary[this.props.position?.column],
    };

    return (
      <div
        className="tile"
        id={this.props.id}
        style={style}
        onClick={() => this.props.handleClick(this.props.position)}
      />
    );
  }
}

interface PProps {
  king: boolean;
  player: number;
  playerTurn: number;
  position: any;
  selected: boolean;
  handleClick: Function;
}

class Piece extends React.Component<PProps, {}> {
  onClick = () => {
    this.props.handleClick(this.props.player, this.props.position, this.props.king);
  };

  render() {
    const style = {
      top: dictionary[this.props.position?.row],
      left: dictionary[this.props.position?.column],
      backgroundImage: '',
    };

    let className = 'piece';
    if (this.props.selected && this.props.playerTurn === this.props.player) {
      className += ' selected';
    }

    if (this.props.king) {
      if (this.props.player === 1) style.backgroundImage = 'url(' + King1 + ')';
      else if (this.props.player === 2) style.backgroundImage = 'url(' + King2 + ')';
    }

    return <div className={className} style={style} onClick={this.onClick} />;
  }
}

interface BState {
  boardState: number[][];
  player1score: number;
  player2score: number;
  playerTurn: number;
  jumpExist: boolean;
  selectedPiece: { [key: string]: any };
  pieces: { [key: string]: any }[];
  interval: any;
  currentUser: CurrentUserState;
}

class GameBoard extends React.Component<{ currentUser: CurrentUserState }, BState> {
  state = {
    boardState: [
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [2, 0, 2, 0, 2, 0, 2, 0],
      [0, 0, 0, 2, 0, 2, 0, 2],
      [2, 0, 2, 0, 2, 0, 2, 0],
    ],
    player1score: 0,
    player2score: 0,
    playerTurn: 1,
    jumpExist: false,
    selectedPiece: {
      king: null,
      player: null,
      position: {
        row: {},
        column: {},
      },
    },
    pieces: [
      {
        props: {
          player: '',
          position: {
            row: {},
            column: {},
          },
        },
      },
    ],
    interval: undefined,
    currentUser: {} as CurrentUserState,
  };

  pieces = [
    {
      props: {
        player: '',
        position: {
          row: {},
          column: {},
        },
      },
    },
  ];

  tick = () => {
    // TODO: Pull game board state from server and update state
  };

  componentDidMount() {
    this.setState({ interval: setInterval(() => this.tick(), 1000) });
  }

  componentWillUnmount() {
    this.setState({ interval: clearInterval(this.state.interval) });
  }

  isValidPlaceToMove = (tilePosition: any) => {
    const row = tilePosition?.row;
    const column = tilePosition?.column;
    if (row < 0 || row > 7 || column < 0 || column > 7) return false;
    let ret = false;
    if (this.state.boardState[row][column] === 0) {
      ret = true;
    }
    //if (DEBUG) console.log("isValidPlaceToMove:" + ret);
    return ret;
  };

  makeKing = (position: any) => {
    const boardState = this.state.boardState;
    if (boardState[position?.row][position?.column] === 1) {
      boardState[position?.row][position?.column] = 3;
    } else if (boardState[position?.row][position?.column] === 2) {
      boardState[position?.row][position?.column] = 4;
    }
    this.setState({ boardState: boardState });
  };

  getBoardValue = (selectedPiece: any) => {
    if (selectedPiece !== null) {
      if (selectedPiece.king) {
        if (selectedPiece.player === 1) return 3;
        else if (selectedPiece.player === 2) return 4;
      } else return selectedPiece.player;
    }
  };

  toggleTurn = () => {
    this.setState({ playerTurn: this.state.playerTurn === 1 ? 2 : 1 });
  };

  movePiece = (tilePosition: any) => {
    const selectedPiece: any = this.state.selectedPiece;
    const boardState = this.state.boardState;

    if (selectedPiece) {
      if (selectedPiece?.player !== this.state.playerTurn) return;

      //make sure piece doesn't go backwards if it's not a king
      if (selectedPiece?.player === 1 && selectedPiece?.king === false) {
        if (tilePosition?.row < selectedPiece?.position?.row) return false;
      } else if (selectedPiece?.player === 2 && selectedPiece.king === false) {
        if (tilePosition?.row > selectedPiece?.position?.row) return false;
      }
      //remove the mark from board and put it in the new spot
      boardState[selectedPiece?.position?.row][selectedPiece?.position?.column] = 0;

      boardState[tilePosition.row][tilePosition.column] = this.getBoardValue(selectedPiece);
      this.setState({ boardState: boardState });
      //if piece reaches the end of the row on opposite side crown it a king (can move all directions)
      if (!selectedPiece.king) {
        if (selectedPiece.player === 1) {
          if (tilePosition.row === 7) this.makeKing(tilePosition);
        } else if (selectedPiece.player === 2) {
          if (tilePosition.row === 0) this.makeKing(tilePosition);
        }
      }
    }
  };

  removePiece = (position: any) => {
    if (DEBUG) console.log('removePiece:' + JSON.stringify(position));
    const boardState = this.state.boardState;
    const player = this.state.boardState[position?.row][position?.column];
    if (player === 1) this.setState({ player2score: this.state.player2score + 1 }, () => {});
    else if (player === 2) this.setState({ player1score: this.state.player1score + 1 }, () => {});
    boardState[position?.row][position?.column] = 0;
    this.setState({ boardState: boardState });
  };

  inRange = (tilePosition: any) => {
    const { selectedPiece: piece, pieces } = this.state;
    if (piece) {
      for (const idx in this.pieces) {
        const k = this.pieces[idx];
        if (k.props.position?.row === tilePosition.row && k.props.position?.column === tilePosition?.column)
          return 'wrong';
      }
      if (!piece.king && piece.player === 1 && tilePosition.row < piece.position?.row) return 'wrong';
      if (!piece.king && piece.player === 2 && tilePosition.row > piece.position?.row) return 'wrong';
      if (
        dist(tilePosition?.row, tilePosition?.column, piece?.position?.row, piece?.position?.column) === Math.sqrt(2)
      ) {
        //regular move
        return 'regular';
      } else if (
        dist(tilePosition?.row, tilePosition?.column, piece?.position?.row, piece?.position?.column) ===
        2 * Math.sqrt(2)
      ) {
        //jump move
        return 'jump';
      } else {
        return 'wrong';
      }
    }
  };

  canJumpAny = (piece: any) => {
    return (
      piece &&
      (this.canOpponentJump(piece, { row: piece?.position?.row + 2, column: piece?.position?.column + 2 }) ||
        this.canOpponentJump(piece, { row: piece?.position?.row + 2, column: piece?.position?.column - 2 }) ||
        this.canOpponentJump(piece, { row: piece?.position?.row - 2, column: piece?.position?.column + 2 }) ||
        this.canOpponentJump(piece, { row: piece?.position?.row - 2, column: piece?.position?.column - 2 }))
    );
  };

  canOpponentJump = (piece: any, newPosition: any) => {
    const { pieces } = this.state;
    if (piece) {
      //find what the displacement is
      const dx = newPosition?.column - piece?.position?.column;
      const dy = newPosition?.row - piece?.position?.row;

      //make sure object doesn't go backwards if not a king
      if (piece.player === 1 && piece.king === false) {
        if (newPosition?.row < piece?.position?.row) return false;
      } else if (piece.player === 2 && piece.king === false) {
        if (newPosition?.row > piece?.position?.row) return false;
      }

      //must be in bounds
      if (newPosition.row > 7 || newPosition.column > 7 || newPosition.row < 0 || newPosition.column < 0) {
        return false;
      }

      //middle tile where the piece to be conquered sits
      const tileToCheckx = piece?.position?.column + dx / 2;
      const tileToChecky = piece?.position?.row + dy / 2;
      if (tileToCheckx > 7 || tileToChecky > 7 || tileToCheckx < 0 || tileToChecky < 0) {
        return false;
      }

      //if there is a piece there and there is no piece in the space after that
      if (
        !this.isValidPlaceToMove({ row: tileToCheckx, colmn: tileToChecky }) &&
        this.isValidPlaceToMove({ row: newPosition.row, column: newPosition.column })
      ) {
        for (const pieceIndex in this.pieces) {
          const thisPiece = this.pieces[pieceIndex].props;
          if (thisPiece?.position?.row === tileToChecky && thisPiece?.position?.column === tileToCheckx) {
            if (piece.player !== thisPiece.player) {
              //return the piece sitting there
              const ret = thisPiece?.position;

              //if (DEBUG) console.log("canOpponentJump:" + JSON.stringify(ret));
              return ret;
            }
          }
        }
      }
      return false;
    }
  };

  opponentJump = (tilePosition: any) => {
    const jumpPosition = this.canOpponentJump(this.state.selectedPiece, tilePosition);
    if (jumpPosition) {
      this.removePiece(jumpPosition);
      return true;
    }
    return false;
  };

  onTileClick = (tilePosition: any) => {
    if (DEBUG) console.log('onTileClick:' + JSON.stringify({ tilePosition }));

    const inRange = this.inRange(tilePosition);
    if (inRange !== 'wrong') {
      if (inRange === 'jump') {
        if (this.opponentJump(tilePosition)) {
          this.movePiece(tilePosition);
          const value = this.state.boardState[tilePosition.row][tilePosition.column];
          let player = 1;
          let king = false;
          if (value === 2) player = 2;
          else if (value === 3) king = true;
          else if (value === 4) {
            player = 2;
            king = true;
          }
          this.setState({ selectedPiece: { position: tilePosition, player, king } });
          if (this.canJumpAny({ position: tilePosition, player, king })) {
            // continuous jump
          } else {
            this.toggleTurn();
          }
        }
      } else if (inRange === 'regular' && !this.state.jumpExist) {
        if (!this.canJumpAny(this.state.selectedPiece)) {
          this.movePiece(tilePosition);
          this.toggleTurn();
        } else {
          alert('You must jump when possible!');
        }
      }
    }
  };

  onPieceClick = (player: any, position: any, king: any) => {
    if (DEBUG) console.log('onPieceClick:' + JSON.stringify({ player, position, king }));

    if (this.state.playerTurn === player) {
      const piecesThatCanJump = [];
      for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
          const boardValue = this.state.boardState[row][column];
          if (boardValue !== 0) {
            let boardPlayer = 1;
            let boardKing = false;
            if (boardValue === 2) boardPlayer = 2;
            else if (boardValue === 3) boardKing = true;
            else if (boardValue === 4) {
              boardPlayer = 2;
              boardKing = true;
            }

            const piece = { position: { row: row ?? '', column: column ?? '' }, player: boardPlayer, king: boardKing };
            if (this.canJumpAny(piece)) {
              piecesThatCanJump.push(piece);
            }
          }
        }
      }
      let selectedPieceCanJump = false;
      for (const idx in piecesThatCanJump) {
        const jumpablePiece = piecesThatCanJump[idx];
        console.log(jumpablePiece);
        console.log(position);
        if (jumpablePiece?.position?.row === position?.row && jumpablePiece?.position?.column === position?.column) {
          selectedPieceCanJump = true;
        }
      }

      const selectedPiece = this.state?.selectedPiece;
      if (selectedPiece !== null) {
        if (selectedPiece?.position?.row === position?.row && selectedPiece?.position?.column === position?.column) {
          this.setState({ selectedPiece: {} });
        } else {
          this.setState({ selectedPiece: { player, position, king } });
        }
      } else {
        this.setState({ selectedPiece: { player, position, king } });
      }
    }
  };

  handlePiecesUpdate = (pieces: any) => {
    this.setState({ pieces });
  };

  componentWillReceiveProps() {
    this.handlePiecesUpdate(this.pieces);
  }

  render() {
    const tiles = [];
    const pieces = [];
    const currentUser = this.props?.currentUser?.currentUser;

    for (let row = 0; row < 8; row++) {
      const oddRow = row % 2 !== 0 ? true : false;
      for (let column = 0; column < 8; column++) {
        const oddColumn = column % 2 !== 0 ? true : false;
        const position = { row: row, column: column };
        const tileID = 'tile' + (row * 8 + (column + 1));

        let validTile = false;
        if (oddRow) {
          if (!oddColumn) {
            validTile = true;
          }
        } else {
          if (oddColumn) {
            validTile = true;
          }
        }

        let selected = false;
        if (this.state?.selectedPiece !== null) {
          if (
            this.state?.selectedPiece?.position?.row === position?.row &&
            this.state?.selectedPiece?.position?.column === position?.column
          ) {
            selected = true;
          }
        }

        if (validTile) {
          tiles.push(<Tile key={tileID} id={tileID} position={position} handleClick={this.onTileClick} />);

          if (this.state.boardState[row][column] !== 0) {
            let player = 1;
            let king = false;
            if (this.state.boardState[row][column] === 2) {
              player = 2;
            } else if (this.state.boardState[row][column] === 3) {
              king = true;
            } else if (this.state.boardState[row][column] === 4) {
              player = 2;
              king = true;
            }

            const piece = (
              <Piece
                key={pieces.length}
                player={player}
                position={position}
                king={king}
                selected={selected}
                playerTurn={this.state.playerTurn}
                handleClick={this.onPieceClick}
              />
            );
            pieces.push(piece);
          }
        }
      }
    }
    this.pieces = pieces;

    let winner = undefined;
    if (this.state.player1score === 12) {
      winner = 'Player 1';
    } else if (this.state.player2score === 12) {
      winner = 'Player 2';
    }

    return (
      <React.Fragment>
        <Container fluid>
          <Header {...currentUser} />
          <Container>
            <Row>
              <Col>
                <Stats
                  playerTurn={this.state.playerTurn}
                  player1="Player 1"
                  player2="Player 2"
                  player1score={this.state.player1score}
                  player2score={this.state.player2score}
                  winner={winner}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="column">
                  <div className="board">
                    {[tiles]}
                    <Pieces pieces={pieces} />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: BState) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, {})(GameBoard);
