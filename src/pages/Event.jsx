import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PageHeader from '../components/PageHeader';
import Seo from '../components/Seo';

const baseURL = import.meta.env.VITE_WP_API_BASEURL;

const Event = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

  const endpoint = `${baseURL}/events/${id}?_embed`;

  useEffect(() => {
    axios.get(`${endpoint}`)
    .then((res) => {
      setEvent(res.data);
      setLoading(false);
    })
    .catch((err) => console.log(err))
  }, []);

  function getFeaturedImage(event) {
    if (event && event._embedded && event._embedded['wp:featuredmedia'] && event._embedded['wp:featuredmedia'][0].source_url) {
        return event._embedded['wp:featuredmedia'][0].source_url;
    } else {
        return 'https://via.placeholder.com/150';
    }
}

  if (loading) {
    return <>Loading...</>
  }

  return (
    <>
      <Seo
        title={event.yoast_head_json?.title || event.title.rendered}
        description={event.yoast_head_json?.description}
        image={event.yoast_head_json?.og_image?.[0]?.url}
        url={window.location.href}
      />
      <PageHeader title={event.title.rendered} image_url={getFeaturedImage(event)}/>
      <div key={event.slug} className='event-post-container'>
        <h4>{event.title.rendered}</h4>
        <img src={getFeaturedImage(event)} alt={event.title.rendered + 'image'} className='event-image'/>
        <div dangerouslySetInnerHTML={{__html: event.content.rendered}}/>
      </div>
    </>
  )
}

export default Event
