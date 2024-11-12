import React from "react";
import { formatDistanceToNow } from 'date-fns';

const Blogs = ({blogs}) => {
    const mappedBlogs = blogs.map((blog, index) => {
      function getFeaturedImage(blog) {
        if (
          blog && 
          blog._embedded &&
          blog._embedded[ 'wp:featuredmedia' ] &&
          blog._embedded[ 'wp:featuredmedia' ][0].source_url
        ) {
          return blog._embedded[ 'wp:featuredmedia' ][0].source_url;
        } else {
          return 'https://via.placeholder.com/150';
        }
      }

      return (
        <div key={blog.slug + '-' + index} className='post-container'>
          <div className='key-info-post'>
            <img src={getFeaturedImage( blog )} alt={ blog.title.rendered } />
          </div>
          <div className='other-info-post'>
            <div>
              <h4 className='title'>{blog.title.rendered}</h4>
              <p className="date-text">{ formatDistanceToNow(blog.date, { addSuffix: true }) }</p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: blog.excerpt.rendered }} />
            <li key={Blogs.slug + '-' + index}>
              <a href={`#/blog/${blog.id}`} className='secondary-button'>Read More</a>
            </li>
          </div>
          
        </div>
      )
    });
    return ( 
      <>
        { mappedBlogs }
      </>
    )
  }

export default Blogs
