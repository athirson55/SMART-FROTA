import { useState } from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFeedback({ type: "", message: "" });

    const nome = formData.nome.trim();
    const email = formData.email.trim();
    const senha = formData.senha.trim();
    const confirmarSenha = formData.confirmarSenha.trim();

    if (!nome || !email || !senha || !confirmarSenha) {
      setFeedback({
        type: "erro",
        message: "Preencha todos os campos para continuar.",
      });
      return;
    }

    if (senha.length < 6) {
      setFeedback({
        type: "erro",
        message: "A senha deve ter ao menos 6 caracteres.",
      });
      return;
    }

    if (senha !== confirmarSenha) {
      setFeedback({
        type: "erro",
        message: "A confirmação de senha não confere.",
      });
      return;
    }

    setFeedback({
      type: "sucesso",
      message: "Cadastro realizado com sucesso (simulação).",
    });
  }

  return (
    <div className="tela-de-login">
      <div className="lado-esquerdo">
        <div className="login auth-card auth-card-tall">
          <div className="background-login"></div>

          <p className="smart-frota-SOLU-ES">
            <span className="text-wrapper-10">
              SMART FROTA
              <br />
            </span>
            <span className="text-wrapper-11">SOLUÇÕES EM FROTA</span>
          </p>

          <section className="auth-content" aria-labelledby="titulo-cadastro">
            <h1 className="auth-title" id="titulo-cadastro">
              Criar Conta
            </h1>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <label className="auth-field" htmlFor="cadastro-nome">
                <span className="auth-label">NOME</span>
                <input
                  className="auth-input"
                  id="cadastro-nome"
                  name="nome"
                  type="text"
                  placeholder="Digite o seu nome"
                  autoComplete="name"
                  inputMode="text"
                  maxLength="100"
                  spellCheck="false"
                  autoCapitalize="words"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="auth-field" htmlFor="cadastro-email">
                <span className="auth-label">EMAIL</span>
                <input
                  className="auth-input"
                  id="cadastro-email"
                  name="email"
                  type="email"
                  placeholder="Digite o seu email"
                  autoComplete="email"
                  inputMode="email"
                  maxLength="254"
                  spellCheck="false"
                  autoCapitalize="off"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="auth-field" htmlFor="cadastro-senha">
                <span className="auth-label">SENHA</span>
                <input
                  className="auth-input"
                  id="cadastro-senha"
                  name="senha"
                  type="password"
                  placeholder="Crie uma senha"
                  autoComplete="new-password"
                  maxLength="128"
                  spellCheck="false"
                  autoCapitalize="off"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="auth-field" htmlFor="cadastro-confirmar-senha">
                <span className="auth-label">CONFIRMAR SENHA</span>
                <input
                  className="auth-input"
                  id="cadastro-confirmar-senha"
                  name="confirmarSenha"
                  type="password"
                  placeholder="Confirme sua senha"
                  autoComplete="new-password"
                  maxLength="128"
                  spellCheck="false"
                  autoCapitalize="off"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  required
                />
              </label>

              <button className="auth-submit" type="submit">
                Cadastrar
              </button>

              <p
                className={`auth-feedback ${feedback.type}`}
                aria-live="polite"
              >
                {feedback.message}
              </p>
            </form>

            <Link className="auth-link" to="/login">
              Já tem conta? Entrar
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
