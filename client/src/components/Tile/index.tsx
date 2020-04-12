import React from 'react';

const Tile: React.FC<{ position: any; handleClick: Function; style: any }> = ({ position, style, handleClick }) => (
  <div className="tile" style={style} onClick={() => handleClick(position)} />
);

export default Tile;
