import { useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import PageHeader from '../components/PageHeader';
import Seo from '../components/Seo';

const baseURL = import.meta.env.VITE_WP_API_BASEURL;

const DogUpdatesPosition = ({dogUpdates}) => {
  return(
    <div className='header-dogs'>
      <h1>All Dogs</h1>
      <h3>{dogUpdates.name}</h3>
    </div>
  )
};

const AllDogsInUpdate = ({params}) => {
  const [dogs, setDogs] = useState([]);

  const endpoint = `${baseURL}/dogs?dogupdate=${params.id}&_embed`

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
    })
    .catch((err) => console.log(err))
  }, [endpoint]);

  const renderedDogs = dogs.map((dog, index) => {
    return (
      <div className='dogs-container' key={index}>
        <img src={getFeaturedImage(dog)} alt={dog.title.rendered + 'image'} className='dog-image'/>
        <Link to={`/dogs/${dog.id}`}> 
          <h4 className='secondary-button'>{dog.title?.rendered}</h4>
        </Link>

      </div>
    )
  });

  return (
    <>
      {renderedDogs}
    </>
  )
}

const DogUpdates = () => {

  const [dogUpdates, setDogUpdates] = useState({});
  const params = useParams();

  const dogUpdatesEndpoint = `${baseURL}/dogUpdate/${params.id}`

  useEffect(() => {
    axios.get(`${dogUpdatesEndpoint}`)
    .then((res) => {
      setDogUpdates(res.data);
    })
    .catch((err) => console.log(err))
  }, [dogUpdatesEndpoint])

  return (
    <>
      <Seo
        title={dogUpdates.yoast_head_json?.title || dogUpdates.title?.rendered}
        description={dogUpdates.yoast_head_json?.description}
        image={dogUpdates.yoast_head_json?.og_image?.[0]?.url}
        url={window.location.href}
      />
      <div>
        <PageHeader  image_url='/header-bg-imgs/bgimg3.jpg'/>
        <DogUpdatesPosition dogUpdates={dogUpdates}/>
        {/* OCntainers all artists */}
        <div id='dogContainer'>
          <AllDogsInUpdate params={params}/>
        </div>
      </div>
    </>
    
  )
}

export default DogUpdates
