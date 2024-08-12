import useFetch from './useFetch';
import { useEffect, useState } from "react";
import "../styles/game.css";
import Card from './Card';
import { useNavigate, useLocation } from 'react-router-dom';

const Game = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const cardCount = location.state?.cardCount;
    let {data:allCards} = useFetch('http://localhost:8000/cards');
    const [cards,setCards] = useState([]);
    const [firstChoice,setFirstChoice] = useState([]);
    const [secondChoice,setSecondChoice] = useState([]);
    const [matchedCards,setMatchedCards] = useState([]);
    const [numOfGuesses,setNumOfGuesses] = useState(0);
    const [disable,setDisable] = useState(false);

    useEffect(()=>{
        if(allCards){
            const shuffledCards = allCards.sort(() => Math.random() - 0.5).slice(0,cardCount/2);
            const duplicateCards=[...shuffledCards,...shuffledCards].map((card, index) => ({
                ...card, 
                uniqueId: `${card.id}-${index}`
            })).sort(() => Math.random() - 0.5);

            setCards(duplicateCards);
            setNumOfGuesses(0);
        }  
    }, [allCards]);

    const handleChoice = (card) =>{
        if(!disable){
            if(!firstChoice)
                setFirstChoice(card);
            else if(firstChoice && !secondChoice)
                setSecondChoice(card);
    
            console.log(card);
        }
    }

    useEffect(()=>{
        if(firstChoice && secondChoice){
            setDisable(true);
            if(firstChoice.card===secondChoice.card){
                setMatchedCards(prev=>{
                    if(firstChoice.card)
                        return [...prev,firstChoice.card];
                    return prev;
                });
                resetChoice();
            }
            else
                setTimeout(resetChoice,1000);
            
            setNumOfGuesses(numOfGuesses+1);
        }
        checkEndGame();

    },[firstChoice,secondChoice]);

    const resetChoice = () => {
        setFirstChoice(null);
        setSecondChoice(null);
        setDisable(false);
    }

    const checkEndGame = () => {
        console.log("matched length:", matchedCards.length);
        console.log("card length:", cards.length /2);
        console.log("card :", cards);

        if (matchedCards.length === cards.length / 2 && cards.length > 0 ){
            alert(`You guessed all the cards!\nTotal score: ${numOfGuesses}`);
            navigate("/");
        }
    }

    const calculateColumns = () => {
        if(cardCount==4) return 4;
        else if (cardCount == 10) return 5;
        else if(cardCount==16) return 8;
        else if (cardCount == 24) return 8;
        else if(cardCount==30) return 10;
    };
    

    return ( 
        <div className="game-container">
            <h1>Memory game</h1>
            <p>Number of guesses: {numOfGuesses}</p>
            <div className="game-content" style={{ gridTemplateColumns: `repeat(${calculateColumns()}, 1fr)` }}>
                {cards && cards.map(card=>(
                    <Card key={card.uniqueId} card={card} handleChoice={handleChoice} flipped={firstChoice===card || secondChoice===card || matchedCards.includes(card.card)}/>
                ))}
            </div>
        </div>
     );
}
export default Game;