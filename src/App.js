import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'

function App() {
  const [score, setscore] = useState(0)
  const [mistakes, setmistakes] = useState(0)
  const [currentProblem, setCurrentProblem] = useState(generateProblem())
  const [inputValue, setInputValue] = useState('')
  const [showError, setShowError] = useState(false)

  const inputRef = useRef()
  const btnRef = useRef(null)

  useEffect(() => {
    if(score === 10 || mistakes === 3)
      btnRef.current.focus()
  }, [mistakes, score])

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  function generateNum(num){
    return Math.floor(Math.random() * num + 1)
  }

  function generateProblem(){
      return {
          numberOne: generateNum(10),
          numberTwo: generateNum(10),
          operator: ['-', '+', 'x'][generateNum(2)]
      }
  }

  function handleSubmit(e){
    e.preventDefault()
    let correctAnswer

    if(currentProblem.operator == '+') correctAnswer = currentProblem.numberOne + currentProblem.numberTwo
    if(currentProblem.operator == '-') correctAnswer = currentProblem.numberOne - currentProblem.numberTwo
    if(currentProblem.operator == 'x') correctAnswer = currentProblem.numberOne * currentProblem.numberTwo

    if(parseInt(inputValue) === correctAnswer){
      setscore(prev => prev + 1)
      setCurrentProblem(generateProblem())
      setInputValue('')
      inputRef.current.focus()
    }
    else{
      setmistakes(prev => prev + 1)
      setInputValue('')
      inputRef.current.focus()
      setShowError(true)
      setTimeout(() => setShowError(false), 460)
    }
  }

  function resetGame(){
    setmistakes(0)
    setscore(0)
    setInputValue('')
    setCurrentProblem(generateProblem())
  }

  return (
    <>
      
    <div className={ ( mistakes === 3 || score === 10 ? 'is-overlay-open ' : '' ) + " main-ui " }>
        <h1 className={"problem " + (showError && 'animate-text-wrong')}>{currentProblem.numberOne } {currentProblem.operator} { currentProblem.numberTwo} </h1>
        <form className="our-form" onSubmit={handleSubmit}>
            <input type="text" ref={inputRef} autoComplete="off" className="our-field" value={inputValue} onChange={e => setInputValue(e.target.value)} />
            <button>Submit</button>

        </form>
        <p>You need <span className="points-needed">{10 - score} </span> more points & can make <span className="mistakes">{2 - mistakes} </span> mistakes.</p>

        <ProgressBar score={score}/>

    </div>

    <div className={ ( mistakes === 3 || score === 10 ? 'is-overlay-open ' : '' ) + " overlay" }>
        <div className="overlay-inner"></div>
        <p className="msg-overlay">{score === 10 ? 'Congrats You won' : 'Sorry you lost'} </p>
        <button onClick={resetGame} className="overlay-btn" ref={btnRef}>Start over</button>
    </div>
    </>
  )
}

function ProgressBar(props){
  return(
    <div className="progress">
      <div className="boxes">
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
      </div>
      <div className="progress-inner" style={{ transform: `scaleX(${props.score/10})` }}></div>
  </div>
  )
}

export default App