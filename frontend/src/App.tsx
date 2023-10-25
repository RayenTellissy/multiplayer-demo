import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

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
  const [player1,setPlayer1] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // fetchPlayers()
  }, [])

  useEffect(() => {
    console.log(players)
  }, [players])

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
        // const index = players?.findIndex(e => e.id === data.id)
        console.log(players)
        // if(index && index !== 1 && players) {
        //   setPlayers(prevPlayers => {
        //     const updatedPlayers = [...(prevPlayers || [])]
        //     updatedPlayers[index] = data
        //     return updatedPlayers
        //   })
        // }
      })
    }
    return () => window.removeEventListener("beforeunload", handleUnload)
  }, [socket, players])

  const handleUnload = () => {
    if(socket) {
      socket.emit("leave_game", {
        id: playerId
      })
    }
  }

  const fetchPlayers = async () => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/getPlayers`)
    setPlayers(response.data)
    console.log(response.data)
  }
  
  return (
    <div id='app-container'>
      <MovementController />
      <Player x={playerX} y={playerY} />
      {/* <Player x={player1.x} y={player1.y} /> */}
      {players && players.map((e,i) => {
        return <Player key={i} x={e.x} y={e.y} />
      })}
    </div>
  )
}

export default App
