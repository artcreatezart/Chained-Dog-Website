import { useState, useEffect } from 'react';
import axios from 'axios';
import PageHeader from '../components/PageHeader';
import Seo from '../components/Seo';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Job = () => {
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState(null);

    const endpoint = `${baseUrl}/jobs?_embed`;

    useEffect(() => {
        axios.get(`${endpoint}`)
            .then((res) => {
                setJobs(res.data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, [])

    function getFeaturedImage(job) {
        if (job && job._embedded && job._embedded['wp:featuredmedia'] && job._embedded['wp:featuredmedia'][0].source_url) {
            return job._embedded['wp:featuredmedia'][0].source_url;
        } else {
            return 'https://via.placeholder.com/150';
        }
    }

    const Jobs = ({jobs}) => {
        const mappedJobs = jobs.map((job, index) => {
            return (
                <div key={job.slug + "-" + index} className='jobs-container'>
                    <img src={getFeaturedImage(job)} alt={job.title.rendered + 'image'} className='job-image'/>
                    <h4 className='title'>{job.title.rendered}</h4>
                    
                    <div dangerouslySetInnerHTML={{__html: job.content.rendered}}/>
                </div>
            )
        });

        return (
            <>
                {mappedJobs}
            </>
        )
    }



    return (
        <>
            <Seo
                title='Meet The Team - My First Formative WP'
                description='Meet our Team and get to know us!'
                url={window.location.href}
            />

            <PageHeader title="Meet The Team" image_url="/header-bg-imgs/bgimg6.jpg" />
            <div id="jobContainer">
                {loading ? <p>Loading....</p> : <Jobs jobs={jobs}/>}
            </div>
        </>
    )
}

export default Job