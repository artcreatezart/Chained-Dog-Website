import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import PageHeader from '../components/PageHeader';
import { Helmet } from 'react-helmet';
// Import REACT HELMET

const baseURL = import.meta.env.VITE_WP_API_BASEURL;

const Blog = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();
  const [seoData, setSeoData] = useState(null); // YOAST DATA

  const endpoint = `${baseURL}/blogs/${id}?_embed`;

  useEffect(() => {
    axios.get(`${endpoint}`)
    .then((res) => {
      setBlog(res.data);
      setSeoData(res.data.yoast_head_json); // Set Yoast Data
      setLoading(false);
    })
    .catch((err) => console.log(err))
  }, []);

  function getFeaturedImage(blog) {
    if (blog && blog._embedded && blog._embedded['wp:featuredmedia'] && blog._embedded['wp:featuredmedia'][0].source_url) {
        return blog._embedded['wp:featuredmedia'][0].source_url;
    } else {
        return 'https://via.placeholder.com/150';
    }
}

  if (loading) {
    return <>Loading...</>
  }

  return (
    <>
      {/* Helmet contain all meta data */}
      <Helmet>
        {/* Basic SEO */}
        <title>{blog.title.rendered}</title>
        {seoData?.description && <meta name='description' content={seoData.description}></meta>}
      </Helmet>

      <PageHeader title={blog.title.rendered} image_url={getFeaturedImage(blog)}/>
      <div key={blog.slug} className='blog-post-container'>
        <div className='left-event-blog-container'>
          <h4>{blog.title.rendered}</h4>
          <img src={getFeaturedImage(blog)} alt={blog.title.rendered + 'image'} className='blog-image'/>
        </div>
        <div className='right-event-blog-container'>
          <div className='border-post'>
            <div dangerouslySetInnerHTML={{__html: blog.content.rendered}}/>
          </div>

        </div>
        
      </div>
    </>
  )
}

export default Blog
