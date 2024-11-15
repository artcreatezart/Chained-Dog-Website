import PageHeader from '../components/PageHeader'
import ContactForm from '../components/ContactForm';
import Sponsors from '../components/Sponsors';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Seo from '../components/Seo';
import Social from '../components/Social';

const baseURL = import.meta.env.VITE_WP_API_BASEURL;

const Contact = () => {
  const [sponsors, setSponsors] = useState(null);
  const [socials, setSocials] = useState(null);
  const [loading, setLoading] = useState(true);

  const sponsorsEndpoint = `${baseURL}/sponsors?_embed`;
  const socialsEndpoint = `${baseURL}/social?_embed`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sponsorsRes] = await Promise.all([
          axios.get(sponsorsEndpoint)
        ]);
        const [socialsRes] = await Promise.all([
          axios.get(socialsEndpoint)
        ]);

        setSponsors(sponsorsRes.data);
        setSocials(socialsRes.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Seo 
            title='Contact - My First Formative WP'
            description='Get Into Contact with Us! We cant wait to hear from you'
            url={window.location.href}
      />
      <PageHeader title='Contact' image_url='/header-bg-imgs/bgimg1.jpg'/>
      <div className='contact-form-container'>
        <h1>Get In Touch</h1>
        <ContactForm/>
      </div>
      <h1 className='socials-header'>Socials</h1>
      <div id='socialsPosts'>
        
        { loading ? <p>Loading...</p> : <Social socials={socials}/>}

      </div>
      <h1 className='sponsors-header'>Sponsors</h1>
      <div id='sponsorsPosts'>
        
        { loading ? <p>Loading...</p> : <Sponsors sponsors={sponsors}/>}

      </div>

      
    </>
  )
}

export default Contact
