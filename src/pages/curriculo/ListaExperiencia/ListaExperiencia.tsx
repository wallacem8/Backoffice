import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./ListaExperiencia.module.css"
import {Experiencia, deleteExperiencia, getExperiencia } from "../../../services/experienciaService";

const ListaExperiencia: React.FC = () => {
    const navigate = useNavigate();

    const [experiencias, setExperiencias] = React.useState<Experiencia[]>([]);

    const fetchExperiencias = async () => {
        try {
            const experiencias = await getExperiencia()
            setExperiencias(experiencias);
        } catch (error) {
            console.log('Erro ao buscar experiências', error);
        }
    };

    useEffect(() => {
        fetchExperiencias();
    }, []);
    
    const handleEdit =  (experiencia: Experiencia) => {
        navigate('/curriculo/experiencia/cadastro', {state: experiencia});
    }
       
    const handleDelete = async (id: number) => {
        try {
            await deleteExperiencia(id);
            fetchExperiencias();
            alert('Experiência excluída com sucesso!');
        } catch (error) {
            console.log('Erro ao excluir experiência', error);
            alert('Error ao excluir experiência.');
        }
    }



    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Descrição</th>
                    <th>Tipo</th>
                    <th>Ano Início</th>
                    <th>Ano Fim</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {experiencias.map((experiencia, index) => (
                    <tr key={index}>
                        <td>{experiencia.titulo}</td>
                        <td>{experiencia.descricao}</td>
                        <td>{experiencia.tipo}</td>
                        <td>{experiencia.anoInicio}</td>
                        <td>{experiencia.anoFim}</td>
                        <td>
                            <button onClick={() => handleEdit(experiencia)}>Editar</button>
                            <button onClick={() => handleDelete(experiencia.id)}>Excluir</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ListaExperiencia;