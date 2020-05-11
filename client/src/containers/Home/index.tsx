import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { CurrentUserState } from '../../reducers/auth';
import Header from '../../components/Header';
import { Container, Row, Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import MaterialTable from "material-table";
import { createGame, getCurrentGames, updateGamesStatus } from '../../actions/game';
import { GameState, GamesState } from '../../reducers/game';
import Leaderboard from '../../components/Leaderboard';
import { updateGame } from '../../actions/game';
import { Game } from '../../models';

interface HProps {
  currentUser: CurrentUserState;
  createGame: Function;
  game?: GameState;
  history: any;
  getCurrentGames: Function;
  currentGames: GamesState;
  getFinishedGames: Function;
  updateGame: Function;
  updateGamesStatus: Function;
}

interface HState {
  currentUser: CurrentUserState;
  game?: GameState;
  currentGames: GamesState;
  joinGame?: Game;
  showGameMovesModal: boolean;
  gameMoves: Game['gameMoves'];
}

class Home extends React.Component<HProps, HState> {
  state = {
    currentUser: {} as CurrentUserState,
    game: {} as GameState,
    currentGames: {} as GamesState,
    joinGame: {} as Game,
    showGameMovesModal: false,
    gameMoves: [] as Game['gameMoves']
  }

  interval: any;

  componentDidMount() {
    this.interval = setInterval(() => {
      const currentUser = this.props?.currentUser?.currentUser;
      if (currentUser) {
        const { token } = currentUser;
        this.props.updateGamesStatus(token);
        this.props.getCurrentGames(token);
        if (this.props?.currentGames?.games?.length > 0) {
          this.setState({ joinGame: this.getCurrentGameToJoin() }, () => this.state?.joinGame);
          this.setState({ currentGames: this.props?.currentGames})
        }
      }
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startGame = (e: any) => {
    e.preventDefault();
    const { token } = this.props?.currentUser?.currentUser;
    this.props.createGame(token);
    return this.props?.history?.push('/game-board');
  };

  playGame = (gameId: number | undefined) => {
    if (gameId && this.props?.currentUser?.currentUser) {
      const token = this.props?.currentUser?.currentUser?.token;
      this.props.updateGame(token, gameId, { } as Game);
      this.props.history.push('/game-board');
    }
  };

  viewMoves = (gameId: number | undefined) => {
    if(gameId) {
      let finishedGames = this.filterFinishedGames(this.state.currentGames?.games);
      let game = finishedGames.filter(game => {
        return game.id === gameId;
      })[0];
      this.setState({ gameMoves: game.gameMoves, showGameMovesModal: true });
    }
  }

  handleModalClose = () => {
    this.setState({ showGameMovesModal: false });
  }

  filterCurrentGames = (games: Game[]) => {
    const id = this.props?.currentUser?.currentUser?.id;
    return games?.filter(game => {
      return game.gameStatus === 'in-progress' && (game?.player1?.id === id || game?.player2?.id === id);
    });
  }

  filterFinishedGames = (games: Game[]) => {
    return games?.filter(game => {
      return game.winner !== null;
    });
  }

  getCurrentGameToJoin = () => {
    const games = this.state.currentGames?.games;
    const currentUserId = this.props?.currentUser?.currentUser?.id;
    return games?.filter(game => {
      return game.gameStatus === 'not-started' &&
      game.player2 === null &&
      game.winner === null &&
      game.player1?.id !== currentUserId
    }).reverse()[0];
  }

  joinGame = (id?: number) => {
    const token = this.props?.currentUser?.currentUser?.token;
    const userId = this.props?.currentUser?.currentUser?.id;
    let gameId = id || this.state?.joinGame?.id;
    this.props.updateGame(token, gameId, { player2Id: userId, gameStatus: 'in-progress' } as Game);
    this.props.history.push('/game-board');
  }

  render() {
    const currentUser = this.props?.currentUser?.currentUser;
    if (!currentUser?.isLoggedIn) {
      return <Redirect to="/" />;
    }

    const joinGame = this.state?.joinGame;

    const games = this.state.currentGames?.games;
    let currentGames: Game[] = [];
    let finishedGames: Game[] = [];
    if (games?.length > 0) {
      currentGames = this.filterCurrentGames(games);
      finishedGames = this.filterFinishedGames(games);
    }

    let showGameMovesModal = this.state.showGameMovesModal;
    let gameMoves = this.state.gameMoves;

    return (
      <React.Fragment>
        <Header {...currentUser} />
        <Container>
        <Modal show={showGameMovesModal} onHide={this.handleModalClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Game Moves</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              gameMoves &&
              <MaterialTable
                columns={[
                  { title: "Player", field: "player.username" },
                  { title: "Move", field: "boardState" }
                ]}
                data={gameMoves}
                options={{
                  pageSize: 5,
                  search: false,
                  showTitle: false
                }}
              />
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
          <Row style={{ marginTop: 20 }}>
            <Col style={{ textAlign: 'center' }}>
              <Button variant="primary" onClick={this.startGame} size='lg' block>
                Start Game
              </Button>
            </Col>
            <Col style={{ textAlign: 'center', }}>
              {joinGame?.id
                ?
                  <Button variant="success" onClick={() => this.joinGame()} size='lg' block>
                    Join Game
                  </Button>
                :
                  <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">There is no game available to join!</Tooltip>}>
                    <span>
                      <Button variant="success" style={{ pointerEvents: 'none' }} size='lg' block disabled>
                        Join Game
                      </Button>
                    </span>
                  </OverlayTrigger>
              }
            </Col>
          </Row>
          <Row>
            <Col style={{ marginTop: 20 }}><Leaderboard /></Col>
          </Row>
          <Row>
            <Col lg={12} style={{ marginTop: 20 }}>
              {
                currentGames &&
                <MaterialTable
                  columns={[
                    { title: "Opponent", render: rowData => {
                      return rowData.player1?.id === currentUser.id ?
                        rowData.player2?.username : rowData.player1?.username;
                    }},
                    { title: "Your Score", render: rowData => {
                      return rowData.player1?.id === currentUser.id ?
                        rowData.player1Score : rowData.player2Score;
                    }},
                    { title: "Opponent Score", render: rowData => {
                      return rowData.player1?.id !== currentUser.id ?
                        rowData.player1Score : rowData.player2Score;
                    }},
                    { title: "Your Turn", render: rowData => {
                      if ((rowData.playerTurn === 1 && rowData.player1?.id === currentUser.id) ||
                        (rowData.playerTurn === 2 && rowData.player2?.id === currentUser.id)) {
                        return "Yes";
                      } else {
                        return "No";
                      }
                    }},
                    { render: rowData => {
                      return (
                        <Button onClick={() => this.playGame(rowData.id)}>Play</Button>
                      );
                    }}
                  ]}
                  data={currentGames}
                  title="Current Games"
                  options={{
                    pageSize: 5,
                    search: false
                  }}
                />
              }
            </Col>
            <Col lg={12} style={{ marginTop: 20 }}>
              {
                finishedGames &&
                <MaterialTable
                  columns={[
                    { title: "Player 1", field: "player1.username" },
                    { title: "Player 2", field: "player2.username" },
                    { title: "Winner", field: "winner.username" },
                    { title: "Player 1 Score", field: "player1Score" },
                    { title: "Player 2 Score", field: "player2Score" },
                    { render: rowData => {
                      return (
                        <Button onClick={() => this.viewMoves(rowData.id)}>View</Button>
                      );
                    }}
                  ]}
                  data={finishedGames}
                  title="Finished Games"
                  options={{
                    pageSize: 5,
                    search: false
                  }}
                />
              }
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: HState) => ({
  currentUser: state.currentUser,
  game: state.game,
  currentGames: state.currentGames,
});

export default connect(mapStateToProps, { createGame, getCurrentGames, updateGame, updateGamesStatus })(Home);
