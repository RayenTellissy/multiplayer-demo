import React, { useContext, useEffect, useState } from 'react'

// components
import Player from './components/Player/Player'
import Context from './components/Context/Context'

// styles
import "./App.css"

// types
import { PlayerType } from './types'

const App = () => {
  const { playerId, playerX, playerY, socket } = useContext(Context)
  const [players,setPlayers] = useState<PlayerType[] | null>(null)

  useEffect(() => {
    window.addEventListener("beforeunload", handleUnload)
    if(socket) {
      socket.emit("join_game", {
        id: playerId,
        gameId: "11"
      })
      socket.on("player_joined", (data: PlayerType) => {
        const playersCopy = players ? players : []
        playersCopy.push(data)
        setPlayers(playersCopy)
      })
      socket.on("receive_player_position", (data: PlayerType) => {
        const index = players?.findIndex(e => e.id === data.id)
        if(index && players) {
          players[index] = data
        }
      })
    }
  }, [socket])

  const handleUnload = () => {
    if(socket) {
      socket.emit("leave_game", {
        id: playerId
      })
    }
  }
  
  return (
    <div id='app-container'>
      <Player x={playerX} y={playerY} />
      {players && players.map((e,i) => {
        return <Player key={i} x={e.x} y={e.y} />
      })}
    </div>
  )
}

export default App
