import React from "react";

const Events = ({events}) => {
    const mappedEvents = events.map((event, index) => {
      function getFeaturedImage(event) {
        if (
          event && 
          event._embedded &&
          event._embedded[ 'wp:featuredmedia' ] &&
          event._embedded[ 'wp:featuredmedia' ][0].source_url
        ) {
          return event._embedded[ 'wp:featuredmedia' ][0].source_url;
        } else {
          return 'https://via.placeholder.com/150';
        }
      }

      return (
        <div key={event.slug + '-' + index} className='event-container'>
          <img src={getFeaturedImage(event)} alt={ event.title.rendered } />
          <h4 className='title'>{event.title.rendered}</h4>
          <li key={Events.slug + '-' + index}>
            <a href={`#/event/${event.id}`} className='secondary-button'>Read More</a>
          </li>
        </div>
      )
    });
    return ( 
      <>
        { mappedEvents }
      </>
    )
  }

export default Events
