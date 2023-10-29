import React, { useContext, useEffect, useRef, useState } from 'react'

// components
import Player from './components/Player/Player'
import Context from './components/Context/Context'

// styles
import "./App.css"

// types
import { PlayerType } from './types'

// controllers
import MovementController from './utils/MovementController/MovementController'

const App = () => {
  const { playerId, playerX, playerY, socket } = useContext(Context)
  const [players,setPlayers] = useState<PlayerType[] | null>(null)
  const playerXRef = useRef(playerX)
  const playerYRef = useRef(playerY)

  useEffect(() => {
    playerXRef.current = playerX
    playerYRef.current = playerY
  }, [playerX, playerY])

  useEffect(() => {
    window.addEventListener("beforeunload", handleUnload)
    if(socket) {
      console.log("joining")
      socket.emit("join_game", {
        id: playerId,
        gameId: "11"
      })
      socket.on("game_loop", (data: PlayerType[]) => {
        console.log(playerXRef.current, playerYRef.current)
        socket.emit("update_player_position", {
          id: localStorage.getItem("id"),
          x: playerXRef.current,
          y: playerYRef.current,
          gameId: "11"
        })
        setPlayers(data)
      })
    }
    return () => {
      if(socket) {
        socket.off("game_loop")
      }
      window.removeEventListener("beforeunload", handleUnload)
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
      <MovementController />
      {/* <Player x={playerX} y={playerY} /> */}
      {players && players.map((e,i) => {
        return <Player key={i} x={e.x} y={e.y} />
      })}
    </div>
  )
}

export default App
