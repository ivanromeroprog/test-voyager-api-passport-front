import axios, { AxiosError, AxiosResponse } from "axios";


const axiosInterceptorResponse =
(response: AxiosResponse) => {
  return response;
};

const axiosInterceptorError = (error:AxiosError) => {
  if (error.response && (error.response.status === 422 || error.response.status === 401)) {
    return Promise.resolve(error.response); // Devolver la respuesta en caso de un código de estado 422
  }
  return Promise.reject(error); // Rechazar otros errores
};

export const accessTokenCookieName = `${process.env.NEXT_PUBLIC_APPNAME}_access_token`;
export const refreshTokenCookieName = `${process.env.NEXT_PUBLIC_APPNAME}_refresh_token`;


export function createAxiosInstances(accessToken: string | null = null) {
  const axiosApiAccessTokenInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const axiosApiInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  });

  const axiosAppInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
  });

  axiosApiInstance.interceptors.response.use(axiosInterceptorResponse,axiosInterceptorError);
  axiosApiAccessTokenInstance.interceptors.response.use(axiosInterceptorResponse,axiosInterceptorError);
  axiosAppInstance.interceptors.response.use(axiosInterceptorResponse,axiosInterceptorError);


  return { axiosApiAccessTokenInstance, axiosApiInstance, axiosAppInstance };
}

/**
 * api: Instacia de api si Token
 * app: Instancia de app local next
 * apt: Instancia de api con token
 */
const {
   axiosApiInstance: api, 
   axiosAppInstance: app,
   axiosApiAccessTokenInstance: apt
} = createAxiosInstances();

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  let response: { status: number; statusText: string; data: any } = {
    status: 500,
    statusText: "Error interno",
    data: {},
  };
  await api
    .post("/login", {
      email,
      password,
    })
    .then((r) => (response = r))
    .catch((err) => (response = err.response));

  return response;
}

export async function user() {
  let response: { status: number; statusText: string; data: any } = {
    status: 500,
    statusText: "Error interno",
    data: {},
  };
  await apt
    .get("/user")
    .then((r) => (response = r))
    .catch((err) => (response = err.response));

  return response;
}

export async function logout() {
  let response: { status: number; statusText: string; data: any } = {
    status: 500,
    statusText: "Error interno",
    data: {},
  };
  await app
    .post("/logout")
    .then((r) => (response = r))
    .catch((err) => (response = err.response));

  return response;
}

