import { useState } from 'react';
import axios from 'axios';
import { TiTick } from "react-icons/ti";
import { TfiFaceSad } from "react-icons/tfi";

const formEndpoint = import.meta.env.VITE_APP_WP_API_FORM_ENDPOINT;

const ContactForm = () => {
    const [submitted, setSubmitted] = useState( false );
    const [error, setError] = useState( false );
  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const contactForm = new FormData();
  
      contactForm.append('your-name', name);
      contactForm.append('your-email', email);
      contactForm.append('your-message', message);
      axios.post(formEndpoint, contactForm, {
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      .then(( response ) => {
        console.log( response );
        setSubmitted( true );
      }) 
      .catch(( error ) => {
        console.log( error );
        setError( true );
      });
    }
  
    if ( submitted ) {
      //return success message
      return (
        <>
          <div className='success-text'>
            <h3><TiTick /> Thank You!</h3>
            <p>We appreciate you contacting us! We will be in touch soon.</p>
          </div>
        </>
        
      )
    }
  
    if ( error ) {
      return (
        <>
          <div className='error-text'>
            
            <h3><TfiFaceSad /> Error</h3>
            <p>Sorry! We were unable to send your message<br/><br/>Please try again soon</p>
            
          </div>
        </>
        
      )
    }
  
    // Form:
    return (
      <form 
        onSubmit={ handleSubmit }
        method='POST'
        className='contact-form'
      >
        <div  className='input'>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            name='name'
            onChange={( event ) => setName( event.target.value )}
            value={ name }
            required
          />
        </div>
  
        <div className='input'>
          <label htmlFor='email'>Email:</label>
          <input 
          type='email'
          name='email'
          onChange={( event ) => setEmail(event.target.value)}
          value={ email }
          required />
        </div>
  
        <div className='input'>
          <label htmlFor='message'>Message:</label>
          <textarea 
            name='message'
            onChange={( event ) => setMessage( event.target.value )}
            value={ message }
            required
          />
        </div>
  
        <div>
          <button
            className='primary-button'
            type='submit'
          >
            Send Message
          </button>
        </div>
  
      </form>
    )
  }

  export default ContactForm