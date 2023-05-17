import React from "react";

import styles from "./Form.module.css";
import { Formik, FormikHelpers, FormikProps, FormikValues, Form as FormikForm } from "formik";
import * as Yup from "yup";


interface FormProps<T> {
    initialValues: T;
    validationSchema: Yup.ObjectSchema<Partial<T>>;
    onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<void>;
    children: (formikProps: FormikProps<T>) => React.ReactNode;
}

const Form = <T extends FormikValues>({ initialValues, validationSchema, onSubmit, children }: FormProps<T>) => {
    return (

        <div className={styles.formWrapper}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(formikProps) => (
                    <FormikForm className={styles.form}>
                        {children(formikProps)}
                    </FormikForm>
                )}
            </Formik>
        </div>
    );
};

export default Form;