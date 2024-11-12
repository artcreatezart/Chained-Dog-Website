import React from "react";

const Sponsors = ({ sponsors = [] }) => {
    const mappedSponsors = sponsors.map((sponsor, index) => {
        function getFeaturedImage(sponsor) {
            if (
                sponsor &&
                sponsor._embedded &&
                sponsor._embedded['wp:featuredmedia'] &&
                sponsor._embedded['wp:featuredmedia'][0].source_url
            ) {
                return sponsor._embedded['wp:featuredmedia'][0].source_url;
            } else {
                return 'https://via.placeholder.com/150';
            }
        }

        return (
            <div key={sponsor.slug + '-' + index} className="sponsor-container">
                <img
                    src={getFeaturedImage(sponsor)}
                    alt={sponsor.title?.rendered || "Sponsor"}
                />
            </div>
        );
    });

    return <>{mappedSponsors}</>;
};

export default Sponsors;
