import React, { createContext, useState, PropsWithChildren, useEffect } from 'react';
import io, { Socket } from "socket.io-client"

type ContextType = {
  playerId: string | null
  setPlayerId: React.Dispatch<string>
  playerX: number
  setPlayerX: React.Dispatch<number>
  playerY: number
  setPlayerY: React.Dispatch<number>
  isWPressed: boolean
  setIsWPressed: React.Dispatch<boolean>
  isSPressed: boolean
  setIsSPressed: React.Dispatch<boolean>
  isAPressed: boolean
  setIsAPressed: React.Dispatch<boolean>
  isDPressed: boolean
  setIsDPressed: React.Dispatch<boolean>
  socket: any | null
}

export const Context = createContext<ContextType>({
  playerId: localStorage.getItem("id"),
  setPlayerId: () => {},
  playerX: 0,
  setPlayerX: () => {},
  playerY: 0,
  setPlayerY: () => {},
  isWPressed: false,
  setIsWPressed: () => {},
  isSPressed: false,
  setIsSPressed: () => {},
  isAPressed: false,
  setIsAPressed: () => {},
  isDPressed: false,
  setIsDPressed: () => {},
  socket: null
})

export const ContextProvider = ({ children }: PropsWithChildren) => {
  const [playerId,setPlayerId] = useState(localStorage.getItem("id"))
  const [playerX,setPlayerX] = useState(0)
  const [playerY,setPlayerY] = useState(0)
  const [isWPressed,setIsWPressed] = useState(false)
  const [isSPressed,setIsSPressed] = useState(false)
  const [isAPressed,setIsAPressed] = useState(false)
  const [isDPressed,setIsDPressed] = useState(false)
  const [socket,setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    handleSocket()
  }, [])

  const handleSocket = () => {
    const socket = io(import.meta.env.VITE_SOCKET_URL)
    setSocket(socket)
  }

  return (
    <Context.Provider value={{
      playerId,
      setPlayerId,
      playerX,
      setPlayerX,
      playerY,
      setPlayerY,
      isWPressed,
      setIsWPressed,
      isSPressed,
      setIsSPressed,
      isAPressed,
      setIsAPressed,
      isDPressed,
      setIsDPressed,
      socket
    }}>
      { children }
    </Context.Provider>
  );
};

export default Context;