import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

 
export interface AuthCredentials {
  username: string;
  password: string;
}


export interface AuthResponse {
  token?: string;    
  message?: string;  
}


export interface ProtectedResponse {
  message: string;
  [key: string]: unknown; 
}


export async function registerUser(
  credentials: AuthCredentials
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/register", credentials);
  return response.data;
}


export async function loginUser(
  credentials: AuthCredentials
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/login", credentials);
  return response.data;
}


export async function getProtectedData(): Promise<ProtectedResponse> {
  
  const token = localStorage.getItem("token");

  const response = await api.get<ProtectedResponse>("/protected", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}