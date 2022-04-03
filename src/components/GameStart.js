import styled from 'styled-components'
import { useState } from 'react'
const Gamestart = ({playgame,setplayercount}) => {
    const [multiplayer, setmultiplayer] = useState(false)
    const playerhandler = (e) => {
        setplayercount(Number(e.target.value))
    }
    return(
        <>
            <Play onClick={playgame} className='player-btn'>Play Game</Play>
            <Single onClick={()=>setplayercount(1)} className='player-btn'>Single Player</Single>
            <Multi onClick={()=>setmultiplayer(true)} className='player-btn'>Multiple Players</Multi>
            <SelectPlayer className={multiplayer && 'select'}>
                <label htmlFor="player">Select player number:</label>
                <select name="players" id="players" onChange={playerhandler}>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </SelectPlayer>
        </>
    )
}
const Play = styled.button`
`
const Single = styled.div`
    border-radius: .75em;
    background-color: red;
    color:black;
    cursor: pointer;
    box-shadow:  0 .2em maroon;
`
const Multi = styled.div`
    border-radius: .75em;
    background-color: red;
    color:black;
    box-shadow:  0 .2em maroon;
	cursor: pointer;
`
const SelectPlayer = styled.div`
    display:none;
`
export default Gamestart