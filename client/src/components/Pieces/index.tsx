import React from 'react';

const Pieces: React.FC<{ pieces: { [key: string]: any }[] }> = ({ pieces }) => {
  const player1pieces = [],
    player2pieces = [];

  for (const idx in pieces) {
    const piece = pieces[idx];
    if (piece.props.player === 1) player1pieces.push(piece);
    else if (piece.props.player === 2) player2pieces.push(piece);
  }

  return (
    <div className="pieces">
      <div className="player1pieces">{[player1pieces]}</div>
      <div className="player2pieces">{[player2pieces]}</div>
    </div>
  );
};

export default Pieces;
