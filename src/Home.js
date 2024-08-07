import useFetch from './useFetch';
import "./styles/home.css";
import { useEffect, useState } from 'react';
import Card from './Card';

const Home = () => {
    let {data:allCards,isPending,error} = useFetch('http://localhost:8000/cards');
    const [cards, setCards] = useState([]);
    const [firstChoice, setFirstChoice] = useState(null);
    const [secondChoice, setSecondChoice] = useState(null);


    useEffect(()=>{
        if(allCards){
            const shuffledCards = allCards.sort(() => Math.random() - 0.5);
            setCards(shuffledCards);
            console.log(shuffledCards);
        }  
    }, [allCards]);

    const handleChoice=(card)=>{
        console.log(card);
        if(!firstChoice)
            setFirstChoice(card);
        else if(!secondChoice)
            setSecondChoice(card);
    }
        
    return ( 
        <div className="home-container">
            <h1>Memory card game</h1>
            <div className="home-content">
                {cards && cards.map(card=>(
                    <Card key={card.id} card={card} handleChoice={handleChoice}/>
                ))}
            </div>
            
        </div>
     );
}
 
export default Home;