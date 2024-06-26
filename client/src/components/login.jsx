import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth'

export default function Login(props){
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN);
  
    // update state based on form input changes
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormState({
        ...formState,
        [name]: value,
      });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
          const { data } = await login({
            variables: { ...formState },
          });
    
          Auth.login(data.login.token);


        } catch (e) {
          console.error(e);
        }
    
        // clear form values
        setFormState({
          username: '',
          email: '',
          password: '',
        });
      };
      return (
        <div className='login-container'>
          <div >
            <div >
              <div >
                <h4 >Login</h4>
                {data ? (
                  <p>
                    Success! You may now head{' '}
                    <Link to="/">back to the homepage.</Link>
                  </p>
                ) : (
                  <form  onSubmit={handleFormSubmit}>
                    <input
                      placeholder="Your username"
                      name="username"
                      type="username"
                      value={formState.username}
                      onChange={handleChange}
                    />
                    <input
                      placeholder="Your email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                    />
                    <input
                      placeholder="******"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange}
                    />
                    <button
                      style={{ cursor: 'pointer' }}
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                )}
    
                {error && (
                  <div className="">
                    {error.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );


};