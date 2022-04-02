import styled from 'styled-components'
import {useState} from 'react'

const Cardlist = ({card,selectcard,flip}) => {
    // console.log('card',card)

    const imghandler = () => {
        selectcard(card)
    }
    return(
        <Card>
            <SingleCard>
                <Front className={flip ? 'show' : 'hide'}><img src={card.src} onClick={imghandler} alt='img'/></Front>
                <Back onClick={imghandler}></Back>
            </SingleCard>
        </Card>
    )
}

const Card = styled.div`
    position:relative;
`
const SingleCard = styled.div`
    
    div{
      width:167px;
      height:167px;
    }
`
const Front = styled.div`
    position:absolute;
    // transform:${({ flipp }) => (flipp ? "rotateY(0deg)" : "rotateY(90deg)")};
    transition: all ease-in 0.2s;
    transition-delay:0.2s;
    img{
      width:100%;
      height:100%;
      object-fit:cover;
    }
`
const Back = styled.div`
    // transform:rotate(90deg);
    background-color:gray;
    transition-delay:0s;
`

export default Cardlist