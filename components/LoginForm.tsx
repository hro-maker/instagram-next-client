import { InputLabel, Input, FormHelperText } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { validatee } from './../utiles/validate';

const LoginForm = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: (values) => {
            return validatee(values)
        },
        onSubmit: values => {
            console.log(values)
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} >
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input
            className="login_input"
                value={formik.values.email}
                onChange={formik.handleChange}
                id="email"
                aria-describedby="email-helper" />
            <div
            className="form_helper"
            id="email-helper">
                {formik.errors.email && formik.touched.email && formik.errors.email
                }</div>

            <InputLabel htmlFor="password">password</InputLabel>
            <Input
               className="login_input"
                value={formik.values.password}
                onChange={formik.handleChange}
                type="password"
                id="password"   
                aria-describedby="password-helper" />
            <div
            className="form_helper"
            id="password-helper">
                {formik.errors.password && formik.touched.password && formik.errors.password
                }</div>
            <button className="login_btn" type="submit">Log in</button>
        </form>
    );
}

export default LoginForm;
