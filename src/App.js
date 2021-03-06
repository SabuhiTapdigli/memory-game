import axios from 'axios'
import { useState, useEffect } from 'react';
import styled from 'styled-components'
import Cardlist from './components/Cardlist';
import Gamestart from './components/GameStart';
import Players from './components/Players';
import Winner from './components/Winner';


function App() {
  // Fecth data
  const [data,setdata] = useState([])
  const imgcount = 4
  useEffect(()=>{
    axios.get(`https://api.thecatapi.com/v1/images/search?limit=${imgcount}&page=10&order=Desc`)
    .then((res)=> setdata(res.data))
    .catch((err)=>console.log(err))
  }, [])
  
  const [cards,setcards] = useState([])
  const [firstcard, setfirstcard] = useState(null)
  const [secondcard, setsecondcard] = useState(null)
  const [count,setcount] = useState(0)
  const [playercount,setplayercount] = useState(0)
  const [playerlist,setplayerlist] = useState([])
  const [queue,setqueue] = useState(1)
  const [win,setwin] = useState(0)

  const playGame = () => {
      const alldata = [...data,...data]
      .sort(()=> 0.5-Math.random())
      .map((card)=>({...card, id: Math.random()}))
      setcards(alldata)
      setcount(0)
  }

  const selectCard = (card) => {
    if((firstcard !== card) && (!firstcard || !secondcard)){
      firstcard ? setsecondcard(card) : setfirstcard(card)
    }
  }

  const resultObj = () =>{
    setplayerlist([...Array(playercount).keys()].map((i)=>(
      {id:i+1,result:0,turns:0}
      )))
  }
  const addResult = () => {
    setwin(win+1)
    setplayerlist(playerlist.map((eachplayer)=>{
      if(eachplayer.id === queue){
        return{...eachplayer,result:eachplayer.result+1,turns:eachplayer.turns+1}
      }
      else{
        return{...eachplayer}
      }
    }))
  }

  const addTurns = () => {
    setplayerlist(playerlist.map((eachplayer)=>{
      if(eachplayer.id === queue){
        return{...eachplayer,turns:eachplayer.turns+1}
      }
      else{
        return{...eachplayer}
      }
    }))
    if(queue === playercount){
      setqueue(1)
    }
    else{
      setqueue(queue+1)
    }
  }

  const addTruechoice = () => {
    setcards(cards.map((i)=>{
      if(i.url === firstcard.url){
        return{...i,selected:true}
      }
      else{
        return{...i}
      }
    }))
    resetCard()
  }

  const resetCard = () => {
    setcount(count + 1)
    setTimeout(() => {
      setfirstcard(null)
      setsecondcard(null)
    }, 1000);
  }

  const restartGame = () => {
    resultObj()
    playGame()
    setqueue(1)
  }
  
  useEffect(()=>{
    playGame()
    resultObj()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playercount])

  
  useEffect(()=>{
    if(firstcard && secondcard){
      if(firstcard.url === secondcard.url){
        addResult()
        addTruechoice()
      }
      else{
        addTurns()
        resetCard()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstcard,secondcard])

  
    return (
    <Container>
        <Gamestart playgame = {playGame} restartGame = {restartGame} setplayercount={setplayercount} />
        <Playerwrapper>
            {playerlist.map((player)=>(
              <Players key = {player.id} player = {player} queue={queue}/>
            ))}
        </Playerwrapper>
        <Cardwrapper>
            {cards && cards.map((card)=>(
              <Cardlist 
                key={card.id}
                card={card}
                selectcard={selectCard} 
                flip = {card === firstcard || card === secondcard || card.selected}
                hideimg = {card.selected}/>
            ))}
         </Cardwrapper>
            {win === imgcount && <Winner playerlist={playerlist} setwin={setwin}/> }
    </Container>
  );
}

const Container = styled.div`
    text-align:center;
    width:1100px;
    margin:auto;
    position:relative;
`
const Playerwrapper = styled.div`
    display:flex;
    justify-content:center;
    div{
      margin-right:10px;
    }
`
const Cardwrapper = styled.div`
    margin:20px 0;
    display:grid;
    grid-template-columns: repeat(6,1fr);
    grid-gap:10px;
`



export default App;
