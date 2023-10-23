import React, { createContext, useState, PropsWithChildren, useEffect } from 'react';

type ContextType = {
  playerX: number,
  setPlayerX: React.Dispatch<number>
  playerY: number,
  setPlayerY: React.Dispatch<number>,
  isWPressed: boolean,
  setIsWPressed: React.Dispatch<boolean>,
  isSPressed: boolean,
  setIsSPressed: React.Dispatch<boolean>
  isAPressed: boolean,
  setIsAPressed: React.Dispatch<boolean>
  isDPressed: boolean,
  setIsDPressed: React.Dispatch<boolean>
}

export const Context = createContext<ContextType>({
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
  setIsDPressed: () => {}
})

export const ContextProvider = ({ children }: PropsWithChildren) => {
  const [playerX,setPlayerX] = useState(0)
  const [playerY,setPlayerY] = useState(0)
  const [isWPressed,setIsWPressed] = useState(false)
  const [isSPressed,setIsSPressed] = useState(false)
  const [isAPressed,setIsAPressed] = useState(false)
  const [isDPressed,setIsDPressed] = useState(false)

  useEffect(() => {
    console.log(playerX, playerY)
  }, [playerX, playerY])

  useEffect(() => {
    console.log(`w: ${isWPressed}`)
    console.log(`s: ${isSPressed}`)
  }, [isWPressed, isSPressed])

  return (
    <Context.Provider value={{
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
      setIsDPressed
    }}>
      { children }
    </Context.Provider>
  );
};

export default Context;