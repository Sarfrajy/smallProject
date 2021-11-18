import React, { useState } from 'react';
import {Form,Button} from 'semantic-ui-react'

function Register()
{
    const [values,setValues] =useState({
        name:"",
        email:"",
        phoneNumber:"",

    })

    const onChange=(event)=>{
        setValues({...values, [event.target.name]: event.target.value})
    }

     const onSubmit =(event)=>{
         event.preventDefault();
     }


    return(
        <div>
       <Form onSubmit={onSubmit} noValidate>
           <h1>Register</h1>
           <Form.Input
           label="name"
           name="name"
           value ={values.name}
           onChange={onChange}
           />
           <Form.Input
           label="Email"
           name="email"
           value ={values.email}
           onChange={onChange}
           />
           <Form.Input
           label="PhoneNumber"
           name="phoneNumber"
           value ={values.phoneNumber}
           onChange={onChange}
           />

           <Button type="submit" primary>Submit</Button>
       </Form>
      
        </div>
    )
}

export default Register;