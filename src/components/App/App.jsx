import React,{ useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import GalleryList from '../GalleryList/GalleryList';

function App() {
  let [galleryPhotos, setGalleryPhotos] = useState([])


  useEffect(() => [
    getPhotos()
  ], [])
    
  const getPhotos = () => {
    console.log('In getPhotos')

    Axios.get('/gallery')
        .then((response) => {
          setGalleryPhotos(response.data);
          console.log('Photo', galleryPhotos)
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
        <p>Gallery goes heres</p>
        <img src="images/goat_small.jpg"/><p></p>
        <GalleryList galleryPhotos={galleryPhotos}/>
      </div>
    );
}

export default App;
