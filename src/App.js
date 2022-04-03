import axios from 'axios'
import { useState, useEffect } from 'react';
import styled from 'styled-components'
import Cardlist from './components/Cardlist';
import Gamestart from './components/GameStart';
import Players from './components/Players';


function App() {
  const [data,setdata] = useState([])

  useEffect(()=>{
    axios.get('https://api.thecatapi.com/v1/images/search?limit=12&page=10&order=Desc')
    .then((res)=> setdata(res.data))
    .catch((err)=>console.log(err))
  },[])
  
  const [cards,setcards] = useState([])
  const [firstcard, setfirstcard] = useState(null)
  const [secondcard, setsecondcard] = useState(null)
  const [count,setcount] = useState(0)
  const [playercount,setplayercount] = useState(0)
  const [playerlist,setplayerlist] = useState([])
  const [queue,setqueue] = useState(1)
  const [showbtn, setshowbtn] = useState(false)

  useEffect(()=>{
    setplayerlist([...Array(playercount).keys()].map((i)=>(
      {id:i+1,result:0}
      )))
  },[playercount])

  useEffect(()=>{
    if(firstcard && secondcard){
      if(firstcard.url === secondcard.url){
        setplayerlist(playerlist.map((eachplayer)=>{
          if(eachplayer.id === queue){
            return{...eachplayer,result:eachplayer.result+1}
          }
          else{
            return{...eachplayer}
          }
        }))
      }
      else{
        if(queue === playercount){
          setqueue(1)
        }
        else{
          setqueue(queue+1)
        }
        console.log('queue',queue)
        
      }
    }
    
  },[firstcard,secondcard])
 console.log(playerlist)

  const playgame = () => {
    if(playercount){
      const alldata = [...data,...data]
      .sort(()=> 0.5-Math.random())
      .map((card)=>({...card, id: Math.random()}))
      setcards(alldata)
      setcount(0)
    }
    setshowbtn(true)
  }

  const selectcard = (card) => {
    if((firstcard !== card) && (!firstcard || !secondcard)){
      firstcard ? setsecondcard(card) : setfirstcard(card)
    }
  }
  useEffect(()=>{
    if(firstcard && secondcard){
      if(firstcard.url === secondcard.url){
        setcards(cards.map((i)=>{
            if(i.url === firstcard.url){
              return{...i,selected:true}
            }
            else{
              return{...i}
            }
        }))
        reset()
      }
      else{
        reset()
      }
    }
  },[firstcard,secondcard])

  const reset = () => {
    setcount(count + 1)
    setTimeout(() => {
      setfirstcard(null)
      setsecondcard(null)
    }, 1000);
  }
    return (
    <Container>
      <Gamestart playgame = {playgame} setplayercount={setplayercount} />
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
                selectcard={selectcard} 
                flip = {card === firstcard || card === secondcard || card.selected}/>
            ))}
         </Cardwrapper>
         
    </Container>
  );
}

const Container = styled.div`
    text-align:center;
    width:1200px;
    margin:auto;
`
const Playerwrapper = styled.div`
    display:flex;
    justify-content:center;
    div{
      margin-right:10px;
    }
`
const Cardwrapper = styled.div`
    margin-top:20px;
    display:grid;
    grid-template-columns: repeat(6,1fr);
    grid-gap:20px;
`



export default App;
