import { Spinner, Modal } from 'react-bootstrap';

export default function LoadingModal ({loading}) {
  return (
    <Modal size="sm" show={loading} animation={false} centered>
        <Modal.Body>
          <div className='text-center mt-3 p-3'>
          <Spinner animation="border" role="status" />
          <p>Ładowanie...</p> 
          </div>
        </Modal.Body>
      </Modal>
    )
}