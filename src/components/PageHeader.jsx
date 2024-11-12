import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";

const PageHeader = ({ title, image_url }) => {
    const navigate = useNavigate();

    const handleBackClick = ( event ) => {
        event.preventDefault();
        navigate( -1 );
    }
  return (
    <div className='header-section' style={{ backgroundImage: `linear-gradient( rgba( 52,	73,	102, 0.4 ), rgba( 52,	73,	102, 0.25 )), url(${ image_url })`}}>
        <p onClick={ handleBackClick } ><IoMdArrowRoundBack />Back</p>
        <h1>{ title }</h1>
    </div>
  )
}

export default PageHeader
