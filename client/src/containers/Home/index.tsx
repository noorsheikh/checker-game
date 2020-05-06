import React from 'react';
import { connect } from 'react-redux';
import { CurrentUserState } from '../../reducers/auth';
import Header from '../../components/Header';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { createGame } from '../../actions/game';
import { Redirect } from 'react-router-dom';
import { GameState } from '../../reducers/game';
import Leaderboard from '../../components/Leaderboard';

interface HProps {
  currentUser: CurrentUserState;
  createGame: Function;
  game?: GameState;
  history: any;
}

interface HState {
  currentUser: CurrentUserState;
  game?: GameState;
}

class Home extends React.Component<HProps, HState> {
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

    return (
      <React.Fragment>
        <Header {...currentUser} />
        <Container>
          <Row>
            <Col style={{ textAlign: 'center', marginTop: 20 }}>
              <Button variant="primary" onClick={this.startGame}>
                Start Game
              </Button>
              <Leaderboard />
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
});

export default connect(mapStateToProps, { createGame })(Home);
