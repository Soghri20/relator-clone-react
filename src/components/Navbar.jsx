import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import useAuthStatus from '../hooks/useAuthStatus';

const Navbar = () => {
    const {usering}=useAuthStatus()
    const location = useLocation();
    const navigate = useNavigate()

    function pathMathRoute(route){
        if(route===location.pathname){
            return true
        }
    }
  return (
    <div className='bg-white border-b shadow-sm  sticky top-0 z-50 py-4'>
        <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'> 
            <div>
                 <img className='h-5 cursor-pointer' onClick={()=>navigate('/')} src='https://static.rdc.moveaws.com/rdc-ui/logos/logo-brand.svg' />
            </div>
            <div>
                <ul className='flex space-x-10'>
                    <li onClick={()=>navigate('')} className={pathMathRoute('/') ? 'text-sm font-semibold text-black-400 text-red-500 cursor-pointer' : 'cursor-pointer text-sm font-semibold text-gray-400 border-b-transparent'}>Home</li>
                    <li onClick={()=>navigate('/offers')} className={pathMathRoute('/offers') ? 'text-sm font-semibold text-black-400  cursor-pointer' : ' cursor-pointer text-sm font-semibold text-gray-400 border-b-transparent'}>Offers</li>
                    <li onClick={()=>navigate('/profile')}  className={pathMathRoute('/signin')|| pathMathRoute('/profile') ? 'text-sm font-semibold text-black-400 text-red-500 cursor-pointer' : ' cursor-pointer text-sm font-semibold text-gray-400 border-b-transparent'}>
                        {usering ? 'Profile': 'Sign In'}
                    </li>
                </ul>
            </div>
        </header>
    </div>
  )
}

export default Navbar
