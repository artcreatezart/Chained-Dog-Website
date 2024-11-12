import { useEffect, useState } from 'react'
import axios from 'axios';
import Blogs from '../components/Blogs';
import Events from '../components/Events'
import HomeHeader from '../components/HomeHeader';
// SEO
import Seo from '../components/Seo';

// Bring in endpoint from the env file
const baseURL = import.meta.env.VITE_WP_API_BASEURL;

const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);

  const blogsEndpoint = `${baseURL}/blogs?_embed`;
  const eventsEndpoint = `${baseURL}/events?_embed`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsRes, eventsRes] = await Promise.all([
          axios.get(blogsEndpoint),
          axios.get(eventsEndpoint)
        ]);

        setBlogs(blogsRes.data);
        setEvents(eventsRes.data);
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
        title='Home - My First Formative WP'
        description='Browse my amazing Wordpress Post for my custom site'
        url={window.location.href}
      />
    <div id='homeContainer'>
      <HomeHeader title='Chained Dog Rehibilibatiation and Rehoming' image_url='/header-bg-imgs/bgimg2.jpg'/>
      <div className='home-post-container'>
        <div className='blog-container'>
          <h2>Blog</h2>
          <div id='blogPosts'>
            { loading ? <p>Loading...</p> : <Blogs blogs={blogs}/>}

          </div>

        </div>
        <div className='event-home-container'>
          <h2>Upcoming Events</h2>
          <div id='eventPosts'>
            { loading ? <p>Loading...</p> : <Events events={events}/>}

          </div>

        </div>

      </div>
      

    </div>
    </>
  )
}

export default Home
