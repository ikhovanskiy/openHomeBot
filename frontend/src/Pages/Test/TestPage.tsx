
import React from 'react'
import Html5QrcodePlugin from './Html5QrcodePlugin';

export default function TestPage() {

    const onNewScanResult = (decodedText, decodedResult) => {
        console.log(decodedText, decodedResult)
    };
  return (
    <div>
        <Html5QrcodePlugin
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={onNewScanResult}
            />
    </div>
  )
}
