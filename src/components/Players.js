import styled from 'styled-components'

const Players = ({player,queue}) => {
    return(
        
        <ResultTable className={queue === player.id ? 'active' : null}>
            <h1>Player {player.id} </h1>
            <p>Pairs found {player.result}</p>
            <p>Turns {player.turns}</p>
        </ResultTable>
    )
}
const ResultTable = styled.div`
    padding: 20px;
    border-radius: 5px;
    p{
        margin-top:10px;
    }
`
export default Players