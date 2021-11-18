
import './App.css';
import React, { useState } from 'react';
import {Form,Button} from 'semantic-ui-react'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'

function App() {
 
  
      const [values,setValues] =useState({
          name:"",
          email:"",
          phoneNumber:"",
  
      })
  
      const onChange=(event)=>{
          setValues({...values, [event.target.name]: event.target.value})
      }
      const [addUser, {loading}] =useMutation(Register_user,{
        update(proxy, result)
        {
          console.log(result)
        },
        variables:values
      })
  
       const onSubmit =(event)=>{
           event.preventDefault();
           addUser()
       }
  
  
      return(
          <div className="App">
         <Form onSubmit={onSubmit} noValidate>
             <h1>Register</h1>
             <Form.Input
             label="name"
             name="name"
             type="text"
             value ={values.name}
             onChange={onChange}
             />
             <Form.Input
             label="Email"
             name="email"
             type="email"
             value ={values.email}
             onChange={onChange}
             />
             <Form.Input
             label="PhoneNumber"
             name="phoneNumber"
             type="text"
             value ={values.phoneNumber}
             onChange={onChange}
             />
  
             <Button type="submit" primary>Submit</Button>
         </Form>
        
          </div>
      )
  }

  const Register_user =gql`
  
   mutation register(
     $name: String!
     $email: String!
     $phoneNumber: String!

   ){
     register(
       getpost: {
         name: $name
         email: $name
         phoneNumber: $name

       }
     )
   }

  `

export default App;
