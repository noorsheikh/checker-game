import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getLeaderboard } from '../../actions/user';
import { LeaderboardState } from '../../reducers/user';
import { CurrentUserState } from '../../reducers/auth';

interface LProps {
  currentUser: CurrentUserState;
  getLeaderboard: Function;
  leaderboard: LeaderboardState;
}
  
interface LState {
  currentUser: CurrentUserState;
  leaderboard: LeaderboardState;
}

class Leaderboard extends React.Component<LProps, LState> {
  componentDidMount() {
    const { token } = this.props?.currentUser?.currentUser;
    this.props.getLeaderboard(token);
  }

  render() {
   const leaderboard = this.props.leaderboard;
   console.log(JSON.stringify(leaderboard));
    return (
      <React.Fragment>
        <Container fluid>
          
        </Container>
      </React.Fragment>
    );
  }
};

const mapStateToProps = (state: LState) => ({
  currentUser: state.currentUser,
  leaderboard: state.leaderboard
});

export default connect(mapStateToProps, { getLeaderboard })(Leaderboard);