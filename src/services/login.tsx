import { api } from "../api";

interface UserData {
  email: string;
  password: string;
}

export const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const data = await api as UserData; // Casting explícito

    // Verifique se os campos de email e senha existem no retorno da API
    if (!data.email || !data.password) {
      return false;
    }

    // Comparação de email e senha
    if (email !== data.email || password !== data.password) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao tentar fazer login:", error);
    return false; // Retorna falso se houver qualquer erro
  }
};
