import axios from "axios"
import { Models } from "imports/model.import";

let token = localStorage.getItem("token")
export const instance = () => {
    const data = axios.create({
    baseURL: "https://6540e35c45bedb25bfc2d015.mockapi.io",
      headers: {
        "authorization" :token || "",
        'x-apikey': '59a7ad19f5a9fa0808f11931',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
  });
    data.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response) {
          if (error.response.data.message === 'jwt expired') {
            try {
              const regenerateToken: any = await Models.auth.regenerateToken()
              localStorage.setItem('token', regenerateToken.token)
              token = regenerateToken.token
              const options = {
                headers: {
                  "content-type": "application/json",
                  "Authorization": regenerateToken.token
                }
              }
              return axios.post(`${error.response.config.baseURL}${error.response.config.url}`, {}, options)
            }
            catch (err: any) {
              window.localStorage.clear()
              window.location.href = '/login'
              return Promise.reject(err)
            }
          }
          else if (error.response.data.message === 'Invalid token') {
            window.localStorage.clear()
            window.location.href = '/login'
            return Promise.reject('Invalid token')
          } else {
            return Promise.reject(error)
          }
        } else return Promise.reject(error);
      },
    );
    return data;
  };
