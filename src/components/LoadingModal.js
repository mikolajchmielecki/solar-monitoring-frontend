import { Spinner, Modal } from 'react-bootstrap';
import { useState } from 'react';

export default function LoadingModal() {

  const [loading, setLoading] = useState(true)
  const [firstLoading, setFirstLoading] = useState(true)

  function setLoadingExt(value) {
    setLoading(value)
    if (!value) {
      setFirstLoading(false)
    }
  }
  
  const component = <Modal size="sm" show={loading} animation={false} centered>
        <Modal.Body>
          <div className='text-center mt-3 p-3'>
          <Spinner animation="border" role="status" />
          <p>Ładowanie...</p> 
          </div>
        </Modal.Body>
      </Modal>
  return [firstLoading, setLoadingExt, (component)]
}