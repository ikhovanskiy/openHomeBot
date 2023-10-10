import { BACKEND_API } from "../../../config"

export const logOut = () => {
    return fetch(BACKEND_API+'auth/logout/').then(res=> res.json()).then(()=> {
      document.cookie = 'user=; path=/; expires=-1'
      })
  }