import { useCallback, useEffect, useState } from "react";
import './App.css';
import Card from "./Card";

const cardsArray = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const resetChoices = useCallback(() => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevVal => prevVal + 1);
    setDisabled(false);
  }, []);
  const scuffleCards = useCallback(() => {
    const cards = [...cardsArray, ...cardsArray].sort(() => Math.random() - 0.5).map(card => ({ ...card, id: Math.random() }));
    setCards(cards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
  }, [])
  const handleChoice = useCallback((card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }, [choiceOne])

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => prevCards.map(c => c.src === choiceOne.src ? ({ ...c, matched: true }) : c))
        resetChoices();
      } else {
        setTimeout(() => resetChoices(), 1000);
      }
    }
  }, [choiceOne, choiceTwo, resetChoices]);

  useEffect(() => {
    scuffleCards();
  }, [scuffleCards]);

  return (
    <div className="App">
      <h1>Magic match</h1>
      <button type="button" onClick={scuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(c => (
          <Card key={c.id} card={c} handleChoice={handleChoice} flipped={c === choiceOne || c === choiceTwo || c.matched} disabled={disabled} />
        ))}
      </div>

      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
