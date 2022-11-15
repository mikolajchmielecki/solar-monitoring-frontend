import { Modal, Button } from 'react-bootstrap';

export default function ConfirmDelete ({showConfirmation, setShowConfirmation, handleDelete, name}) {
    return (
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)} animation={true}>
        <Modal.Header closeButton />
        <Modal.Body>Czy na pewno chcesz usunąć {name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowConfirmation(false)}>
            Nie
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Tak, usuń {name}
          </Button>
        </Modal.Footer>
      </Modal>
    )}
