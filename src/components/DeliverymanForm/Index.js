import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const DeliverymanForm = () => {
    /*const validate = (values) => {
        const errors = {};
        //valitade name
        if (!values.name){
            errors.name = 'Campo Obrigatório!!';
        }else{
            if (values.name.length > 20){
                errors.name = "Deve conter no Máximo 20 caracteres"
            }
        }
        //validate email
        if (!values.email){
            errors.email = 'Campo Obrigatório!!';
        }else {
            if (!/^[A-Z0-9_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
                errors.email = 'E-mail Inválido'
            }
        }
        //validate CPF
        if (!values.CPF){
            errors.CPF = 'Campo Obrigatório!!';
        }else {
            if (!/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/.test(values.CPF)){
                errors.CPF = 'CPF Inválido'
            }
        }
        //validate RG
        if (!values.RG){
            errors.RG = 'Campo Obrigatório!!';
        }else {
            if (!/^[0-9]{2}\.[0-9]{3}\.[0-9]{3}-[0-9XY]{1}$/.test(values.RG)){
                errors.RG = 'RG Inválido'
            }
        }
        //validate telephone
        if (!values.telephone){
            errors.telephone = 'Campo Obrigatório!!';
        }else {
            if (!/^\(?([0-9]{2})?\)?\s?[0-9]{5}-[0-9]{4}$/.test(values.telephone)){
                errors.telephone = 'telefone Inválido'
            }
        }
        return errors;
    }*/
    
    const formik = useFormik({
        initialValues: {
            name:"",
            email:"",
            CPF:"",
            RG:"",
            Telephone:""
        },
        validationSchema: yup.object({
            name: yup.string().required('Campo Obrigatorio!!'),
            email: yup.string().email('E-mail Inválido' ).required('Campo Obrigatorio!!'),
            CPF: yup.string().required('Campo Obrigatorio!!').matches(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/, {message: 'Formato de Cpf Inválido'}),
            RG: yup.string().required('Campo Obrigatorio!!').matches(/^[0-9]{2}\.[0-9]{3}\.[0-9]{3}-[0-9XYxy]{1}$/, {message: 'Formato de Rg Inválido'}),
            telephone: yup.string().required('Campo Obrigatorio!!').matches(/^\(?([0-9]{2})?\)?\s?[0-9]{5}-[0-9]{4}$/, {message: 'Formato de Telefone Inválido'}),
        }),
        onSubmit: (Values) => {
            alert(JSON.stringify(Values, null, 2));
        }
    });


    return(
        <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="name">Nome: </label>
                    <input 
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? <label htmlFor="name">{formik.errors.name}</label> : null}
                </div>
                <div>
                    <label htmlFor="email">E-mail: </label>
                    <input 
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                     {formik.touched.email && formik.errors.email ? <label htmlFor="email">{formik.errors.email}</label> : null}
                </div>
                <div>
                    <label htmlFor="CPF">CPF: </label>
                    <input 
                        id="CPF"
                        name="CPF"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.CPF}
                    />
                     {formik.touched.CPF && formik.errors.CPF ? <label htmlFor="CPF">{formik.errors.CPF}</label> : null}
                </div>
                <div>
                    <label htmlFor="RG">RG: </label>
                    <input 
                        id="RG"
                        name="RG"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.RG}
                    />
                     {formik.touched.RG && formik.errors.RG ? <label htmlFor="RG">{formik.errors.RG}</label> : null}
                </div>
                <div>
                    <label htmlFor="telephone">Telefone: </label>
                    <input 
                        id="telephone"
                        name="telephone"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.telephone}
                    />
                     {formik.touched.telephone && formik.errors.telephone ? <label htmlFor="telephone">{formik.errors.telephone}</label> : null}
                </div>
                <button type="submit">Salvar</button>
            </form>
    );
}

export default DeliverymanForm;