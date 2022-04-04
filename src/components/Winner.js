import styled from "styled-components"

const Winner = ({setwin,playerlist}) =>{


    const winner = playerlist.reduce((prev,next) => {
        if(prev.result > next.result){
            return  prev  
    }   
        else if(prev.result < next.result){
            return  next
    }
        else{
            if(prev.turns > next.turns){
                return {...next,id:'draw'}
            }
            else{
                return {...prev,id:'draw'}
            }
        }
    })
    return(
        <Winnerwrapper>
            {winner.id === 'draw' ? <h1>The game is draw</h1> : <h1>The winner is Player {winner.id}</h1>}
            <p> Pairs found {winner.result} </p>
            <p> Winner Turn Score is {winner.turns}</p>
            <button onClick={()=>setwin(0)}>Close</button>
        </Winnerwrapper>
    )
}
const Winnerwrapper = styled.div`
    width:50%;
    padding:10% 50px;
    background-color:black;
    color:white;
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    h1{
        padding:10px;
    }
    p{
        padding:10px;
    }
    button{
        padding:10px;
        cursor:pointer;
    }
`
export default Winner