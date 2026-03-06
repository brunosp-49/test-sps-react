import axios from "axios";
import type { LoginRequest, LoginResponse } from "../types/api.types";
import { setStoredAuth } from "./api";

const baseURL = process.env.REACT_APP_SERVER_URL;

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const { data, status } = await axios.post<LoginResponse>(
    `${baseURL}/auth`,
    credentials,
    {
      headers: { "Content-Type": "application/json" },
      validateStatus: () => true,
    }
  );

  if (status !== 200) {
    const message =
      (data as { error?: string })?.error ||
      (status === 404 ? "Serviço não encontrado." : "Erro ao entrar. Tente novamente.");
    throw Object.assign(new Error(message), { response: { status, data: { error: message } } });
  }

  if (!data?.token || !data?.user) {
    throw new Error("Resposta de login inválida.");
  }
  setStoredAuth(data.token, data.user);
  return data;
}
