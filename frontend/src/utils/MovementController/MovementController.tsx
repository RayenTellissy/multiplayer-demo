import React, { useContext, useEffect } from 'react';

// components
import Context from '../../components/Context/Context';

const MovementController = () => {
  const {
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
  } = useContext(Context)

  // setting up event listeners for movement
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  useEffect(() => {
    const movementLoop = setInterval(() => {
      var localPlayerX: number = playerX
      var localPlayerY: number = playerY
      const velocity: number = 8

      if(isWPressed) {
        localPlayerY -= velocity
      }
      if(isSPressed) {
        localPlayerY += velocity
      }
      if(isAPressed) {
        localPlayerX -= velocity
      }
      if(isDPressed) {
        localPlayerX += velocity
      }
      
      if(playerX !== localPlayerX || playerY !== localPlayerY) {
        setPlayerX(localPlayerX)
        setPlayerY(localPlayerY)
      }
    }, 16)

    return () => clearInterval(movementLoop)
  }, [playerX, playerY, isWPressed, isSPressed, isAPressed, isDPressed])

  // key down handler
  const handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key.toUpperCase()
    if(key === "W" || key === "Z") {
      setIsWPressed(true)
    }
    if(key === "S"){
      setIsSPressed(true)
    }
    if(key === "A") {
      setIsAPressed(true)
    }
    if(key === "D") {
      setIsDPressed(true)
    }
  }

  // key up handler
  const handleKeyUp = (e: KeyboardEvent) => {
    const key = e.key.toUpperCase()
    if(key === "W" || key === "Z") {
      setIsWPressed(false)
    }
    if(key === "S") {
      setIsSPressed(false)
    }
    if(key === "A") {
      setIsAPressed(false)
    }
    if(key === "D") {
      setIsDPressed(false)
    }
  }

  return <></>
};

export default MovementController;