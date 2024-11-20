import { useState } from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css'
import Home from './home/Home'
import Quiz from './components/quiz/Quiz'


const router = createBrowserRouter([
  {
    path:'/',
    element: <Home/>
  },
  {
    path:'/HTML',
    element:<Quiz/>

  },
  {
    path:'/CSS',
    element:<Quiz/>

  },
  {
    path:'/JavaScript',
    element:<Quiz/>

  },
  {
    path:'/Accessibility',
    element:<Quiz/>

  }
])

function App() {
  

  return (
    <>
    <RouterProvider router={router} />

      
    </>
  )
}

export default App
