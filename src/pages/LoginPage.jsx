import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/auth";

function LoginPage() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [manterConectado, setManterConectado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback({ type: "", message: "" });

    if (!usuario.trim() || !senha.trim()) {
      setFeedback({
        type: "erro",
        message: "Preencha usuário e senha para continuar.",
      });
      return;
    }

    try {
      setLoading(true);
      await loginRequest({
        usuario: usuario.trim(),
        senha: senha.trim(),
        manterConectado,
      });

      setFeedback({
        type: "sucesso",
        message: "Login realizado com sucesso. Redirecionando...",
      });

      window.setTimeout(() => {
        navigate("dashboard", { replace: true });
      }, 500);
    } catch (error) {
      setFeedback({
        type: "erro",
        message:
          error?.message ||
          "Falha de conexão com o servidor. Verifique a API e tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="tela-de-login">
      <div className="lado-esquerdo">
        <div className="login">
          <div className="background-login"></div>
          <p className="acesse-o-PORTAL-DE">
            <span className="span">Acesse o</span>
            <span className="text-wrapper-8">&nbsp;</span>
            <span className="text-wrapper-9">PORTAL DE GESTÃO</span>
          </p>
          <p className="smart-frota-SOLU-ES">
            <span className="text-wrapper-10">
              SMART FROTA
              <br />
            </span>
            <span className="text-wrapper-11">SOLUÇÕES EM FROTA</span>
          </p>
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="campos-de-login">
              <label className="campo-usurio" htmlFor="usuario">
                <span className="text-wrapper-4">USUÁRIO</span>
                <input
                  className="campo-input text-wrapper-5"
                  id="usuario"
                  name="usuario"
                  type="text"
                  placeholder="Digite o seu usuário"
                  autoComplete="username"
                  value={usuario}
                  onChange={(event) => setUsuario(event.target.value)}
                  required
                />
              </label>
              <label className="campo-senha" htmlFor="senha">
                <span className="text-wrapper-6">SENHA</span>
                <input
                  className="campo-input text-wrapper-7"
                  id="senha"
                  name="senha"
                  type="password"
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                  required
                />
              </label>
            </div>

            <label className="manter-conectado" htmlFor="manter-conectado">
              <input
                className="captcha"
                id="manter-conectado"
                name="manterConectado"
                type="checkbox"
                checked={manterConectado}
                onChange={(event) => setManterConectado(event.target.checked)}
              />
              <span className="text-wrapper-3">Manter Conectado</span>
            </label>

            <a className="div" href="#">
              Recuperar Senha
            </a>

            <button className="boto-entrar" type="submit" disabled={loading}>
              <span className="group">
                <span className="background-entrar"></span>
                <span className="background-entrar"></span>
                <span className="text-wrapper">
                  {loading ? "ENTRANDO..." : "ENTRAR"}
                </span>
              </span>
            </button>

            <p className={`login-feedback ${feedback.type}`} aria-live="polite">
              {feedback.message}
            </p>
          </form>

          <a className="text-wrapper-2" href="#">
            Cadastre-se
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
