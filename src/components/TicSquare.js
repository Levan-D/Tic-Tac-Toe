/** @format */

function TicSquare(props) {
  return (
    <div
      onClick={props.click}
      className={`TicTac ${props.side === 'O'  ? "oue" : "exe"}`}
    >
      {props.side}
    </div>
  )
}

export default TicSquare
