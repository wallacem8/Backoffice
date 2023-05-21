import React from "react";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./CadastrarExperiencia.module.css";
import Input from "../../../components/forms/Input/Input";
import Textarea from "../../../components/forms/textarea/Textarea";
import Select from "../../../components/forms/Select/Select";

import { Experiencia, createOrUpdateExperiencia } from "../../../services/experienciaService";

const CadastrarExperiencia: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const experiencia = location.state as Experiencia;

    const initialValues: Experiencia = {
        id: 0,
        titulo: "",
        descricao: "",
        tipo: "",
        anoInicio: "",
        anoFim: "",
    };

    const validationSchema = Yup.object().shape({
        titulo: Yup.string().required("Campo obrigatório"),
        descricao: Yup.string(),
        tipo: Yup.string().required("Campo obrigatório"),
        anoInicio: Yup.number().required("Campo obrigatório").typeError("Um número é obrigatório"),
        anoFim: Yup.number().required("Campo obrigatório").typeError("Um número é obrigatório"),
    });

    const onSubmit = async (values: Experiencia, { resetForm }: { resetForm: () => void }) => {
        try {
            await createOrUpdateExperiencia(values);
            console.log(values);
            resetForm();
            navigate('/curriculo/experiencia/lista');
            alert("Formulário enviado com sucesso!");
        } catch (error) {
            console.log(error);
            alert("Ocorreu um erro ao enviar o formulário. Tente novamente!")
        }
    };


    return (
        <div className={styles.formWrapper}>
            <Formik
                initialValues={experiencia || initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {({ errors, touched }) => (
                    <Form className={styles.form}>

                        <h2 className={styles.title}>Cadastrar Experiência</h2>

                        <Input
                            label="Título"
                            name="titulo"
                            errors={errors.titulo}
                            touched={touched.titulo}
                        />

                        <Input
                            label="Ano Início"
                            name="anoInicio"
                            errors={errors.anoInicio}
                            touched={touched.anoInicio}
                        />

                        <Input
                            label="Ano Fim"
                            name="anoFim"
                            errors={errors.anoFim}
                            touched={touched.anoFim}
                        />

                        <Select
                            label="Tipo de experiência"
                            name="tipo"
                            options={[
                                { value: "profissional", label: "Profissional"},
                                { value: "academica", label: "Acadêmico"}
                            ]}
                            errors={errors.tipo}
                            touched={touched.tipo}
                        />

                        <Textarea
                            label="Descrição"
                            name="descricao"
                            errors={errors.descricao}
                            touched={touched.descricao}
                        />

                        <button type="submit" className={styles.button}>Salvar</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default CadastrarExperiencia;