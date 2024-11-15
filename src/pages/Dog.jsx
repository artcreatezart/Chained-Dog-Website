import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import PageHeader from '../components/PageHeader';
import { MdFamilyRestroom, MdOutlinePets } from "react-icons/md";
import Seo from '../components/Seo';

const baseURL = import.meta.env.VITE_WP_API_BASEURL;

const DogUpdates = ({dog}) => {
  const [taxonomies, setTaxonomies]= useState([]);

  useEffect(() => {
    if(!dog) {
      return;
    }

    const taxonomyEndpoint = dog._links['wp:term'][0].href;

    axios.get(`${taxonomyEndpoint}`)
    .then((res) => {
      setTaxonomies(res.data);
    })
    .catch((err) => console.log(err))
  }, [dog])

  const renderedTaxonomies = taxonomies.map((taxonomy, index) => {
    return (
      <Link to={`/dogUpdate/${taxonomy.id}`} key={index}>
        <span className='taxonomy-term-pill'>
          {taxonomy.name}
        </span>
      </Link>
    )
  });

  return (
    <div>
      {renderedTaxonomies}
    </div>
  )
}

const Dog = () => {
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

  const endpoint = `${baseURL}/dogs/${id}?_embed`;

  useEffect(() => {
    axios.get(`${endpoint}`)
    .then((res) => {
      setDog(res.data);
      setLoading(false);
    })
    .catch((err) => console.log(err))
  }, []);

  function getFeaturedImage(dog) {
    if (dog && dog._embedded && dog._embedded['wp:featuredmedia'] && dog._embedded['wp:featuredmedia'][0].source_url) {
        return dog._embedded['wp:featuredmedia'][0].source_url;
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
        title={dog.yoast_head_json?.title || dog.title.rendered}
        description={dog.yoast_head_json?.description}
        image={dog.yoast_head_json?.og_image?.[0]?.url}
        url={window.location.href}
      />
      <PageHeader title={dog.title.rendered} image_url={getFeaturedImage(dog)}/>
      <div className='total-dog-container'>
      <div key={dog.slug} className='dog-post-container'>
        <div className='top-container-dog'>
          <h4>{dog.title.rendered}</h4>
          <div className='descriptive-info'>
            <h3>Breed: {dog.acf.breed}</h3>

            <h3>Born: {dog.acf.dateOfBirth}</h3>

            <h3>{dog.acf.gender}</h3>

            <h3>{dog.acf.size}</h3>

          </div>
          <div className='secondary-button'>
            <DogUpdates dog={dog} className='secondary-button'/>
          </div>
          
        </div>
        <div className="icon">
          <div className='icon-descript'>
            <MdFamilyRestroom
              style={{
              color: dog.acf?.friendly_with_young_families ? '#4b7b3f' : 'grey',
              }}
            />
            <p>
              {dog.acf?.friendly_with_young_families 
                ? 'Dog is friendly with young families' 
                : 'Dog is NOT friendly with young families'}
            </p>

          </div>

          <div className='icon-descript'>
            <MdOutlinePets
              style={{
              color: dog.acf?.friendly_with_other_animals ? '#4b7b3f' : 'grey',
              }}
            />

            <p>
              {dog.acf?.friendly_with_other_animals  
                ? 'Dog is friendly with other animals' 
                : 'Dog is NOT friendly with other animals'}
            </p>
          </div>
            
            
        </div>
        <div className='button-container'>       
          <button className='secondary-button'>Frequently Asked Questions</button>
          <button className='primary-button'>Apply To Adopt Now</button>
        </div>

      </div>
      <div className='dog-post-container-info'>
        
        <div dangerouslySetInnerHTML={{__html: dog.content.rendered}} className='img-descript'/>
        

      </div>
      </div>
     
      
    </>
  )
}

export default Dog
