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