
import { BACKEND_API } from "../../../config"
interface data {
  email:string,
  password: string
}

export const logIn = (data:data) => {    

    return fetch(BACKEND_API+'auth/login/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": data.email,
        "password": data.password
      })
    })
    .then(res=> res.json())
    .then(res=> {
      document.cookie = 'user=' + res.user.id
      }).catch((err:any)=>{console.log(err)})
  }