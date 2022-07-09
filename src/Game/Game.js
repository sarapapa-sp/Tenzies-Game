import React from "react";
import "./game.css";
import Die from "./Components/Die";
import { nanoid } from "nanoid";
import Title from "./Components/Title";
import Confetti from "react-confetti" 

const Game = () => {

    function generateDice() {
        return {
                
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      
        }
    }

  // State to store the array of dice values
    const [dice, setDice] = React.useState(allNewDie());
    //State to check whether the user won or not
    const [tenzie,setTenzie] = React.useState(false)
  // Function called when we click the RollButton
    function rollDice() {
        if (!tenzie) {
            setDice(prevDice => prevDice.map(die => {
          return die.isHeld ?
              die :
              generateDice()
            }
            )
            )
        } else {
            setTenzie(false)
            setDice(allNewDie())
      }
    
    }
    // Using useEffect() to keep the two states in sycs
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const valuesSame = dice.every(die => die.value === firstValue)

        if (allHeld && valuesSame) {
            console.log("You Won")
            setTenzie(true)
        }
    },[dice])

  // allNewDie() to create the array with 10 random values
  function allNewDie() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateDice());
    }

    return newDice;
  }

  function holdDice(id) {
      setDice(prevDice => dice.map(die => {
          return die.id === id ?
              { ...die, isHeld: !die.isHeld } :
              die
    }))
  }
  // array of <Die /> elements
  const DiceElements = dice.map((die) => (
      <Die
          key={die.id}
          value={die.value}
          isHeld={die.isHeld}
          handler={() => holdDice(die.id)}
      />
  ));

  return (
      <div className="game">
          {tenzie && <Confetti />}
          <Title />
      <div className="dice-container">{DiceElements}</div>
      {/* Dice Button */}
      <button onClick={rollDice} className="roll-dice--button">
        {tenzie ? "Start Game" : "Roll Dice"}
      </button>
    </div>
  );
};

export default Game;
