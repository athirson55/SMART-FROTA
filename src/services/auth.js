const LOGIN_API_URL =
  import.meta.env.VITE_LOGIN_API_URL || "http://localhost:3000/auth/login";

function getStorage(keepConnected) {
  return keepConnected ? localStorage : sessionStorage;
}

export function getStoredToken() {
  return (
    localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token")
  );
}

export async function loginRequest({ usuario, senha, manterConectado }) {
  const response = await fetch(LOGIN_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      usuario,
      senha,
      manterConectado,
    }),
  });

  let payload = null;
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    payload = await response.json();
  }

  if (!response.ok) {
    const message =
      payload?.message ||
      payload?.mensagem ||
      payload?.error ||
      payload?.erro ||
      (response.status === 401
        ? "Usuário ou senha inválidos."
        : "Não foi possível autenticar. Verifique seus dados.");

    throw new Error(message);
  }

  const token = payload?.token || payload?.accessToken || null;
  const user = payload?.usuario || payload?.user || null;

  if (token) {
    const currentStorage = getStorage(manterConectado);
    const otherStorage = manterConectado ? sessionStorage : localStorage;

    currentStorage.setItem("auth_token", token);
    otherStorage.removeItem("auth_token");
  }

  if (user) {
    const currentStorage = getStorage(manterConectado);
    currentStorage.setItem("auth_user", JSON.stringify(user));
  }

  return payload;
}
