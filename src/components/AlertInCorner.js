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


import Alert from 'react-bootstrap/Alert';
export default function AlertInCorner (props) {
  return (
    <div className="col-sm-6 AlertInCorner">
      <Alert variant={props.variant} onClose={props.onClose} dismissible style={{zIndex:1}}>
        {props.text}
      </Alert>
    </div>
  )
}
