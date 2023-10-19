import React, { useRef, useState } from 'react'
import QrReader from 'react-qr-scanner'


export default function TestPage() {

  const [state, setState] = useState('No result')
    const handleScan = (data) => {
      if (data) {
        setState(data.text);
        console.log(data)
      }
    }
    const handleError = (err) => {
      console.error(err)
    }


  return (
    <div>
        <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "30%" }}
      />
        <p>{state}</p>    
    </div>
  )
}
