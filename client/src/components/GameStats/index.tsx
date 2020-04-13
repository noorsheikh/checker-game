import React from 'react';
import { Card, CardGroup } from 'react-bootstrap';

interface GProps {
  playerTurn: number;
  player1score: number;
  player2score: number;
  player1: string;
  player2: string;
  winner?: string;
}

const GameStats: React.FC<GProps> = (props: GProps) => {
  let turnBackground = 'linear-gradient(to right, transparent 50%, #BEEE62 50%)';
  if (props.playerTurn === 1) {
    turnBackground = 'linear-gradient(to right, #BEEE62 50%, transparent 50%)';
  }

  const turnStyle = {
    background: turnBackground,
  };

  let p1idx = 0;
  const p1score: JSX.Element[] = [];
  while (p1idx < props.player1score) {
    p1score.push(<p key={p1idx} className="capturedPiece"></p>);
    p1idx++;
  }

  let p2idx = 0;
  const p2score = [];
  while (p2idx < props.player2score) {
    p2score.push(<p key={p2idx} className="capturedPiece"></p>);
    p2idx++;
  }

  return (
    <Card className="statistics">
      <Card.Body>
        <Card.Title style={{ textAlign: 'center' }}>
          <strong>Statistics</strong>
        </Card.Title>
        <div>
          <CardGroup>
            <Card className="player1">
              <Card.Body>
                <Card.Title>{`${props.player1} (Top)`}</Card.Title>
                <div>{[p1score]}</div>
              </Card.Body>
            </Card>
            <Card className="player2">
              <Card.Body>
                <Card.Title>{`${props.player2} (Bottom)`}</Card.Title>
                <div>{[p2score]}</div>
              </Card.Body>
            </Card>
          </CardGroup>
          <div className="turn" style={turnStyle} />
          {props.winner && <span className="winner">{props.winner} won!</span>}
        </div>
      </Card.Body>
    </Card>
  );
};

export default GameStats;
