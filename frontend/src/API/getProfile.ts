export const getProfile = () => {
    fetch('/api/account/profile/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
          
          "login": "ilya",
          "email": "tester@gmail.com",
          "password": "tester123"
      
      })
    }).then(res=> res.json()).then(res=> console.log(res)).catch(err => console.log(err))
  }
