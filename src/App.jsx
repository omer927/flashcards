import { useState} from 'react';
import {CARD_DATA } from './data/cards';
import './App.css';

const App = () => {

  const [currCard, setCurrCard] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isStartCard, setIsStartCard] = useState(true);

  const [remainingIds, setRemainingIds] = useState(() => {
    return CARD_DATA.map(card => card.id);
  })

  const handleNextClick = () => {
    if(isStartCard){
      setIsStartCard(false);
    }
    let currPool = [...remainingIds];
    if(currPool.length === 0){
      currPool = CARD_DATA.map(card => card.id);
    }

    const randomIndex = Math.floor(Math.random() * currPool.length);
    const chosenId = currPool[randomIndex];
  
    const card = CARD_DATA.find(c => c.id === chosenId);
    setCurrCard(card);
    setIsFlipped(false);

    const updateIds = currPool.filter(id => id !== chosenId);
    setRemainingIds(updateIds);
  }


  return(
    <div>
      <h2>Learning Basic French</h2>
      <h4>How much french you do know? Test your knowledge and find out!</h4>
      <h5>Number of cards: {CARD_DATA.length}</h5>
      <br/> 
      {isStartCard ? (
        <div className="blur">
          <div className={`card ${isFlipped ?'flipped': ''}`} onClick={() => setIsFlipped(!isFlipped)}>
            <div className="front">
              <p>Start!</p>
              <br/>
            </div>
            <div className="back">
              <p>Press the button to go to the next card</p>
            </div>
          </div>
        </div>
      ) : (
        <div id={currCard?.difficulty || "medium"} className={`card ${isFlipped ? 'flipped': ''}`} onClick={() => setIsFlipped(!isFlipped)} >
          <div className="front"> 
            <p>{currCard.question}</p>
          </div>
          <div className="back">
            <p>{currCard.answer}</p>
          </div>
        </div>
      )}

      <br />
          
      <button onClick={handleNextClick} className="nextCard"> ⭢</button>
    </div>
 

  )
}

export default App;