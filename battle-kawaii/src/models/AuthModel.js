import { response } from "express";

const URL = "http://localhost:3001/api/v1/auth";


class AuthModel {
  static register = (data) => {
    return fetch(`${URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => {
      return response.json()
    })
  }
}

export default AuthModel