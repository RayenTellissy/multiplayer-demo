import React from 'react';

// styles
import "./Player.css" 

type PlayerProps = {
  x: number,
  y: number
}

const Player = ({ x, y }: PlayerProps) => {
  return (
    <div id='player-container' style={{ transform: `translateX(${x}px) translateY(${y}px)`}}/>
  );
};

export default Player;