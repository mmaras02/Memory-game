const Card = ({card, handleChoice,flipped}) => {

    const handleClick = () => {
        console.log(`Card clicked: ${card.id}`);
        console.log(`Flipped state: ${!flipped}`);
        handleChoice(card);
    }

    return ( 
        <div className={`card ${flipped ? "flipped" : ""}`} onClick={handleClick}>
            <img className='front' src={card.card} alt={'card front ${card.id}'} />
            <img className='back' src='/images/purple_back.png'  alt={'card back &{card.id}'} />
        </div>
     );
}

 
export default Card;