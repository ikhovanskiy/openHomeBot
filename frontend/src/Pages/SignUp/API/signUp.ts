import { BACKEND_API } from "../../../config"

interface data {
  email:string, 
  password:string, 
  login:string, 
  first_name:string, 
  second_name:string, 
  patronymic:string
}

export const signUp = ({email, password, login, first_name, second_name, patronymic}:data) => {
    return fetch(BACKEND_API+'auth/signup/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
        "login": login,
        "first_name": first_name,
        "second_name": second_name,
        "patronymic": patronymic
      })
    })
    .then(res=> res.json())
    .then(res=> {
      document.cookie = 'user=' + res.user.id
    })
  }