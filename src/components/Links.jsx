import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Dogs from '../pages/Dogs'
import Job from '../pages/Job'
import DogUpdates from '../pages/DogUpdates'

import Dog from '../pages/Dog'
import Products from '../pages/Products'
import ShopCategories from '../pages/ShopCategory'
import Cart from '../pages/Cart'
import Contact from '../pages/Contact'
import Blog from '../pages/Blog'
import Event from '../pages/Event'

const Links = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/dogs' element={<Dogs/>}/>
            <Route path='/dogs/:id' element={ <Dog/> }/>
            <Route path='/shopCategories' element={ <ShopCategories/> }/>
            <Route path='/job' element={<Job/>}/>
            <Route path='/dogUpdate/:id' element={ <DogUpdates/> }/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path="/category/:categoryId" element={<Products />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/event/:id" element={<Event />} />
        </Routes>
    )
}

export default Links