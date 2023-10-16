export const logOut = () => {
    return fetch('/api/auth/logout/').then().then(()=> {
      document.cookie = 'user=; path=/; expires=-1'
      })
  }