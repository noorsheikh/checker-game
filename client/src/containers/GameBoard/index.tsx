// GAMEBOARD HTML FROM: https://github.com/codethejason/checkers/blob/master/index.html
import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { CurrentUserState } from '../../reducers/auth';
import Tile from '../../components/Tile';
import Piece from '../../components/Piece';
import GameStats from '../../components/GameStats';
import { dictionary, dist } from '../../utils';
import Pieces from '../../components/Pieces';
import { GameState } from '../../reducers/game';
import { Redirect } from 'react-router-dom';
import { updateGame, getGame, addGameMove } from '../../actions/game';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Game, GameMove } from '../../models';

// const DEBUG = true;

interface BProps {
  game: GameState;
  currentUser: CurrentUserState;
  match: any;
  history: any;
  updateGame: Function;
  getGame: Function;
  addGameMove: Function;
}

interface BState {
  boardState: number[][];
  player1score: number;
  player2score: number;
  playerTurn: number;
  selectedPiece: object;
  interval: any;
  alert: string;
  currentUser: CurrentUserState;
  game: GameState;
  winner: string;
  locked: boolean;
  lockPlayer: number;
  updatingServer: boolean;
}

class GameBoard extends React.Component<BProps, BState> {
  state = {
    boardState: [
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [2, 0, 2, 0, 2, 0, 2, 0],
      [0, 2, 0, 2, 0, 2, 0, 2],
      [2, 0, 2, 0, 2, 0, 2, 0],
    ],
    player1: "Player 1",
    player2: "Player 2",
    player1score: 0,
    player2score: 0,
    playerTurn: 1,
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
    alert: '',
    winner: "",
    locked: false,
    game: {} as GameState,
    lockPlayer: 0,
    updatingServer: false
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

  interval: any;

  componentDidMount() {
    this.interval = setInterval(() => {
      const game =this.props?.game?.game;
      const currentUser = this.props?.currentUser?.currentUser;
      const gameId = game?.id;
      const token = currentUser?.token;
      if (gameId && token) {
        this.props.getGame(token, gameId);
        // If request has gone to server to update
        if (this.state.updatingServer) {
          // Update client game board state if server state has been updated to match latest move
          if (JSON.stringify(this.state.game?.game?.boardState) === JSON.stringify(game?.boardState)) {
            this.setState({
              game: this.props?.game,
              lockPlayer: game.playerTurn === 1 ? 2 : 1,
              updatingServer: false
            });
          }
        } else {
          // Update client game board state if it is different than server game board state
          if (JSON.stringify(this.state.game?.game?.boardState) !== JSON.stringify(game?.boardState) ||
            this.state.game?.game?.player2Id !== game?.player2Id)
          {
            this.setState({
              game: this.props?.game,
              lockPlayer: game.playerTurn === 1 ? 2 : 1
            });
          }
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  isValidPlaceToMove = (tilePosition: any) => {
    const boardState = this.state.game?.game?.boardState || [];
    const row = tilePosition?.row;
    const column = tilePosition?.column;
    if (row < 0 || row > 7 || column < 0 || column > 7) return false;

    return boardState[row][column] === 0 ? true : false;
  };

  makeKing = (position: any) => {
    const boardState = this.state.game?.game?.boardState || [];
    if (boardState[position?.row][position?.column] === 1) {
      boardState[position?.row][position?.column] = 3;
    } else if (boardState[position?.row][position?.column] === 2) {
      boardState[position?.row][position?.column] = 4;
    }
    this.updateGameBoard(boardState);
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
    // this.setState({ playerTurn: this.state.playerTurn === 1 ? 2 : 1 });

    const { token } = this.props?.currentUser?.currentUser;
    const { id, playerTurn } = this.state.game?.game;
    const updateGamePayload: Game = {
      playerTurn: playerTurn === 1 ? 2 : 1,
    };
    this.props.updateGame(token, id, updateGamePayload);
    this.setState({ lockPlayer: playerTurn || 0 });
  };

  movePiece = (tilePosition: any) => {
    const selectedPiece: any = this.state.selectedPiece;
    const boardState = this.state.game?.game?.boardState || [];
    const playerTurn = this.state.game?.game?.playerTurn;

    if (selectedPiece) {
      if (selectedPiece?.player !== playerTurn) return;

      //make sure piece doesn't go backwards if it's not a king
      if (selectedPiece?.player === 1 && selectedPiece?.king === false) {
        if (tilePosition?.row < selectedPiece?.position?.row) return false;
      } else if (selectedPiece?.player === 2 && selectedPiece.king === false) {
        if (tilePosition?.row > selectedPiece?.position?.row) return false;
      }
      //remove the mark from board and put it in the new spot
      boardState[selectedPiece?.position?.row][selectedPiece?.position?.column] = 0;

      boardState[tilePosition?.row][tilePosition?.column] = this.getBoardValue(selectedPiece);

      this.updateGameBoard(boardState);
      //if piece reaches the end of the row on opposite side crown it a king (can move all directions)
      if (!selectedPiece.king) {
        if (selectedPiece.player === 1) {
          if (tilePosition.row === 7) this.makeKing(tilePosition);
        } else if (selectedPiece.player === 2) {
          if (tilePosition.row === 0) this.makeKing(tilePosition);
        }
      }
      this.setState({ selectedPiece: {} });
    }
  };

  removePiece = (position: any) => {
    // if (DEBUG) console.log('removePiece:' + JSON.stringify(position));
    const boardState = this.state.game?.game?.boardState || [];
    const boardValue = boardState[position?.row][position?.column];
    let player1score = this.state.game?.game?.player1Score || 0;
    let player2score = this.state.game?.game?.player2Score || 0;
    if (boardValue === 1 || boardValue === 3) player2score++;
    else if (boardValue === 2 || boardValue === 4) player1score++;
    boardState[position?.row][position?.column] = 0;
    this.updateGameBoardAndPlayerScores(boardState, player1score, player2score);
  };

  inRange = (tilePosition: any) => {
    const piece = this.state.selectedPiece;
    const pieces = this.pieces;
    if (piece) {
      for (const idx in pieces) {
        const k = pieces[idx];
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
    const pieces = this.pieces;
    const boardState = this.state.game?.game?.boardState || [];
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
        for (const pieceIndex in pieces) {
          const thisPiece = pieces[pieceIndex].props;
          if (thisPiece?.position?.row === tileToChecky && thisPiece?.position?.column === tileToCheckx) {
            if (piece.player !== thisPiece.player && boardState[tileToChecky][tileToCheckx] !== 0) {
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

  updateGameBoard = (boardState: number[][]) => {
    this.updateGameBoardAndPlayerScores(boardState, this.state.player1score, this.state.player2score);
  }

  checkIfWinner(player1score: number, player2score: number) {
    const token = this.props?.currentUser?.currentUser?.token;
    const gameId = this.state.game?.game?.id;
    const player1Id = this.state.game?.game?.player1?.id;
    const player2Id = this.state.game?.game?.player2?.id;
    let winner = false;
    if (player1score === 12) {
      this.props.updateGame(token, gameId, { winnerId: player1Id, gameStatus: 'completed' });
      winner = true;
    } else if (player2score === 12) {
      this.props.updateGame(token, gameId, { winnerId: player2Id, gameStatus: 'completed' });
      winner = true;
    }

    if (winner) {
      // this.setState({ locked: true });
      this.props.updateGame(token, gameId, { gameLocked: 1 });
    }
  }

  updateGameBoardAndPlayerScores = (boardState: number[][], player1Score: number, player2Score: number) => {
    this.setState({ player1score: player1Score, player2score: player2Score, boardState, updatingServer: true });

    this.checkIfWinner(player1Score, player2Score);

    const { token } = this.props?.currentUser?.currentUser;
    const { id, playerTurn, player1, player2 } = this.state.game?.game;
    const updateGamePayload: Game = {
      boardState,
      player1Score,
      player2Score
    };
    this.props.updateGame(token, id, updateGamePayload);
    const addGameMovePayload: GameMove = {
      gameId: id,
      playerId: playerTurn === 1 ? player1?.id : player2?.id,
      boardState
    };
    this.props.addGameMove(token, addGameMovePayload);
  }

  updateAlertState = (alert: string) => {
    this.setState({ alert });
  }

  boardValueMatchesPlayerTurn = (boardValue: number) => {
    const playerTurn = this.state.game?.game?.playerTurn;
    if ((boardValue === 1 || boardValue === 3) && playerTurn === 1) return true;
    else if ((boardValue === 2 || boardValue === 4) && playerTurn === 2) return true;
    return false;
  }

  playerTurnMatchesCurrentPlayer = () => {
    const { playerTurn, player1, player2 } = this.state.game?.game;
    const currentUser = this.props?.currentUser?.currentUser;
    if (playerTurn === 1 && player1?.id === currentUser.id) return true;
    else if (playerTurn === 2 && player2?.id === currentUser.id) return true;
    else return false;
  }

  onTileClick = (tilePosition: any) => {
    // if (DEBUG) console.log('onTileClick:' + JSON.stringify({ tilePosition }));
    const inRange = this.inRange(tilePosition);
    if (inRange !== 'wrong') {
      this.updateAlertState("");
      if (inRange === 'jump') {
        if (this.opponentJump(tilePosition)) {
          this.updateAlertState("");
          this.movePiece(tilePosition);
          const boardState = this.state.game?.game?.boardState || [];
          const value = boardState[tilePosition.row][tilePosition.column];
          let player = 1;
          let king = false;
          if (value === 2) player = 2;
          else if (value === 3) king = true;
          else if (value === 4) {
            player = 2;
            king = true;
          }
          if (!this.canJumpAny({ position: tilePosition, player, king })) {
            this.toggleTurn();
          } else {
            this.setState({ selectedPiece: { position: tilePosition, player, king } });
          }
        }
        else {
          this.updateAlertState("Not a valid jump.");
        }
      } else if (inRange === 'regular') {
        if (!this.canJumpAny(this.state.selectedPiece)) {
          this.updateAlertState("");
          if (this.isValidPlaceToMove(tilePosition)) {
            this.updateAlertState("");
            this.movePiece(tilePosition);
            this.toggleTurn();
          } else {
            this.updateAlertState("There is already a piece there.");
          }
        } else {
          this.updateAlertState("You must jump when possible.");
        }
      }
    }
    else {
      if (this.state.winner.length > 0) {
        this.updateAlertState("The game is over.");
      } else {
        if (Object.keys(this.state.selectedPiece).length !== 0) {
          this.updateAlertState("Not a valid move.");
        } else {
          this.updateAlertState("No piece selected.");
        }
      }
    }
  };

  onPieceClick = (player: any, position: any, king: any) => {
    // if (DEBUG) console.log('onPieceClick:' + JSON.stringify({ player, position, king }));
    const { playerTurn, gameLocked } = this.state.game?.game;
    if (playerTurn === player && gameLocked === 0 && this.playerTurnMatchesCurrentPlayer() && this.state.lockPlayer !== playerTurn) {
      const piecesThatCanJump = [];
      for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
          const boardState = this.state.game?.game?.boardState || [];
          const boardValue = boardState[row][column];
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
        if (jumpablePiece?.position?.row === position?.row && jumpablePiece?.position?.column === position?.column) {
          selectedPieceCanJump = true;
        }
      }

      if (!selectedPieceCanJump && piecesThatCanJump.length > 0) {
        this.updateAlertState("You must jump when possible and this piece can't jump.");
        return;
      }
      this.updateAlertState("");

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
    else {
      if (this.state.winner.length > 0) {
        this.updateAlertState("The game is over.");
      }
      else if (playerTurn !== player) {
        this.updateAlertState("It is not your turn.");
      }
    }
  };

  render() {
    const tiles = [];
    const pieces = [];
    const currentUser = this.props?.currentUser?.currentUser;
    const game = this.state.game?.game;
    const boardState = this.state.game?.game?.boardState;

    if (!currentUser?.isLoggedIn) {
      return <Redirect to="/" />;
    }

    if (boardState) {
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

          const style = {
            top: dictionary[position?.row],
            left: dictionary[position?.column],
          };

          if (validTile) {
            tiles.push(<Tile key={tileID} position={position} handleClick={this.onTileClick} style={style} />);

            if (boardState[row][column] !== 0) {
              let player = 1;
              let king = false;
              if (boardState[row][column] === 2) {
                player = 2;
              } else if (boardState[row][column] === 3) {
                king = true;
              } else if (boardState[row][column] === 4) {
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
                  playerTurn={game?.playerTurn ? game?.playerTurn : 0}
                  handleClick={this.onPieceClick}
                  dictionary={dictionary}
                />
              );
              pieces.push(piece);
            }
          }
        }
      }
      this.pieces = pieces;
    }

    let alert: string = !game?.player2 ? "Waiting for second player to join." : this.state.alert;

    return (
      <React.Fragment>
        <Container fluid>
          <Header {...currentUser} />
          {game?.id
            ?
              <Container>
                {!game?.id ||
                !(currentUser?.id === game?.player1?.id ||
                currentUser?.id === game?.player2?.id) ? (
                  <Row>
                    <Col style={{ marginTop: 20 }}>
                      <Alert variant="warning">Game board is not available with game id {game?.id}</Alert>
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <Col lg={4}>
                      <GameStats
                        playerTurn={game?.playerTurn ? game?.playerTurn : 0}
                        player1={game?.player1?.id ? `${game?.player1?.username}` : 'Player 1'}
                        player2={game?.player2?.id ? `${game?.player2?.username}` : 'Player 2'}
                        player1score={game.player1Score || 0}
                        player2score={game.player2Score || 0}
                        winner={game?.winner ? `${game?.winner?.firstName} ${game?.winner?.lastName}` : ''}
                        alert={alert}
                      />
                    </Col>
                    <Col lg={8}>
                      <div className="board">
                        {[tiles]}
                        <Pieces pieces={pieces} />
                      </div>
                    </Col>
                  </Row>
                )}
              </Container>
            :
              <Container>
                <Row>
                  <Col>
                    <FontAwesomeIcon icon={faSpinner} />
                  </Col>
                </Row>
              </Container>
          }
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: BState) => ({
  game: state.game,
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, { updateGame, getGame, addGameMove })(GameBoard);
