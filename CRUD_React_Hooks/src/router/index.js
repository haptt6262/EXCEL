import {BrowserRouter , Routes , Route } from 'react-router-dom';
import * as pages from '../pages'

export default function Navbar() {
    return(
       <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<pages.ItemPage/>}/>
                </Routes>
            </BrowserRouter>
       </div>
    )
}