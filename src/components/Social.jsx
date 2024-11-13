import React from 'react';

const baseURL = import.meta.env.VITE_WP_API_BASEURL;

const Social = ({ socials = [] }) => {
    const mappedSocials = socials.map((social, index) => {
        function getFeaturedImage(social) {
            if (
                social &&
                social._embedded &&
                social._embedded['wp:featuredmedia'] &&
                social._embedded['wp:featuredmedia'][0].source_url
            ) {
                return social._embedded['wp:featuredmedia'][0].source_url;
            } else {
                return 'https://via.placeholder.com/150';
            }
        }
        return (
            <div key={social.slug + '-' + index} className="social-container">
                
                <a 
                    href={social.acf?.link_to_social} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className='social-img-hover'
                >
                    <img
                    src={getFeaturedImage(social)}
                    alt={social.title?.rendered || "Social"}
                />
                </a>
                
            </div>
        );
    });

    return <>{mappedSocials}</>;
};

export default Social;
