/* eslint-disable */
const User = {
  isAuthenticated: localStorage.getItem("token") !== null,
  user: localStorage.getItem("user") && JSON?.parse(localStorage?.getItem("user")),
  getToken() {
    return User.token;
  },
  getUser() {
    return User.user;
  },
  setUserKey(key, value) {
    return new Promise((resolve, reject) => {
      User.user[key] = value;
      localStorage.setItem("user", JSON.stringify(User.user));
      resolve();
    });
  },
  authenticate(token, user) {
    return new Promise((resolve, reject) => {
      User.isAuthenticated = true;
      User.token = token;
      User.user = user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      resolve();
    });
  },
  signout(cb) {
    return new Promise((resolve, reject) => {
      User.isAuthenticated = false;
      User.user = null;
      localStorage.removeItem("user");
      resolve();
    });
  },
};

export { User };
