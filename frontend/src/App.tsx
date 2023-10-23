import React, { useContext } from 'react'

// components
import Player from './components/Player/Player'
import Context from './components/Context/Context'

// styles
import "./App.css"

const App = () => {
  const { playerX, playerY } = useContext(Context)
  
  return (
    <div id='app-container'>
      <Player x={playerX} y={playerY} />
    </div>
  )
}

export default App
