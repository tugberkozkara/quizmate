

export const QuestionCard = ({ question }: { question: any } ) => {
  return (
    <>
        <div className="card text-center bg-secondary p-5">
            <div className="card-body">
                <h5 className="card-title">{question['id']}</h5>
                <h6 className="card-title text-muted">{question['category']}</h6>
                <h4 className="card-title">{question['question']}</h4>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Answer" name="answer" ></input>
                </div>
            </div>
        </div>
    </>
  )
}
