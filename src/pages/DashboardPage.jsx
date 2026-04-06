import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("auth_token");
    sessionStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    sessionStorage.removeItem("auth_user");
    navigate("/login", { replace: true });
  }

  return (
    <main className="dashboard-page">
      <section className="dashboard-card">
        <h1>Dashboard</h1>
        <p>Login realizado com sucesso. Esta e sua primeira tela protegida.</p>
        <button
          className="dashboard-button"
          onClick={handleLogout}
          type="button"
        >
          Sair
        </button>
      </section>
    </main>
  );
}

export default DashboardPage;
