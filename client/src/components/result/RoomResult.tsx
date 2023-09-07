
type RoomResultProps = {
    room: any;
}


export const RoomResult = ({room}: RoomResultProps) => {
  return (
    <>
        <div className="container mb-0 mt-5">
            <div className="h3 mb-2 fw-light">Room Result</div>
            <div className="row">
                <div className="col-6 fw-bold">Player</div>
                <div className="col-6 fw-bold">Score</div>
            </div>
            {room.results.map((result: any, i: any) => {
                return (
                    <div key={i} className="row">
                        <div className="col-6">{result.player.username}</div>
                        <div className="col-6">{result.score}</div>
                    </div>
                )
            })
            }
        </div>
    </>
  )
}
