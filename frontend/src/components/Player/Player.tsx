import React from 'react';

// styles
import "./Player.css" 

// controllers
import MovementController from '../../utils/MovementController/MovementController';

type PlayerProps = {
  x: number,
  y: number
}

const Player = ({ x, y }: PlayerProps) => {
  return (
    <>
      <MovementController />
      <div id='player-container' style={{ transform: `translateX(${x}px) translateY(${y}px)`}}/>
    </>
  );
};

export default Player;