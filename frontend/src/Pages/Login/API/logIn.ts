interface data {
  email: string,
  password: string
}

export const logIn = (data: data) => {  
  return fetch('/api/auth/login/', {
    method: 'POST',
    cache: 'no-cache',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "email": data.email,
      "password": data.password

    })
  })
    .then(res => res.json())
    .then(res => {
      document.cookie = 'user=' + res.user.id
    }).catch((err: any) => { console.log(err) })
}
