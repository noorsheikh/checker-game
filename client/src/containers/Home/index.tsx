import React from 'react';
import { connect } from 'react-redux';
import { CurrentUserState } from '../../reducers/auth';
import Header from '../../components/Header';
import { Container, Row, Col, Button } from 'react-bootstrap';
import MaterialTable from "material-table";
import { createGame, getCurrentGames, getFinishedGames } from '../../actions/game';
import { Redirect } from 'react-router-dom';
import { GameState, CurrentGamesState, FinishedGamesState } from '../../reducers/game';
import Leaderboard from '../../components/Leaderboard';

interface HProps {
  currentUser: CurrentUserState;
  createGame: Function;
  game?: GameState;
  history: any;
  getCurrentGames: Function;
  currentGames?: CurrentGamesState;
  getFinishedGames: Function;
  finishedGames?: FinishedGamesState;
}

interface HState {
  currentUser: CurrentUserState;
  game?: GameState;
  currentGames?: CurrentGamesState;
  finishedGames?: FinishedGamesState;
}

class Home extends React.Component<HProps, HState> {
  componentDidMount() {
    const currentUser = this.props?.currentUser?.currentUser;
    if (currentUser) {
      const { token } = currentUser;
      this.props.getCurrentGames(token, this.props?.currentUser?.currentUser.id);
      this.props.getFinishedGames(token);
    }
  }

  startGame = (e: any) => {
    e.preventDefault();
    const { token } = this.props?.currentUser?.currentUser;
    this.props.createGame(token);
    return this.props?.history?.push('/game-board');
  };

  render() {
    const currentUser = this.props?.currentUser?.currentUser;
    if (!currentUser?.isLoggedIn) {
      return <Redirect to="/" />;
    }

    const currentGames = this.props?.currentGames?.currentGames;
    console.log("current games:" + JSON.stringify(currentGames));

    const finishedGames = this.props?.finishedGames?.finishedGames;
    console.log("finished games:" + JSON.stringify(finishedGames));

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
                  currentGames &&
                  <MaterialTable
                    columns={[
                      { title: "Opponent", field: "player1.username" },
                      { title: "Player 1 Score", field: "player1Score" },
                      { title: "Player 2 Score", field: "player2Score" },
                      { title: "Last Updated", field: "updatedAt" }
                    ]}
                    data={currentGames}
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
                finishedGames &&
                <MaterialTable
                  columns={[
                    { title: "Player 1", field: "player1.username" },
                    { title: "Player 2", field: "player2.username" },
                    { title: "Winner", field: "winner.username" },
                    { title: "Player 1 Score", field: "player1Score" },
                    { title: "Player 2 Score", field: "player2Score" }
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
  finishedGames: state.finishedGames
});

export default connect(mapStateToProps, { createGame, getCurrentGames, getFinishedGames })(Home);
