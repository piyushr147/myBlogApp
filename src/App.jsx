import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authenticationService from './appwrite/authentication'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import NewFooter from './components/Footer/NewFooter'
import NewHeader from './components/Header/NewHeader'

function App() {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authenticationService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login(userData))
      }
      else {
        dispatch(logout())
      }
    }).finally(() => setLoading(false))
  }, [])

  return !loading ? (<div className='min-h-screen flex flex-wrap content-between'>
    <div className='w-full block'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  </div>)
    : (<><div className="w-full py-8 mt-4 text-center">
      <div className="flex flex-wrap">
        <div className="p-2 w-full">
          <h1 className="text-2xl font-bold hover:text-gray-500">
            Login to read posts
          </h1>
        </div>
      </div>
  </div></>)
}

export default App
