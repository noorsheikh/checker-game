import React from 'react';
import { connect } from 'react-redux';
import { CurrentUserState } from '../../reducers/auth';
import Header from '../../components/Header';

interface HProps {
  currentUser: CurrentUserState;
  history?: any;
}

interface HState {
  currentUser: CurrentUserState;
}

class Home extends React.Component<HProps, HState> {
  render() {
    const currentUser = this.props?.currentUser?.currentUser;
    return (
      <React.Fragment>
        <Header {...currentUser} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: HState) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, null)(Home);
