import { FunctionComponent, useContext, useCallback, useEffect, useState } from 'react';

import BattleContext from '../../../contexts/BattleContext';

import { OwnerTypes } from '../../../utils/const/battle.const';
import {
  DEFAULT_MOVE_TYPE,
  MOVE_FRAMES,
  MOVE_FRAMES_WITH_DISPLACEMENT,
  MOVE_FRAME_TIME,
  NUMBER_OF_OPACITY_CHANGES,
  OPACITY_CHANGE_TIME
} from '../../../utils/const/move.const';

import arenaBackground from '../../../assets/img/arena-background.png';
import { MOVE_SPRITES } from '../../../assets/img/move-sprites';

const ArenaCanvas: FunctionComponent = () => {
  const { isBattleOver, pokemonStartsAttack, playerPokemon, opponentPokemon, loser } = useContext(BattleContext)
  const [canvasContainer, setCanvasContainer] = useState<HTMLElement>()
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [backgroundImg, setBackgroundImg] = useState<CanvasImageSource>()
  const [opponentImg, setOpponentImg] = useState<CanvasImageSource>()
  const [playerImg, setPlayerImg] = useState<CanvasImageSource>()
  const [currentMoveType, setCurrentMoveType] = useState<string | null>(null)
  const [moveImg, setMoveImg] = useState<CanvasImageSource>()
  const [moveFrameIndex, setMoveFrameIndex] = useState<number | null>(null)
  const [moveXAxisPosition, setMoveXAxisPosition] = useState<number | null>(null)
  const [moveDisplacementLength, setMoveDisplacementLength] = useState<number | null>(null)
  const [opacityChangeCounter, setOpacityChangeCounter] = useState<number | null>(null)

  //SET CANVAS CONTAINER
  /**
   * @description useEffect function to set canvas container when component is mount
   */
   useEffect((): void => {
    const arenaContainer = document.getElementById('battle-arena-container') as HTMLElement
    setCanvasContainer(arenaContainer)
  }, [])

  //SET CANVAS ITEMS
  /**
   * @description useEffect function to set canvas context when canvas container is set
   */
  useEffect((): void => {
    if (canvasContainer) {
      const canvas = document.getElementById('arena-canvas') as HTMLCanvasElement

      canvas.height = canvasContainer.offsetHeight * 0.85
      canvas.width = canvasContainer?.offsetWidth * 0.98

      const canvasCtx = canvas?.getContext('2d')

      setCtx(canvasCtx)
    }
  }, [canvasContainer])

  /**
   * @description useEffect function to set background image when canvas container is set
   */
  useEffect((): void => {
    if (canvasContainer) {
      var img = new Image()
      img.src = arenaBackground
      setBackgroundImg(img)
    }
  }, [canvasContainer])

  /**
   * @description useEffect function to set opponent pokemon image when canvas container is set
   */
  useEffect((): void => {
    if (canvasContainer) {
      var img = new Image()
      img.src = opponentPokemon?.image ?? ''
      setOpponentImg(img)
    }
  }, [canvasContainer, opponentPokemon])

  /**
   * @description useEffect function to set player pokemon image when canvas container is set
   */
  useEffect((): void => {
    if (canvasContainer) {
      var img = new Image()
      img.src = playerPokemon?.image ?? ''
      setPlayerImg(img)
    }
  }, [canvasContainer, playerPokemon])

  //DRAW CANVAS ITEMS
  /**
   * @description useCallback function to draw background on the canvas
   * @param backgroundImgToDraw CanvasImageSource | undefined
   */
  const _drawBackground = useCallback((backgroundImgToDraw: CanvasImageSource | undefined): void => {
    if (backgroundImgToDraw) {
      ctx?.drawImage(
        backgroundImgToDraw,
        0,
        ctx.canvas.height / 2,
        ctx.canvas.width,
        ctx.canvas.height / 2,
      )
    }
  }, [ctx])
  
  /**
   * @description useCallback function to draw opponent pokemon on the canvas
   * @param opponentImgToDraw CanvasImageSource | undefined
   */
  const _drawOpponent = useCallback((opponentImgToDraw: CanvasImageSource | undefined): void => {
    if (opponentImgToDraw) {
      ctx?.drawImage(
        opponentImgToDraw,
        ctx.canvas.width * 0.08,
        _getPokemonVerticalPosition(ctx.canvas.height / 4, _getPokemonSize(ctx.canvas.height / 2), ctx.canvas.height / 2),
        _getPokemonSize(ctx.canvas.height / 2),
        _getPokemonSize(ctx.canvas.height / 2),
      )
    }
  }, [ctx])
  
  /**
   * @description useCallback function to draw player pokemon on the canvas
   * @param playerImgToDraw CanvasImageSource | undefined
   */
  const _drawPlayer = useCallback((playerImgToDraw: CanvasImageSource | undefined): void => {
    if (playerImgToDraw) {
      ctx?.drawImage(
        playerImgToDraw,
        _getPokemonHorizontalPosition(ctx.canvas.width * 0.92 - ctx.canvas.height / 2, _getPokemonSize(ctx.canvas.height / 2), ctx.canvas.height / 2),
        _getPokemonVerticalPosition(ctx.canvas.height / 4, _getPokemonSize(ctx.canvas.height / 2), ctx.canvas.height / 2),
        _getPokemonSize(ctx.canvas.height / 2),
        _getPokemonSize(ctx.canvas.height / 2),
      )
    }
  }, [ctx])

  /**
   * @description useEffect function to draw canvas items when background and pokemon are set
   */
  useEffect((): void => {
    if (backgroundImg && playerImg && opponentImg && !isBattleOver) {
      setTimeout(() => {
        _drawBackground(backgroundImg)
        _drawOpponent(opponentImg)
        _drawPlayer(playerImg)
      }, 250)
    }
  }, [backgroundImg, playerImg, opponentImg, isBattleOver, _drawBackground, _drawOpponent, _drawPlayer])

  //CLEAR CANVAS
  /**
   * @description useCallback function to clear canvas
   */
  const _clearCanvas = useCallback((): void => {
    ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }, [ctx])

  //MOVE (SET, DRAW & MOVEMENT)
  /**
   * @description useEffect function to set move image when canvas container is set or currentMoveType changes
   */
  useEffect((): void => {
    if (canvasContainer) {
      var img = new Image()
      img.src = MOVE_SPRITES[currentMoveType ?? DEFAULT_MOVE_TYPE]
      setMoveImg(img)
    }
  }, [canvasContainer, currentMoveType])
  
  /**
   * @description private function to draw move on the canvas
   * @param moveImgToDraw CanvasImageSource | undefined
   */
  const _drawMove = useCallback((moveImgToDraw: CanvasImageSource | undefined): void => {
    if (moveImgToDraw && moveFrameIndex !== null && moveXAxisPosition !== null) {
      ctx?.drawImage(
        moveImgToDraw,
        moveFrameIndex * (moveImgToDraw.width as number) / MOVE_FRAMES,
        0,
        (moveImgToDraw.width as number) / MOVE_FRAMES,
        moveImgToDraw.height as number,
        moveXAxisPosition,
        ctx.canvas.height - (_getPokemonSize(ctx.canvas.height / 2) * 1.05),
        _getPokemonSize(ctx.canvas.height / 2) / 2.5,
        _getPokemonSize(ctx.canvas.height / 2) / 2.5,
      )
    }
  }, [ctx, moveFrameIndex, moveXAxisPosition])

  /**
   * @description useEffect function to start and reset the movement of the move image
   */
  useEffect((): void => {
    if (ctx && pokemonStartsAttack !== undefined) {
      const pokemonWidth = _getPokemonSize(ctx.canvas.height / 2)
      const pokemonHorizontalPosition = _getPokemonHorizontalPosition(ctx.canvas.width * 0.92 - ctx.canvas.height / 2, pokemonWidth, ctx.canvas.height / 2)

      setMoveFrameIndex(0)
      _setstartXAxisPosition(pokemonStartsAttack, ctx, pokemonWidth, pokemonHorizontalPosition)
      _setDisplacementLength(ctx, pokemonWidth)
    }
  }, [ctx, pokemonStartsAttack])

  /**
   * @description useEffect function to manage movement of the move image
   */
  useEffect((): void => {
    if (ctx && moveFrameIndex !== null) {
      _clearCanvas()
      _drawBackground(backgroundImg)
      _drawOpponent(opponentImg)
      _drawPlayer(playerImg)

      if (moveFrameIndex === 0) {
        setCurrentMoveType('fire')
      }
      
      if (moveFrameIndex < MOVE_FRAMES && moveXAxisPosition !== null && moveDisplacementLength !== null) {
        _drawMove(moveImg)
        setTimeout(() => {
          setMoveFrameIndex(moveFrameIndex + 1)
          if(moveFrameIndex < MOVE_FRAMES_WITH_DISPLACEMENT && pokemonStartsAttack === OwnerTypes.OPPONENT) {
            setMoveXAxisPosition(moveXAxisPosition + (moveDisplacementLength / MOVE_FRAMES_WITH_DISPLACEMENT))
          }
          if(moveFrameIndex < MOVE_FRAMES_WITH_DISPLACEMENT && pokemonStartsAttack === OwnerTypes.PLAYER) {
            setMoveXAxisPosition(moveXAxisPosition - (moveDisplacementLength / MOVE_FRAMES_WITH_DISPLACEMENT))
          }
        }, MOVE_FRAME_TIME)
      }

      if (moveFrameIndex === MOVE_FRAMES) {
        setMoveFrameIndex(null)
        setOpacityChangeCounter(0)
      }
    }
  }, [
    ctx,
    moveFrameIndex,
    backgroundImg,
    opponentImg,
    playerImg,
    moveXAxisPosition,
    moveDisplacementLength,
    moveImg,
    pokemonStartsAttack,
     _clearCanvas,
     _drawBackground,
     _drawOpponent,
     _drawPlayer,
     _drawMove,
  ])

  //POKEMON OPACITY
  /**
   * @description useCallback function to change pokemon opacity
   * @param pokemonToChange OwnerTypes
   * @param newOpacity number
   */
   const _changePokemonOpacity = useCallback((pokemonToChange: OwnerTypes, newOpacity: number): void => {
    if (ctx) {
      _clearCanvas()
      _drawBackground(backgroundImg)
      ctx.globalAlpha = newOpacity;
      if (pokemonToChange === OwnerTypes.OPPONENT) {
        _drawOpponent(opponentImg)
        ctx.globalAlpha = 1;
        _drawPlayer(playerImg)
      } else {
        _drawPlayer(playerImg)
        ctx.globalAlpha = 1;
        _drawOpponent(opponentImg)
      }
    }
  }, [ctx, backgroundImg, opponentImg, playerImg, _clearCanvas, _drawBackground, _drawOpponent, _drawPlayer])

  /**
   * @description useEffect function to change the pokemont opacity when it has lost the battle
   */
  useEffect((): void => {
    if (isBattleOver && loser) {
      _changePokemonOpacity(loser, 0.4)
    }
  }, [isBattleOver, loser, _changePokemonOpacity])

  /**
   * @description useEffect function to change the pokemont opacity when it has been attacked
   */
  useEffect((): void => {
    if (pokemonStartsAttack && opacityChangeCounter !== null) {
      const pokemonToChange = pokemonStartsAttack === OwnerTypes.PLAYER ? OwnerTypes.OPPONENT : OwnerTypes.PLAYER
      const newOpacityValue =  opacityChangeCounter % 2 === 0 ? 1 : 0.6
      _changePokemonOpacity(pokemonToChange, newOpacityValue)
      if (opacityChangeCounter < NUMBER_OF_OPACITY_CHANGES) {
        setTimeout(() => {
          setOpacityChangeCounter(opacityChangeCounter + 1)
        }, OPACITY_CHANGE_TIME)
      } else {
        setOpacityChangeCounter(null)
      }
    }
  }, [pokemonStartsAttack, opacityChangeCounter, _changePokemonOpacity])

  //SIZES & POSITIONS
  /**
   * @description private function to calculate the vertical position of the pokemon according to its maximum and minimum size 
   * @param defaultPosition number
   * @param height number
   * @param defaultHeight number
   * @returns number
   */
  const _getPokemonVerticalPosition = (defaultPosition: number, height: number, defaultHeight: number): number => {
    if (height > defaultHeight) {
      return defaultPosition - (height - defaultHeight)
    }
    if (height < defaultHeight) {
      return defaultPosition + (defaultHeight - height)
    }
    return defaultPosition
  }

  /**
   * @description private function to calculate the horizontal position of the pokemon according to its maximum and minimum size 
   * @param defaultPosition number
   * @param width number
   * @param defaultWidth number
   * @returns number
   */
  const _getPokemonHorizontalPosition = (defaultPosition: number, width: number, defaultWidth: number): number => {
    if (width > defaultWidth) {
      return defaultPosition - (width - defaultWidth)
    }
    if (width < defaultWidth) {
      return defaultPosition + (defaultWidth - width)
    }
    return defaultPosition
  }

  /**
   * @description private function to calculate pokemon size according to its maximum and minimum size
   * @param size number
   * @returns number
   */
  const _getPokemonSize = (size: number): number => {
    const maxSize = 248 //15.5rem
    const minSize = 184 //11.5rem
    if (size > maxSize) {
      return maxSize
    }
    if (size < minSize) {
      return minSize
    }
    return size
  }

  /**
   * @description private function to set move displacement length between both pokemon
   * @param ctx CanvasRenderingContext2D
   * @param pokemonWidth number
   */
  const _setDisplacementLength = (ctx: CanvasRenderingContext2D, pokemonWidth: number): void => {
    const moveDisplacementLength: number = ctx.canvas.width - (ctx.canvas.width * 2 * 0.08) - (pokemonWidth * 1.5)
    setMoveDisplacementLength(moveDisplacementLength);
  }

  /**
   * @description private function to set the initial position of the X axis for the move image
   * @param pokemontOwner OwnerTypes
   * @param ctx CanvasRenderingContext2D
   * @param pokemonWidth number
   * @param pokemonHorizontalPosition number
   */
  const _setstartXAxisPosition = ( pokemontOwner: OwnerTypes, ctx: CanvasRenderingContext2D, pokemonWidth: number, pokemonHorizontalPosition: number): void => {
    let startXAxisPosition: number
    if (pokemontOwner === OwnerTypes.OPPONENT) {
      startXAxisPosition = (ctx.canvas.width * 0.08) + (pokemonWidth * 0.75)
      setMoveXAxisPosition(startXAxisPosition)
    }
    if (pokemontOwner === OwnerTypes.PLAYER) {
      startXAxisPosition = pokemonHorizontalPosition
      setMoveXAxisPosition(startXAxisPosition)
    }
  }

  return (
    <canvas id='arena-canvas'/>
  )
}

export default ArenaCanvas;
