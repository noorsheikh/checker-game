import React from 'react';
import King1 from '../../static/king1.png';
import King2 from '../../static/king2.png';

interface PProps {
  king: boolean;
  player: number;
  playerTurn: number;
  position: any;
  selected: boolean;
  handleClick: Function;
  dictionary: string[];
}

class Piece extends React.Component<PProps, {}> {
  onClick = () => {
    this.props.handleClick(this.props.player, this.props.position, this.props.king);
  };

  render() {
    const style = {
      top: this.props.dictionary[this.props.position?.row],
      left: this.props.dictionary[this.props.position?.column],
      backgroundImage: '',
    };
    let className = 'piece';
    if (this.props.selected && this.props.playerTurn === this.props.player) {
      className += ' selected';
    }

    if (this.props.king) {
      if (this.props.player === 1) style.backgroundImage = 'url(' + King1 + ')';
      else if (this.props.player === 2) style.backgroundImage = 'url(' + King2 + ')';
    }

    return <div className={className} style={style} onClick={this.onClick} />;
  }
}

export default Piece;
