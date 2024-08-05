import React from 'react'
import { useSelector } from 'react-redux'
import LogoutBtn from './LogoutBtn'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Container from '../container/Container'
import Logo from '../Logo'

function Header() {

  const userStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      path: '/',
      active: true
    },
    {
      name: 'Login',
      path: '/login',
      active: !userStatus
    },
    {
      name: 'Signup',
      path: '/signup',
      active: !userStatus
    },
    {
      name: 'All Posts',
      path: '/all-posts',
      active: userStatus
    },
    {
      name: 'Add Post',
      path: '/add-post',
      active: userStatus
    },
  ]
  return (
    <header className='py-3 shadow bg-black'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => (
              item.active ? (
                <li key={item.name}                 
                    className='inline-block px-6 py-3 duration-200 hover:bg-green-300 rounded-full text-white'
                >
                  <button onClick={() => navigate(item.path)}>{item.name}</button>
                </li>) : null
            ))}
            {userStatus && (
              <li className='inline-bock px-6 py-3 duration-200 hover:bg-green-300 rounded-full text-white'>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header