require("dotenv").config()
const express = require("express")
const cors = require("cors")
import { Request, Response } from "express"
const http = require("http")
const { Server } = require("socket.io")
import { Player, gameData, leaveData, positionData } from "./types"

const PORT = 3000
const app = express()
const server = http.createServer(app)

app.use(cors())

const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

var players: Player[] = []

setInterval(() => {
  io.emit("game_loop", players)
}, 32)

app.get("/getPlayers", (req: Request, res: Response) => {
  res.send(players)
})

io.on("connection", (socket: any) => {
  console.log("user connected")

  socket.on("join_game", (data: gameData) => {
    const index = players.findIndex(e => e.id === data.id)
    if(index !== -1) return // player already in the lobby
    players.push({ id: data.id, x: 0, y: 0 })
    socket.join(data.gameId)
    socket.to(data.gameId).emit("player_joined", { id: data.id, x: 0, y: 0 })
  })

  socket.on("leave_game", (data: leaveData) => {
    players = players.filter(e => e.id !== data.id)
  })

  socket.on("update_player_position", (data: positionData) => {
    console.log(data.x, data.y)
    const index = players.findIndex(e => e.id === data.id)
    if(index !== -1) {
      players[index] = { id: data.id, x: data.x, y: data.y }
    }
    // socket.to(data.gameId).emit("receive_player_position", { id: data.id, x: data.x, y: data.y })
  })

  socket.on("disconnect", () => {
    console.log("user disconnected")
  })
})

server.listen(PORT, () => console.log(`> server running on port ${PORT}`))