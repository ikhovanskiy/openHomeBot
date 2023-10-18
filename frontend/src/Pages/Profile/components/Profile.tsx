import React from 'react'

export default function Profile() {
    const handleClick = () => {
        fetch('/api/account/profile/')
            .then(res => res.json())
            .then(res=>console.log(res))
            .catch(e=> console.log(e))
    }

    const addByQr = () => {
        fetch('api/receipts/addByQr/', {
            method: 'POST',
            cache: 'no-cache',
            mode: 'cors',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "qrraw": 't=20230615T2115&s=766.00&fn=9960440302181657&i=15462&fp=1030187797&n=1'
            })
          })
            .then(res => res.json())
            .then(res=>console.log(res))
            .catch(e=> console.log(e))
    }

  return (
    <div>  
        <button onClick={handleClick}>
              Получить профиль
          </button>
          <button onClick={addByQr}>
              Добавить
          </button>
    </div>
  )
}
