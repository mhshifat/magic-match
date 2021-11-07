export default function Card({ card, handleChoice, flipped, disabled }) {
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} className="front" alt="" />
        <img src="/img/cover.png" className="back" onClick={() => !disabled && handleChoice(card)} alt="" />
      </div>
    </div>
  )
}