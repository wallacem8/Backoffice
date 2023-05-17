import React from "react";

import { NavLink } from "react-router-dom";

import styles from "./Sidebar.module.css";
import { useAuth } from "../../../contexts/AuthContext";

const Sidebar = () => {
    const { logout } = useAuth();

    return (
        <div className={styles.sidebar}>
            <nav className={styles.navigation}>
                
                <ul>
                    <li>
                        <NavLink to="/">
                            <h3>Home</h3>
                        </NavLink>
                    </li>
                </ul>

                <h3>Curriculo</h3>
                <ul>
                    <li>
                        <NavLink to="/curriculo/informacoes/cadastro">
                            Cadastrar Informações
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/curriculo/experiencia/cadastro">
                            Cadastrar Experiência
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/curriculo/experiencia/lista">
                            Lista de Experiência
                        </NavLink>
                    </li>
                </ul>

                <h3>Portfólio</h3>
                <ul>
                    <li>
                        <NavLink to="/portfolio/cadastro">
                            Cadastrar Portfólio
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/portfolio/lista">
                            Lista de Portfólios
                        </NavLink>
                    </li>
                </ul>

                <ul>
                    <li>
                        <NavLink onClick={logout} to="/login">
                            <h3>Logout</h3>
                        </NavLink>
                    </li>
                </ul>

            </nav>
        </div>
    );
};

export default Sidebar;