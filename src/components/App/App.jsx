import React,{ useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import GalleryList from '../GalleryList/GalleryList';

function App() {
  let [galleryPhotos, setGalleryPhotos] = useState([])


  useEffect(() => [
    getPhotos()
  ], [])

  const givePhotoLove = (photoId) => {
    console.log('in givePhotoLove', photoId.id.id)


    Axios.put(`/gallery/like/${photoId.id.id}`)
      .then(() => {
        getPhotos();
      })
      .catch((err) => {
        console.log('Failed to give photo love', err)
      })
  }
    
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
        
        <GalleryList 
        galleryPhotos={galleryPhotos}
        givePhotoLove={givePhotoLove}
        />
      </div>
    );
}

export default App;
