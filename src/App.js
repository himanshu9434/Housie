import React , {useState,useEffect}from 'react';
import randomColor from "randomcolor"
import './App.css';
import Button from "./Button"
function App() {

  const [number, setNumber] = useState()
  const [color, setcolor] = useState(randomColor(0.3, 0.99))
  const [list, setlist] = useState([])
  const [timeRemaining, setTimeRemaining] = useState(5)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [cheat,setCheat] = useState([])
 const [isCheatActive, setIsCheatActive] = useState(false)
 const [restartGame , setRestartGame] = useState(false)
 const [startTime , setStartTime] = useState(5)
 let compArray = [1,2,1,1,2]
  const handleTrick = (num)=>{
    setCheat(prev=>[...prev,num])
    if (JSON.stringify(cheat)===JSON.stringify(compArray)){
      setIsCheatActive(true)
    }
  }

  const handleColor=()=>{
    setcolor(randomColor(0.3, 0.99))
  }
  const numberChange = (number)=>{
    
    if (!(list.find(item=>item===number))){
      setNumber(number)
      setlist((prevList)=>[...prevList,number])}
  }
  const randomNumber=()=> 1+Math.floor(Math.random()*90)

  const randNumberChange=()=>{
    let randNumber = randomNumber()
    if (list.find(item=>item===randNumber)&&list.length<90)
      randNumberChange()
      else
    numberChange(randNumber)
    console.log(list.length)
  }

  function startTimer() {
    setIsTimeRunning(true)
    setTimeRemaining(startTime)
}


useEffect(() => {
  if (isTimeRunning&&timeRemaining>0){
    setTimeout(() => {
        setTimeRemaining(time=>time-1)
       }, 1000);}
       else if (isTimeRunning&& timeRemaining === 0){
        randNumberChange()
        setTimeRemaining(startTime)
       }
}, [timeRemaining,isTimeRunning])

useEffect(() => {
  if(list.length===89){
    setIsTimeRunning(false)
  }
}, [list])

function stopTimer() {
    setIsTimeRunning(false)
}

function clearList(){
  setIsTimeRunning(false)
  setlist([])
  setNumber("")
  setTimeRemaining(startTime)
  setCheat([])
  setIsCheatActive(false)
  setRestartGame(false)
}
  const buttons = []
  for(let i=1;i<=90;++i){
    if (list.find(item=>item===i)){
      buttons.push(<Button key = {i} value ={i} ischeat = {isCheatActive} numberChange= {numberChange} color = {color}/>)
    }
    else buttons.push(<Button key = {i} value ={i} ischeat = {isCheatActive} numberChange= {numberChange} color = {"white"}/>)}

  return (
    <React.Fragment>
      {list.length===90 && 
        <div className = "popup">
          <div className = "popup-box">
            <h1 className = "popup-title">Game Finished. Click to Restart</h1>
            <div className = "popup-button-box">
              <button className=  "popup-button"style={{backgroundColor:color, color:"black"}} onClick = {clearList}>RESET</button>
            </div>  
          </div>
        </div>
      }
      {restartGame && 
        <div className = "popup">
          <div className = "popup-box">
            <h1 className = "popup-title">Restart The Game!!!!</h1>
            <div className = "popup-button-box">
              <button className=  "popup-button"style={{backgroundColor:color, color:"black"}} onClick = {clearList}>Yes</button>
              <button className=  "popup-button"style={{backgroundColor:color, color:"black"}} onClick = {()=>setRestartGame(false)}>No</button>  
            </div> 
          </div>
        </div>
      }
      <div className = "flex-container" >
        <div className = "buttons-box">
          <button className="buttons-color" style={{backgroundColor:color, color:"black"}} onClick = {handleColor}>Change Color</button>
          <button className="buttons-restart" style={{backgroundColor:color, color:"black"}} onClick = {()=>setRestartGame(true)}>Restart Game</button>
          {(!isTimeRunning)? 
            <button className="buttons-timer" style={{backgroundColor:color, color:"black"}} onClick = {startTimer}>Start Timer</button>
          :
            <button className="buttons-timer" style={{backgroundColor:color, color:"black"}} onClick = {stopTimer}>Stop Timer</button>}
          </div>
        <div className="content" style={{border: `2px solid ${color}`}}>
          <div className = "titlebox" >
            <h1 className = "titleMain">Tambola</h1>
            <h1 className = "title">Number Generator</h1>
          </div>
          <div className="number-display" style={{color:"#505050"}}>
            <h3 className = "number-display-prev" onClick = {()=>handleTrick(1)}><span>Prev No.</span>{list[list.length-2]}</h3>
            {(number)
              ?
              (<button style={{color:color}}  onClick={randNumberChange} className= "number-display-main number-display-value">{number}</button>)
              :
              (<button style={{color:color}}  onClick={randNumberChange} className= "number-display-main number-display-novalue">Click to Start</button>)
            }
            <h3 className = "number-display-time" onClick = {()=>handleTrick(2)}><span>Time Rem.</span>{isTimeRunning && timeRemaining}</h3>
          </div>
          <div className = "numbers-box" >
              {buttons}
          </div>
          </div>
      </div>
    </React.Fragment>

  );
}
export default App;
