import '../assets/styles/app.scss'
import helmet from '../assets/img/helmet.webp'
import potion from '../assets/img/potion1.webp'
import ring from '../assets/img/ring.webp'
import book from '../assets/img/book.webp'
import shield from '../assets/img/shield.webp'
import sword from '../assets/img/sword.webp'
import { useEffect, useState } from 'react'
import Cards from '../components/Cards'

export type Card = {
    id: number,
    src: string,
    matched: boolean,
    flipped: boolean
}

const cardImages = [
    { "src": helmet, matched: false },
    { "src": potion, matched: false },
    { "src": ring, matched: false },
    { "src": book, matched: false },
    { "src": shield, matched: false },
    { "src": sword, matched: false }
]

function GamePage() {
    const [cards, setCards] = useState<Card[]>([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState<Card | null>(null)
    const [choiceTwo, setChoiceTwo] = useState<Card | null>(null)

    //Shuffle cards
    const suffleCards = () => {
        const suffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, flipped: false, matched: false, id: Math.random() }))

        setCards(suffledCards)
        setTurns(0)
        setChoiceOne(null)
        setChoiceTwo(null)
    }

    //Handel a choice
    const handelChoice = (card: Card) => {
        if (choiceOne && choiceTwo) return
        card.flipped = true
        setCards(prevCards => prevCards.map(c => c.id === card.id ? { ...c, flipped: true } : c))
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    // Compare choices
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            if (choiceOne.src === choiceTwo.src) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true }
                        } else {
                            return card
                        }
                    })
                })
                console.log("match!")
                resetTurn()
            } else {
                console.log("No match!")
                setTimeout(() => {
                    setCards(prevCards => prevCards.map(card => {
                        if (card.id === choiceOne.id || card.id === choiceTwo.id) {
                            return { ...card, flipped: false }
                        } else {
                            return card
                        }
                    }))
                    resetTurn()
                }, 1000) // Delay if the cards don’t match
            }
        }
    }, [choiceOne, choiceTwo])

    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
    }

    return (
        <div className='app'>
            <h1>Magic Match</h1>
            <button onClick={suffleCards}>New Game</button>
            <h2>Turns: {turns}</h2>

            <Cards cards={cards} handelChoice={handelChoice} />
        </div>
    )
}

export default GamePage
