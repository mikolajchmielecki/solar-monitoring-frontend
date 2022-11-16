import Alert from 'react-bootstrap/Alert';


export default function AlertInCorner (props) {
    return (
      <div className="col-sm-6 AlertInCorner">
        <Alert variant={props.variant} onClose={props.onClose} dismissible style={{zIndex:1}}>
          {props.text}
        </Alert>
      </div>
    )}
