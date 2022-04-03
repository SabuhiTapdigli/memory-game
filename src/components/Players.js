import styled from 'styled-components'
import { useState } from 'react'

const Players = ({player,queue}) => {
    return(
        
        <div className={queue === player.id ? 'active' : null}>
            <h1>Player {player.id} </h1>
            <p>Pairs found {player.result}</p>
        </div>
    )
}

export default Players