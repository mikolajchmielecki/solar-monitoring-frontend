/*
* SolarMonitoring
* Copyright (C) 2022 Mikołaj Chmielecki
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* LICENSE file in root directory contains a copy of the GNU General Public License.
*/

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
