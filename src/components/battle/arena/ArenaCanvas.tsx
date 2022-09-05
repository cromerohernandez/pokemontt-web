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
  const [moveImg, setMoveImg] = useState<CanvasImageSource>()
  const [moveFrameIndex, setMoveFrameIndex] = useState<number | null>(null)
  const [moveXAxisPosition, setMoveXAxisPosition] = useState<number | null>(null)
  const [moveDisplacementLength, setMoveDisplacementLength] = useState<number | null>(null)
  const [opacityChangeCounter, setOpacityChangeCounter] = useState<number | null>(null)

  /**
   * @description private function to set canvas container
   */
  const _setArenaContainer = useCallback((): void => {
    const arenaContainer = document.getElementById('battle-arena-container') as HTMLElement
    setCanvasContainer(arenaContainer)
  }, [])

  /**
   * @description useEffect function to set canvas container when component is mount
   */
  useEffect(() => {
    _setArenaContainer()
  })

  /**
   * @description useEffect function to set canvas and draw background and both pokemon when arena container is set
   */
  useEffect((): void => {
    _setCanvas()
    _draw()
  }, [canvasContainer])

  /**
   * @description useEffect function to change the pokemont opacity when it has lost the battle
   */
  useEffect((): void => {
    if (isBattleOver && loser) {
      _changePokemonOpacity(loser, 0.4)
    }
  }, [isBattleOver])

  /**
   * @description useEffect function to start and reset the movement of the move image
   */
  useEffect((): void => {
    if (ctx && pokemonStartsAttack !== undefined) {
      setMoveFrameIndex(0)
      _setstartXAxisPosition()
      _setDisplacementLength()
    }
  }, [pokemonStartsAttack])

  /**
   * @description useEffect function to manage movement of the move image
   */
  useEffect((): void => {
    if (ctx && moveFrameIndex !== null) {
      _clearCanvas()
      _draw()

      if (moveFrameIndex === 0) {
        _setMove()
      }
      
      if (moveFrameIndex < MOVE_FRAMES && moveXAxisPosition !== null && moveDisplacementLength !== null) {
        _drawMove()
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
        setOpacityChangeCounter(0)
      }
    }
  }, [moveFrameIndex])

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
  }, [opacityChangeCounter])

  /**
   * @description private function to draw background and pokemon on the canvas
   */
  const _draw = (): void => {
    _setBackground()
    _setOpponent()
    _setPlayer()
  }

  /**
   * @description private function to set canvas context
   */
  const _setCanvas = (): void => {
    const canvas = document.getElementById('arena-canvas') as HTMLCanvasElement

    if (canvasContainer) {
      canvas.height = canvasContainer.offsetHeight * 0.85
      canvas.width = canvasContainer?.offsetWidth * 0.98
    }

    const canvasCtx = canvas?.getContext('2d')

    setCtx(canvasCtx)
  }
  
  /**
   * @description private function to clear canvas
   */
  const _clearCanvas = (): void => {
    ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  /**
   * @description private function to set background image
   */
  const _setBackground = (): void => {
    var img = new Image()
    img.src = arenaBackground

    setBackgroundImg(img)
    _drawBackground()
  }

  /**
   * @description private function to draw background on the canvas
   */
  const _drawBackground = (): void => {
    if (backgroundImg) {
      ctx?.drawImage(
        backgroundImg,
        0,
        ctx.canvas.height / 2,
        ctx.canvas.width,
        ctx.canvas.height / 2,
      )
    }
  }

  /**
   * @description private function to set opponent pokemon image
   */
  const _setOpponent = (): void => {
    var img = new Image()
    img.src = opponentPokemon?.image ?? ''

    setOpponentImg(img)
    _drawOpponent()
  }

  /**
   * @description private function to draw opponent pokemon on the canvas
   */
  const _drawOpponent = (): void => {
    if (ctx && opponentImg) {
      ctx.drawImage(
        opponentImg,
        ctx.canvas.width * 0.08,
        _getPokemonVerticalPosition(ctx.canvas.height / 4, ctx.canvas.height / 2),
        _getPokemonSize(ctx.canvas.height / 2),
        _getPokemonSize(ctx.canvas.height / 2),
      )
    }
  }

  /**
   * @description private function to set player pokemon image
   */
  const _setPlayer = (): void => {
    var img = new Image()
    img.src = playerPokemon?.image ?? ''

    setPlayerImg(img)
    _drawPlayer()
  }

  /**
   * @description private function to draw player pokemon on the canvas
   */
  const _drawPlayer = (): void => {
    if (playerImg) {
      ctx?.drawImage(
        playerImg,
        _getPokemonHorizontalPosition(ctx.canvas.width * 0.92 - ctx.canvas.height / 2, ctx.canvas.height / 2),
        _getPokemonVerticalPosition(ctx.canvas.height / 4, ctx.canvas.height / 2),
        _getPokemonSize(ctx.canvas.height / 2),
        _getPokemonSize(ctx.canvas.height / 2),
      )
    }
  }

  /**
   * @description private function to set move image
   */
   const _setMove = (): void => {
    const moveType = 'water' //TODO CRH: dev
    
    var img = new Image()
    img.src = MOVE_SPRITES[moveType] ?? MOVE_SPRITES[DEFAULT_MOVE_TYPE]

    setMoveImg(img)
    _drawMove()
  }

  /**
   * @description private function to draw move on the canvas
   */
  const _drawMove = (): void => {
    if (moveImg && moveFrameIndex !== null && moveXAxisPosition !== null) {
      ctx?.drawImage(
        moveImg,
        moveFrameIndex * (moveImg.width as number) / MOVE_FRAMES,
        0,
        (moveImg.width as number) / MOVE_FRAMES,
        moveImg.height as number,
        moveXAxisPosition,
        ctx.canvas.height - (_getPokemonSize(ctx.canvas.height / 2) * 1.05),
        _getPokemonSize(ctx.canvas.height / 2) / 2.5,
        _getPokemonSize(ctx.canvas.height / 2) / 2.5,
      )
    }
  }

  /**
   * @description private function to calculate the vertical position of the pokemon according to its maximum and minimum size 
   * @param defaultPosition number
   * @param defaultHeight number
   * @returns number
   */
  const _getPokemonVerticalPosition = (defaultPosition: number, defaultHeight: number): number => {
    const height = _getPokemonSize(defaultHeight)

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
   * @param defaultWidth number
   * @returns number
   */
  const _getPokemonHorizontalPosition = (defaultPosition: number, defaultWidth: number): number => {
    const width = _getPokemonSize(defaultWidth)

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
   */
  const _setDisplacementLength = (): void => {
    if (ctx) {
      const moveDisplacementLength: number = ctx.canvas.width - (ctx.canvas.width * 2 * 0.08) - (_getPokemonSize(ctx.canvas.height / 2) * 1.5)
      setMoveDisplacementLength(moveDisplacementLength);
    }
  }

  /**
   * @description private function to set the initial position of the X axis for the move image
   */
  const _setstartXAxisPosition = (): void => {
    if (ctx) {
      let startXAxisPosition: number

      if (pokemonStartsAttack === OwnerTypes.OPPONENT) {
        startXAxisPosition = (ctx.canvas.width * 0.08) + (_getPokemonSize(ctx.canvas.height / 2) * 0.75)
        setMoveXAxisPosition(startXAxisPosition)
      }

      if (pokemonStartsAttack === OwnerTypes.PLAYER) {
        startXAxisPosition = _getPokemonHorizontalPosition(ctx.canvas.width * 0.92 - ctx.canvas.height / 2, ctx.canvas.height / 2)
        setMoveXAxisPosition(startXAxisPosition)
      }
    }
  }

  /**
   * @description private function to change pokemon opacity
   * @param pokemonToChange OwnerTypes
   * @param newOpacity number
   */
  const _changePokemonOpacity = (pokemonToChange: OwnerTypes, newOpacity: number): void => {
    if (ctx) {
      console.log('CRH-entraChangeOpacity')
      _clearCanvas()
      _drawBackground()
      ctx.globalAlpha = newOpacity;

      if (pokemonToChange === OwnerTypes.OPPONENT) {
        _drawOpponent()
        ctx.globalAlpha = 1;
        _drawPlayer()
      } else {
        _drawPlayer()
        ctx.globalAlpha = 1;
        _drawOpponent()
      }
    }
  }

  return (
    <canvas id='arena-canvas'/>
  )
}

export default ArenaCanvas;
