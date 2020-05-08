import React from 'react';
import { connect } from 'react-redux';
import { CurrentUserState } from '../../reducers/auth';
import Header from '../../components/Header';
import { Container, Row, Col, Button } from 'react-bootstrap';
import MaterialTable from "material-table";
import { createGame, getCurrentGames } from '../../actions/game';
import { Redirect } from 'react-router-dom';
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

  filterCurrentGames = (games: Game[]) => {
    const id = this.props?.currentUser?.currentUser?.id;
    return games?.filter(game => {
      return game.gameStatus === 'in-progress' && (game?.player1?.id === id || game?.player2?.id === id);
    })
  }

  filterFinishedGames = (games: Game[]) => {
    return games?.filter(game => {
      return game.winner !== null;
    })
  }

  render() {
    const currentUser = this.props?.currentUser?.currentUser;
    if (!currentUser?.isLoggedIn) {
      return <Redirect to="/" />;
    }

    const currentGames = this.props?.currentGames?.games;

    return (
      <React.Fragment>
        <Header {...currentUser} />
        <Container>
          <Row style={{ marginTop: 20 }}>
            <Col><Leaderboard /></Col>
            <Col style={{ textAlign: 'center' }}>
              <Row>
                <Button variant="primary" onClick={this.startGame}>
                  Start Game
                </Button>
              </Row>
              <Row style={{ marginTop: 20 }}>
                {
                  this.filterCurrentGames(currentGames) &&
                  <MaterialTable
                    columns={[
                      { title: "Opponent", field: "player1.username" },
                      { title: "Player 1 Score", field: "player1Score" },
                      { title: "Player 2 Score", field: "player2Score" },
                      { title: "Last Updated", field: "updatedAt" }
                    ]}
                    data={this.filterCurrentGames(currentGames)}
                    title="Current Games"
                    options={{
                      pageSize: 5,
                      search: false
                    }}
                  />
                }
              </Row>
            </Col>
            <Col>
              {
                this.filterFinishedGames(currentGames) &&
                <MaterialTable
                  columns={[
                    { title: "Player 1", field: "player1.username" },
                    { title: "Player 2", field: "player2.username" },
                    { title: "Winner", field: "winner.username" },
                    { title: "Player 1 Score", field: "player1Score" },
                    { title: "Player 2 Score", field: "player2Score" }
                  ]}
                  data={this.filterFinishedGames(currentGames)}
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
