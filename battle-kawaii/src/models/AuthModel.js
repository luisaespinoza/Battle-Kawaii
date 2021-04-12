
const URL = "http://localhost:3001/api/v1";


class AuthModel {
  // registering a new user
  static register = (data) => {
    return fetch(`${URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => {
      return response.json()}
      )
  }

  // log in a new user
  static login = (data) => {
    return fetch(`${URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => {
      return response.json()
  })}

  // method for verifying JWT token validity
  static verify = () => {
    return fetch(`${URL}/auth/profile`, {
      // send the token in the authorization header
      headers: { authorization: `Bearer ${ localStorage.uid }` }
    }).then((response) => {
      return response.json()
  })}
}

export default AuthModel
