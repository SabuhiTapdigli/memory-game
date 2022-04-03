import styled from "styled-components"

const Winner = ({setwin,playerlist}) =>{
    // const winner = playerlist.find((player)=> palyer)
    // console.log(winner)
    return(
        <Winnerwrapper>
            <h1>The winner is Player 1</h1>
            <p> Pairs found 0 </p>
            <p> The Best Turn Score is </p>
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
`
export default Winner