import { useState } from "react";
import Axios from "axios";

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    if (!tokenString || tokenString == "undefined") return null;
    console.log(tokenString);
    const userToken = JSON.parse(tokenString);
    console.log(userToken);
    if (userToken.jwt != null) {
      // Axios.post("http://localhost:8080/auth/verify", {
      //   jwt: userToken.jwt
      // }).then((response) => {
      //   console.log(response);
      //   if (response.user)
      //     return response;
      // });
      return userToken;
    }
    return null;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken.data));
    setToken(userToken.data);
  };

  return {
    setToken: saveToken,
    token,
  };
}
