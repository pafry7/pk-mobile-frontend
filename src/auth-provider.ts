import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const { manifest } = Constants;
const localAuthURL = `http://${manifest.debuggerHost
  .split(":")
  .shift()}:5001/pk-mobile-298912/us-central1`;
const localStorageKey = "jwtToken";

interface LoginProps {
  password: string;
  email: string;
}

interface RegisterProps {
  password: string;
  email: string;
  fullName: string;
  course: string;
  exerciseGroup: string;
  laboratoryGroup?: string;
}

async function getToken() {
  return SecureStore.getItemAsync(localStorageKey);
}

async function deleteToken() {
  return SecureStore.deleteItemAsync(localStorageKey);
}

async function handleUserResponse({ user }: any) {
  console.log({ user }, "handleUser response");
  await SecureStore.setItemAsync(localStorageKey, user.token);
  return user;
}

async function login(data: LoginProps) {
  console.log({ data });
  return client("login", { body: data }).then(handleUserResponse);
}

async function register(data: RegisterProps) {
  console.log("data,", data);
  return client("register", { body: data }).then(handleUserResponse);
}

async function me() {
  return client("me", {}).then((user) => user);
}

async function logout() {
  SecureStore.deleteItemAsync(localStorageKey);
}

export async function client(endpoint: string, { body }: { body?: any }) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = await getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config: Record<string, any> = {
    method: "POST",
    headers: { ...headers },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }
  return fetch(`${localAuthURL}/${endpoint}`, config).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export { getToken, login, register, me, logout, localStorageKey, deleteToken };
