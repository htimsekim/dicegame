import React from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(x => x.isHeld === true)
    const allSame = dice.every(x => x.value === dice[0].value)
    if (allHeld && allSame) {    
      console.log("you win!")
      setTenzies(true)
    }    
  }, [dice])

  function allNewDice() {
    const diceArray = []
    for (let i=0; i<10; i++) {
      diceArray.push({
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      })
    }
    return diceArray
  }

  const diceElements = dice.map(item => {
    return (
      <Die
        key={item.id}
        value={item.value}
        isHeld={item.isHeld}
        handleClick={() => hold(item.id)}
      />
    )
  })

  function hold(id) {
    const newDice = [...dice]
    const holdIndex = newDice.findIndex(x => x.id === id)
    newDice[holdIndex].isHeld = !newDice[holdIndex].isHeld
    setDice(newDice)
  }

  function roll() {
    const rolledDice = dice.map(die => die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)})
    setDice(rolledDice)
  }

  function newGame() {
    setDice(allNewDice())
    setTenzies(false)
  }

  return (
    <main>
      {tenzies && <Confetti width={1920} height={1080} />}
      {tenzies ? <h1 className="youWin">You win!</h1> :
      <ul className="howToPlay">
        <li>Roll the dice</li>
        <li>Click one to lock its value</li>
        <li>Lock in 10 matching values to win!</li>
      </ul>
      }
      <div className="diceBox">
        {diceElements}
      </div>
      <button
        className="rollButton"
        onClick={() => tenzies ? newGame() : roll()}
        >
          {tenzies ? "New Game!" : "Roll!"}
        </button>
    </main>
  )
}