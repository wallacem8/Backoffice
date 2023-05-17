import React, { useEffect, useState } from "react";

import styles from "./ListaPortfolio.module.css";
import { Portfolio, deletePortfolio, getPortfolio, updatePortfolio } from "../../../services/portfolioService";
import { useNavigate } from "react-router-dom";



const ListaPortfolio: React.FC = () => {
    const navigate = useNavigate();

    const [portfolio, setPortfolio] = useState<Portfolio[]>([]);

    const fetchPortfolio = async () => {
        try {
            const portfolios = await getPortfolio();
            setPortfolio(portfolios);
            console.log(portfolios);
        } catch (error) {
            console.log("Erro ao buscar portfolios", error);
        }
    };

    useEffect(() => {
        fetchPortfolio();
    }, [])

    const handleEdit = async (portfolio: Portfolio) => {
        navigate('/portfolio/cadastro', { state: portfolio});
    };

    const handleDelete = async (id: number) => {
        try {
            await deletePortfolio(id);
            fetchPortfolio();
            alert('Portfólio excluído com sucesso!');
        } catch (error) {
            console.log('Erro ao excluir portfólio', error);
            alert('Erro ao excluir portfólio');

        }
    }

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Imagem</th>
                    <th>Link</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {portfolio.map((itemPortfolio, index) => (
                    <tr key={index}>
                        <td>{itemPortfolio.title}</td>
                        <td><img src={itemPortfolio.image} alt={itemPortfolio.title} className={styles.image} /></td>
                        <td><a href={itemPortfolio.link} target="_blank" rel="noreferrer">{itemPortfolio.link}</a></td>
                        <td>
                            <button onClick={() => handleEdit(itemPortfolio)}>Editar</button>
                            <button onClick={() => handleDelete(itemPortfolio.id)}>Excluir</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ListaPortfolio;