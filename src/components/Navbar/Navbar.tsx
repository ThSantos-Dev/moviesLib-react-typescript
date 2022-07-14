// Styles
import styles from "./Navbar.module.css";

// Components e Hooks - Router
import { Link, useNavigate } from "react-router-dom";

// Icons
import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi";

// Hooks
import { ChangeEvent, FormEvent, useState } from "react";

const Navbar = () => {
  // State para gerenciar a query de pesquisa
  const [query, setQuery] = useState<string>("");

  // Instaciando useNavigate para redirecionar o usuário
  const navigate = useNavigate()

  // Função responsável por iniciar a busca de um filme pela query informada
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validalção para verificar se o usuário digitou algo
    if(query.trim().length === 0) return

    // Redirecionando o usuário para a página de Search com a 'query string' da palavra digitada para busca
    navigate(`/search?q=${query}`)

    // Limpando o campo de pesquisa
    setQuery("")
  }

  return (
    <nav id={styles.navbar}>
      <h2>
        <Link to="/">
          <BiCameraMovie /> MoviesLib
        </Link>
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Busque um filme"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
          value={query}
        />
        <button type="submit">
          <BiSearchAlt2 />{" "}
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
