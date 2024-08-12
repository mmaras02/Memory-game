import { useState } from "react";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const levels = [
        {level:1, cardCount:4 },
        {level:2, cardCount:10 },
        {level:3, cardCount:16 },
        {level:4, cardCount:20 },
        {level:5, cardCount:30 },
    ]
    const [cardCount,setCardCount] = useState(0);

    const handleLevelClick = (level) => {
        console.log("chosen level:",level.level);
        navigate("/game",{ state: { cardCount: level.cardCount } });
    }

    return ( 
        <div className="home">
            <h1>Welcome to memory card game!</h1>
            <p>Choose a level!</p>
            <div className="home-content">
                {levels && levels.map((level)=>(
                    <div key={level.level} className="level-container" onClick={()=>handleLevelClick(level)}>
                        <p>{level.level}</p>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default Home;