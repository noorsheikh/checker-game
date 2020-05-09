import React, { Component } from 'react';
import { GamesState } from '../../reducers/game';
import { connect } from 'react-redux';
import { getUnstartedGames, updateGame } from '../../actions/game';
import { CurrentUserState } from '../../reducers/auth';
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import moment from 'moment';
import { Game } from '../../models';

interface JGProps {
  getUnstartedGames: Function;
  unstartedGames: GamesState;
  currentUser: CurrentUserState;
  updateGame: Function;
  history: any;
}

interface JGState {
  unstartedGames: GamesState;
  currentUser: CurrentUserState;
}

class JoinGame extends Component<JGProps, JGState> {
  componentDidMount() {
    const token = this.props?.currentUser?.currentUser?.token;
    const userId = this.props?.currentUser?.currentUser?.id;
    this.props.getUnstartedGames(token, userId);
  }

  joinGame = (gameId: number) => {
    const token = this.props?.currentUser?.currentUser?.token;
    const userId = this.props?.currentUser?.currentUser?.id;
    this.props.updateGame(token, gameId, { player2Id: userId, gameStatus: 'in-progress' } as Game);
    this.props.history.push(`/game-board/${gameId}`);
  }

  render() {
    const currentUser = this.props?.currentUser?.currentUser;
    const unstartedGames = this.props?.unstartedGames?.games;
    if (!currentUser?.isLoggedIn) {
      return <Redirect to='/' />;
    }

    return (
      <React.Fragment>
        <Header {...currentUser} />
        <Container>
          <Row>
            <Col style={{ textAlign: 'center', marginTop: 20 }}>
              {unstartedGames?.length > 0
                ?
                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Game ID</th>
                        <th>Created By</th>
                        <th>Creation Date</th>
                        <th>Game Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unstartedGames?.map((game, index) => {
                        return <tr key={index + 1}>
                          <td>{index + 1}</td>
                          <td>{game.id}</td>
                          <td>{game?.player1?.firstName} {game?.player1?.lastName}</td>
                          <td>{moment(game.createdAt).format('MMM Do, YYYY')}</td>
                          <td>{game?.gameStatus === 'not-started' ? 'Waiting for player to join' : ''}</td>
                          <td>
                            <Button variant='success' onClick={() => this.joinGame(game.id || 0)} >Join Game</Button>
                          </td>
                        </tr>
                      })}
                    </tbody>
                  </Table>
                :
                  <h1>No game found to join. Please created a game and invite your friends to join.</h1>
              }
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: JGState) => ({
  unstartedGames: state.unstartedGames,
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, { getUnstartedGames, updateGame })(JoinGame);
