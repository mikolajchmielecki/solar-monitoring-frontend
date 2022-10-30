import Alert from 'react-bootstrap/Alert';


export default function (props) {
    return (
      <div className="col-sm-6 alert">
        <Alert variant={props.variant} onClose={props.onClose} dismissible>
          {props.text}
        </Alert>
      </div>
    )}