import useFetch from './useFetch';
import { useEffect, useState } from "react";
import "./styles/home.css";
import Card from './Card';

const Home = () => {
    let {data:allCards} = useFetch('http://localhost:8000/cards');
    const [cards,setCards] = useState([]);
    const [firstChoice,setFirstChoice] = useState([]);
    const [secondChoice,setSecondChoice] = useState([]);
    const [matchedCards,setMatchedCards] = useState([]);
    //have to make counter how many times we guessed
    const [numOfGuesses,setNumOfGuesses] = useState(0);
    const [disable,setDisable] = useState(false);//false-moze se klikat //true-disable further clicks
    //if all the cards are open and matched then you cant click on them anymore and it says level passed or som

    useEffect(()=>{
        if(allCards){
            const shuffledCards = allCards.sort(() => Math.random() - 0.5).slice(0,5);
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
            //new game button?
        }
    }

    return ( 
        <div className="home-container">
            <h1>Memory game</h1>
            <p>Number of guesses: {numOfGuesses}</p>
            <div className="home-content">
                {cards && cards.map(card=>(
                    <Card key={card.uniqueId} card={card} handleChoice={handleChoice} flipped={firstChoice===card || secondChoice===card || matchedCards.includes(card.card)}/>
                ))}
            </div>
        </div>
     );
}
 
export default Home;