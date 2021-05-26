import { InputLabel, Input } from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";

const SignupForm = ({values,labels,validatee,btn="Log in"}:any) => {
    const formik = useFormik({
        initialValues: values,
        validate: (values) => {
            return validatee(values)
        },
        onSubmit: values => {
            console.log(values)
            formik.values=values
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} >
           {Object.keys(formik.values).map(el=>
            <div key={el}>
            <Input
            className="login_input"
                value={formik.values[el]}
                onChange={formik.handleChange}
                id={el}
                placeholder={labels[el]}
                aria-describedby="email-helper" />
            <div
            className="form_helper"
            id="email-helper">
                {formik.errors[el] && formik.touched[el]&& formik.errors[el]
                }</div>
            </div>
            
            )}
            <button className="login_btn" type="submit">{btn}</button>
        </form>
    );
}

export default SignupForm;