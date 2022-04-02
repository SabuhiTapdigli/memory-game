import axios from 'axios'
import { useState, useEffect } from 'react';
import styled from 'styled-components'
import Cardlist from './components/Cardlist';


function App() {
  const [data,setdata] = useState([])
  // {"src":"/img/cat1.jpeg"},
  // {"src":"/img/cat2.jpeg"},
  // {"src":"/img/cat3.jpeg"},
  // {"src":"/img/cat4.jpeg"},
  // {"src":"/img/cat5.gif"},
  // {"src":"/img/cat6.jpeg"},
  // {"src":"/img/cat7.jpeg"},
  // {"src":"/img/cat8.jpeg"},
  // {"src":"/img/cat9.jpeg"},
  // {"src":"/img/cat10.jpeg"},
  // {"src":"/img/cat11.jpeg"},
  // {"src":"/img/cat12.jpeg"},

  // for(let i =0;i<12;i++){
  //   axios.get('https://api.thecatapi.com/v1/images/search').then((res)=>setdata([...data,res]))
  // }
    let url1 = axios.get('https://api.thecatapi.com/v1/images/search');
    let url2 = axios.get('https://api.thecatapi.com/v1/images/search');
    let url3 = axios.get('https://api.thecatapi.com/v1/images/search');
    let url4 = axios.get('https://api.thecatapi.com/v1/images/search');
    let url5 = axios.get('https://api.thecatapi.com/v1/images/search');
    let url6 = axios.get('https://api.thecatapi.com/v1/images/search');
    let url7 = axios.get('https://api.thecatapi.com/v1/images/search');
    let url8 = axios.get('https://api.thecatapi.com/v1/images/search');
    let url9 = axios.get('https://api.thecatapi.com/v1/images/search');
    let url10 = axios.get('https://api.thecatapi.com/v1/images/search');
    let url11 = axios.get('https://api.thecatapi.com/v1/images/search');
    let url12 = axios.get('https://api.thecatapi.com/v1/images/search');
  useEffect(()=>{
    axios.all([url1, url2,url3,url4,url5,url6,url7,url8,url9,url10,url11,url12]).then((res) => {
    setdata([
        {
            src: res[0].data[0].url,
        },
        {
            src: res[1].data[0].url,
        },
        {
          src: res[2].data[0].url,
        },
        {
          src: res[3].data[0].url,
        },
        {
          src: res[4].data[0].url,
        },
        {
          src: res[5].data[0].url,
        },
        {
          src: res[6].data[0].url,
        },
        {
          src: res[7].data[0].url,
        },
        {
          src: res[8].data[0].url,
        },
        {
          src: res[9].data[0].url,
        },
        {
          src: res[10].data[0].url,
        },
        {
          src: res[11].data[0].url,
        }
      ]);
    })
  },[])
  const [cards,setcards] = useState([])
  const [firstcard, setfirstcard] = useState(null)
  const [secondcard, setsecondcard] = useState(null)
  const [count,setcount] = useState(0)
  

  const playgame = () => {
    const alldata = [...data,...data]
    .sort(()=> 0.5-Math.random())
    .map((card)=>({...card, id: Math.random()}))
    setcards(alldata)
    setcount(0)
  }

  const selectcard = (card) => {
    if((firstcard !== card) && (!firstcard || !secondcard)){
      firstcard ? setsecondcard(card) : setfirstcard(card)
    }
  }
  useEffect(()=>{
    console.log('firstcard',firstcard)
    console.log('secondcard',secondcard)
    if(firstcard && secondcard){
      if(firstcard.src === secondcard.src){
        setcards(cards.map((i)=>{
            if(i.src === firstcard.src){
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
      <Play onClick={playgame}>Play Game</Play>
      <h2>{count}</h2>
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
const Play = styled.button`
`
const Cardwrapper = styled.div`
    margin-top:20px;
    display:grid;
    grid-template-columns: repeat(6,1fr);
    grid-gap:20px;
`



export default App;
