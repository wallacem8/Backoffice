import { Form, Formik } from "formik";
import React from "react";

import styles from "./CadastrarPortfolio.module.css";

import * as Yup from "yup";
import Input from "../../../components/forms/Input";
import { Portfolio, createOrUpdatePortfolio} from "../../../services/portfolioService";
import { useLocation, useNavigate } from "react-router-dom";


const CadastrarPortfolio: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const portfolio = location.state as Portfolio;
    
    const initialValues: Portfolio = {
        id: 0,
        link: "",
        image: "",
        title: "",
    }
    
    const validationSchema = Yup.object().shape({
        link: Yup.string().required("Campo obrigatório"),
        image: Yup.string().required("Campo obrigatório"),
        title: Yup.string().required("Campo obrigatório")
    });

    const onSubmit = async (values: Portfolio, {resetForm}: {resetForm: () => void}) => {
        try {
            await createOrUpdatePortfolio(values);
            console.log(values);
            resetForm();
            navigate('/portfolio/lista');
            alert("Formulário enviado com sucesso!");
        } catch (error) {
            console.log(error);
            alert("Ocorreu um erro ao enviar formulário. Tente novamente")
        }
    };

    return(
        <div className={styles.formWrapper}>
            <Formik
                initialValues={ portfolio || initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
            {({ errors, touched}) => (
                <Form className={styles.form}>
                    <h2 className={styles.title}>Cadastro de Portfólio</h2>
                    <Input
                        label="link"
                        name="link"
                        errors={errors.link}
                        touched={touched.link}
                    />

                    <Input
                        label="Imagem"
                        name="image"
                        errors={errors.image}
                        touched={touched.image}
                    />

                    <Input 
                        label="Título"
                        name="title"
                        errors={errors.title}
                        touched={touched.image}
                    />
                    <button type="submit" className={styles.button}>Enviar</button>
                </Form>
            )}
            </Formik>
        </div>
    );
};

export default CadastrarPortfolio;