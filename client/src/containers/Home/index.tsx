import React from 'react';
import { connect } from 'react-redux';
import { CurrentUserState } from '../../reducers/auth';
import Header from '../../components/Header';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Redirect, NavLink } from 'react-router-dom';
import MaterialTable from "material-table";
import { createGame, getCurrentGames } from '../../actions/game';
import { GameState, GamesState } from '../../reducers/game';
import Leaderboard from '../../components/Leaderboard';
import { Game } from '../../models';

interface HProps {
  currentUser: CurrentUserState;
  createGame: Function;
  game?: GameState;
  history: any;
  getCurrentGames: Function;
  currentGames: GamesState;
  getFinishedGames: Function;
}

interface HState {
  currentUser: CurrentUserState;
  game?: GameState;
  currentGames: GamesState;
}

class Home extends React.Component<HProps, HState> {
  componentDidMount() {
    const currentUser = this.props?.currentUser?.currentUser;
    if (currentUser) {
      const { token, id } = currentUser;
      this.props.getCurrentGames(token, id);
    }
  }

  startGame = (e: any) => {
    e.preventDefault();
    const { token } = this.props?.currentUser?.currentUser;
    this.props.createGame(token);
    return this.props?.history?.push('/game-board');
  };

  playGame = (gameId: number | undefined) => {
    if (gameId) {
      this.props.history.push(`/game-board/${gameId}`);
    }
  };

  viewMoves = (gameId: number | undefined) => {
    if(gameId) {
      // show game moves
    }
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

  render() {
    const currentUser = this.props?.currentUser?.currentUser;
    if (!currentUser?.isLoggedIn) {
      return <Redirect to="/" />;
    }

    const games = this.props?.currentGames?.games;
    let currentGames: Game[] = [];
    let finishedGames: Game[] = [];
    if (games?.length > 0) {
      currentGames = this.filterCurrentGames(games);
      finishedGames = this.filterFinishedGames(games);
    }

    return (
      <React.Fragment>
        <Header {...currentUser} />
        <Container>
          <Row style={{ marginTop: 20 }}>
            <Col style={{ textAlign: 'center' }}>
              <Button variant="primary" onClick={this.startGame} size='lg' block>
                Start Game
              </Button>
            </Col>
            <Col style={{ textAlign: 'center', }}>
              <Button as={NavLink} to='/join-game' variant="success" size='lg' block>
                Join Game
              </Button>
            </Col>
          </Row>
          <Row>
            <Col><Leaderboard /></Col>
          </Row>
          <Row>
            <Col lg={12} style={{ marginTop: 20 }}>
              {
                currentGames &&
                <MaterialTable
                  columns={[
                    { title: "Opponent", render: rowData => {
                      return rowData.player1?.id === currentUser.id ?
                        rowData.player1?.username : rowData.player2?.username;
                    }},
                    { title: "Your Score", render: rowData => {
                      return rowData.player1?.id === currentUser.id ?
                        rowData.player1Score : rowData.player2Score;
                    }},
                    { title: "Opponent Score", render: rowData => {
                      return rowData.player1?.id !== currentUser.id ?
                        rowData.player1Score : rowData.player2Score;
                    }},
                    { title: "Play", render: rowData => {
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
                    { title: "View", render: rowData => {
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

export default connect(mapStateToProps, { createGame, getCurrentGames })(Home);
