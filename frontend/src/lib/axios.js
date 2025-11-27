import axios from "axios";

// if we are in development we get from our localhost but if production we get whatever the link is slash API since we are hosting both the backend from the frontend, if we are hosting both seperately we wil write the link to the backend fully here then slash API.
// then we add the cookies so that when we send the request we can handle the authentication, so this is going to send the cookies with the request.
// then we set up zustand which is a state management library that we will be using. we use zustand for state management to avoid drilling for an instance you want to use a state in a component inisde a component in a component you will first have to pase the state then pass it as arguement as object then you drill to the last component.
export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3000/api"
      : "/api",
  withCredentials: true,
});
