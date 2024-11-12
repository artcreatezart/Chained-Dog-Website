import { useState, useEffect } from 'react';
import axios from 'axios';
import PageHeader from '../components/PageHeader';
import Seo from '../components/Seo';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Dogs = () => {
    const [loading, setLoading] = useState(true);
    const [dogs, setDogs] = useState(null);
    const endpoint = `${baseUrl}/dogs?_embed`;

    function getFeaturedImage(dog) {
        if (dog && dog._embedded && dog._embedded['wp:featuredmedia'] && dog._embedded['wp:featuredmedia'][0].source_url) {
            return dog._embedded['wp:featuredmedia'][0].source_url;
        } else {
            return 'https://via.placeholder.com/150';
        }
    }

    useEffect(() => {
        axios.get(`${endpoint}`)
            .then((res) => {
                setDogs(res.data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, [])

    const DogList = ({dogs}) => {
        const mappedDogs = dogs.map((dog, index) => {
            return (
                <div key={dog.slug + "-" + index} className='dogs-container'>
                    <img src={getFeaturedImage(dog)} alt={dog.title.rendered + 'image'} className='dog-image'/>
                    <div className='dog-name-info'>
                        <h4 className='title'>{dog.title.rendered}</h4>
                    </div>
                    
                    <a href={`#/dogs/${dog.id}`} className='secondary-button'>Get To Know me</a>
                </div>

                
            )
        });

        return (
            <>
                {mappedDogs}
            </>
        )
    }

    return (
        <>
            <Seo
                title='Dogs - My First Formative WP'
                description='Meet our Team and get to know us!'
                url={window.location.href}
            />
            <PageHeader title="dogs" image_url="/header-bg-imgs/bgimg1.jpg" />

            <div id='dogContainer'>
                {loading ? <p>Loading....</p> : <DogList dogs={dogs}/>}
            </div>
        </>
    )
}

export default Dogs