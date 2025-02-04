import {User} from "./User"

export class Headers {
  static get () {
    return {
      'Content-Type': 'application/json',
    }
  }
  static get_auth (){
    return {
      'Content-Type': 'application/json',
      Authorization: `${User.getToken()}`
    }
  }
}