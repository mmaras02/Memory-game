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

    useEffect(()=>{
        if(allCards){
            const shuffledCards = allCards.sort(() => Math.random() - 0.5).slice(0,5);
            const duplicateCards=[...shuffledCards,...shuffledCards].map((card, index) => ({
                ...card, 
                uniqueId: `${card.id}-${index}`
            })).sort(() => Math.random() - 0.5);

            setCards(duplicateCards);
        }  
    }, [allCards]);

    const handleChoice = (card) =>{
        if(!firstChoice)
            setFirstChoice(card);
        else if(firstChoice && !secondChoice)
            setSecondChoice(card);
        console.log(card);
    }

    useEffect(()=>{
        if(firstChoice && secondChoice){
            if(firstChoice.card===secondChoice.card){
                setMatchedCards(prev=>[...prev,firstChoice.card]);
                resetChoice();
            }
            else{
                setTimeout(resetChoice,1000);
            }
        }
    })

    const resetChoice = () =>{
        setFirstChoice(null);
        setSecondChoice(null);
    }

    return ( 
        <div className="home-container">
            <h1>Memory game</h1>
            <div className="home-content">
                {cards && cards.map(card=>(
                    <Card key={card.uniqueId} card={card} handleChoice={handleChoice} flipped={firstChoice===card || secondChoice===card || matchedCards.includes(card.card)}/>
                ))}
            </div>
        </div>
     );
}
 
export default Home;