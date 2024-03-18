import { useState } from 'react'; // import the useState hook from React
import { Form, Button, Alert } from 'react-bootstrap'; // import the Form, Button, and Alert components from React Bootstrap

import { useMutation } from '@apollo/client'; // import the useMutation hook from the Apollo Client
import { LOGIN_USER } from '../utils/mutations'; // import the LOGIN_USER mutation from the mutations file in the utils folder

import Auth from '../utils/auth'; // import the Auth module from the utils folder

// create the LoginForm component to handle user logins
const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' }); // set initial form state
  const [validated] = useState(false); // set state for form validation
  const [showAlert, setShowAlert] = useState(false); // set state for alert
  const [loginUser, { error }] = useMutation(LOGIN_USER); // use mutation for logging in a user

  // create method to handle user input changes and update the component state
  const handleInputChange = (event) => {
    const { name, value } = event.target; // destructure the name and value properties from the event.target
    setUserFormData({ ...userFormData, [name]: value }); // set the form state for the appropriate input field
  };

  // create method to handle form submission and log the user in
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // prevent the default form action
    const form = event.currentTarget; // check if form has everything (as per react-bootstrap docs)

    if (form.checkValidity() === false) { // check if the form is valid
      event.preventDefault(); // prevent the default form action
      event.stopPropagation(); // stop the form propagation
    }

    try { // try to execute the loginUser mutation
      const { data } = await loginUser({ // destructure the data object from the loginUser mutation
        variables: { ...userFormData }, // pass the userFormData object to the mutation as variables
      });

      Auth.login(data.login.token); // log the user in by passing the token from the mutation to the Auth.login method
    } catch (err) { // catch any errors and log them to the console
      console.error(err); // log the error to the console
      setShowAlert(true); // set the showAlert state to true
    }

    setUserFormData({ // reset the form state
      username: '', // reset the username to an empty string
      email: '', // reset the email to an empty string
      password: '', // reset the password to an empty string
    });
  };

  // return the JSX for the LoginForm component with a Form, Alert, Form.Group, Form.Label, Form.Control, and Button
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;