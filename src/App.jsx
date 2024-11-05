import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Likes from './pages/Likes'
import Details from './pages/Details'
import http from './axios'
import MainLayouts from './layouts/MainLayouts'

function App() {
  useEffect(() => {
    http.get('featured-playlists')
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
      
    })
  }, [])
  return (
    <div>
      <Routes>
        <Route path='/' element = {<MainLayouts><Home></Home></MainLayouts>}></Route>
        <Route path='/likes' element = {<MainLayouts><Likes></Likes></MainLayouts>}></Route>
        <Route path='/details/:id' element = {<MainLayouts><Details></Details></MainLayouts>}></Route>
      </Routes>
    </div>
  )
}

export default App