
type AlertProps = {
  type: string,
  heading: string,
  text: string,
  mutedText: string,
  hasSpinner: boolean,
}

export const Alert = ({type, heading, text, mutedText, hasSpinner}: AlertProps) => {
  return (
    <>
      <div className="container mb-0 mt-5">
        <div className={"alert alert-"+type} role="alert">
            <h4 className="alert-heading">{heading}</h4>
            <p>{text}</p>
            {hasSpinner && <div className="spinner-border" role="status"></div>}
            <p className="mb-0 small text-muted">{mutedText}</p>
        </div>
      </div>
    </>
  )
}
