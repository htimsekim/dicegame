
export default function Die(props) {

  return(
    <div className={props.isHeld ? "green die" : "die"} onClick={props.handleClick}>
      <span className="dieNumber">{props.value}</span>
    </div>
  )
}