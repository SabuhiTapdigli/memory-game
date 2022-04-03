import styled from 'styled-components'
import {useState} from 'react'
import craft from '../img/logo.png'

const Cardlist = ({card,selectcard,flip}) => {

    const imghandler = () => {
        selectcard(card)
    }
    return(
        <FlipCard>
            <FlipCardInner className={flip && 'show'}>
                <FlipCardFront onClick={imghandler} >
                    <img src={card.url} alt='img'/>
                </FlipCardFront>
                <FlipCardBack onClick={imghandler}>
                    <img src={craft} alt='logo'/>
                </FlipCardBack>
            </FlipCardInner>
        </FlipCard>
    )
}

const FlipCard = styled.div`
    // background-color: transparent;
    width: 167px;
    height: 167px;
    perspective: 1000px;
`
const FlipCardInner = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    div{
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;

    }
    img{
        width:100%;
        height:100%;
      }
`
const FlipCardFront = styled.div`
    transform: rotateY(180deg);
    img{
        object-fit:cover;
    }
   
`
const FlipCardBack = styled.div`
    img{
        object-fit:contain;
    }
    
    
`

export default Cardlist