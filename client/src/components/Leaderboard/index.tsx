import React from 'react';
import { connect } from 'react-redux';
import MaterialTable from "material-table";
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
   const leaderboard = this.props?.leaderboard?.leaderboard;

    return (
      <React.Fragment>
        {
          leaderboard &&
          <MaterialTable
            columns={[
              { title: "Username", field: "username" },
              { title: "Wins", field: "wins", type: "numeric" },
              { title: "Losses", field: "losses", type: "numeric" },
              { title: "# Games", field: "numGames", type: "numeric" },
              { title: "Win Ratio", field: "winRatio", type: "numeric" },
            ]}
            data={leaderboard}
            title="Leaderboard"
            options={{
              pageSize: 10,
              search: false
            }}
          />
        }
      </React.Fragment>
    );
  }
};

const mapStateToProps = (state: LState) => ({
  currentUser: state.currentUser,
  leaderboard: state.leaderboard
});

export default connect(mapStateToProps, { getLeaderboard })(Leaderboard);