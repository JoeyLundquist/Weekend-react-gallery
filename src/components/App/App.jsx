import React,{ useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  let [galleryPhoto, setGalleryPhoto] = useState([])


  useEffect(() => [
    getPhotos()
  ], [])
    
  const getPhotos = () => {
    console.log('In get Photos')

    Axios.get('/gallery')
        .then((response) => {
          setGalleryPhoto(response.data);
          console.log('Photo', galleryPhoto)
        })
        .catch((err) => {
          console.log('Failed GET', err)
          alert('Failed to GET from gallery')
        })
  }

  




    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Gallery of My Life</h1>
        </header>
        <p>Gallery goes here</p>
        <img src="images/goat_small.jpg"/>
      </div>
    );
}

export default App;
