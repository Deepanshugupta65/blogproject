import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import {login,logout} from "./store/authSlice"
// import { Footer } from './components'
import { Header,Footer } from './components/index'
import { Outlet } from 'react-router-dom'
function App() {
  
   const [loading,setLoading] = useState(true) 
   const dispatch = useDispatch
// application load ask to use effect youare logged in or not
   useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else {
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
   },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-slate-100 '>
      <div className='w-full block'>
        <Header/>
        <main>
       todo   {/* <Outlet/> */}
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
