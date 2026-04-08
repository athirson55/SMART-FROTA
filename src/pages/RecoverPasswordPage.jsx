import { useState } from "react";
import { Link } from "react-router-dom";

function RecoverPasswordPage() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  function handleSubmit(event) {
    event.preventDefault();
    setFeedback({ type: "", message: "" });

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setFeedback({
        type: "erro",
        message: "Informe seu email para continuar.",
      });
      return;
    }

    setFeedback({
      type: "sucesso",
      message:
        "Se o email estiver cadastrado, enviaremos um link de recuperação.",
    });
  }

  return (
    <div className="tela-de-login">
      <div className="lado-esquerdo">
        <div className="login auth-card auth-card-medium">
          <div className="background-login"></div>

          <p className="smart-frota-SOLU-ES">
            <span className="text-wrapper-10">
              SMART FROTA
              <br />
            </span>
            <span className="text-wrapper-11">SOLUÇÕES EM FROTA</span>
          </p>

          <section className="auth-content" aria-labelledby="titulo-recuperar">
            <h1 className="auth-title" id="titulo-recuperar">
              Recuperar Senha
            </h1>
            <p className="auth-subtitle">
              Informe seu email para receber o link de recuperação
            </p>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <label className="auth-field" htmlFor="recuperar-email">
                <span className="auth-label">EMAIL</span>
                <input
                  className="auth-input"
                  id="recuperar-email"
                  name="email"
                  type="email"
                  placeholder="Digite o seu email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </label>

              <button className="auth-submit" type="submit">
                Enviar
              </button>

              <p
                className={`auth-feedback ${feedback.type}`}
                aria-live="polite"
              >
                {feedback.message}
              </p>
            </form>

            <Link className="auth-link" to="/login">
              Voltar para login
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

export default RecoverPasswordPage;
