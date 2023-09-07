
type GameResultProps = {
    game: any;
}


export const GameResult = ({game}: GameResultProps) => {
  return (
    <>
        <div className="container mb-0 mt-5">
            <div className="h3 mb-2 fw-light">Game Result</div>
            <div className="row">
                <div className="col-6 fw-bold">Player</div>
                <div className="col-3 fw-bold">Score</div>
                <div className="col-3 fw-bold">Time</div>
            </div>
            {game.playerResults.map((result: any, i: any) => {
                return (
                    <div key={i} className="row">
                        <div className="col-6">{result.player.username}</div>
                        <div className="col-3">{result.score}</div>
                        <div className="col-3">{game.timeMax - result.timeLeft}</div>
                    </div>
                )
            })
            }
        </div>
    </>
  )
}
