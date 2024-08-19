import { Card } from "../App"
import cover from '../assets/img/cover.webp'
import "../assets/styles/singelCard.scss"

type CardProp = {
    cards: Card[]
    handelChoice: (card: Card) => void
}

const Cards: React.FC<CardProp> = ({ cards, handelChoice }) => {

    const handelClick = (card: Card) => {
        handelChoice(card);
    }

    return (
        <div className='card-grid'>
            {cards.map(card => (
                <div className='card' key={card.id}>
                    <div className={`${card.flipped || card.matched ? 'flipped' : ''}`}>
                        <img className='front' src={card.src} alt='card front' />
                        <img
                            className='back'
                            src={cover}
                            onClick={() => handelClick(card)}
                            alt='card back'
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Cards
