import React,{ useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import GalleryList from '../GalleryList/GalleryList';
import GalleryForm from '../GalleryForm/GalleryForm';




function App() {
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [fileName, setFileName] = useState();
  const [selectedFile, setSelectedFile] = useState([]);


  useEffect(() => {
    getPhotos();
  }, [])

  const givePhotoLove = (photo) => {
    const photoId = photo.id.id;
    const photoLikes = {likes: photo.id.likes};
    console.log('in givePhotoLove photoId is', photoId, 'photo likes is ', photoLikes);

    Axios.put(`/gallery/like/${photoId}`, photoLikes)
        .then(() => {
          getPhotos();
        })
        .catch((err) => {
          console.log('Failed to give photo love', err);
        })
  }
    
  const getPhotos = () => {
    console.log('In getPhotos');

    Axios.get('/gallery')
        .then((response) => {
          setGalleryPhotos(response.data);
          console.log('Photo', galleryPhotos);
        })
        .catch((err) => {
          console.log('Failed GET', err);
          alert('Failed to GET from gallery');
        })
  }

  const addPhotoToGallery = (photoToAdd) => {
    console.log('in POST')

    Axios.post('/gallery', photoToAdd)
        .then(() => {
          console.log('POST success')
          getPhotos();
        })
        .catch((err) => {
          console.log('POST failed', err)
          alert('Failed to add photo to gallery.', err)
        })
  }

  const deletePhotoFromGallery = (photo) => {
      console.log('In Delete')
      console.log(photo.id)

      Axios.delete(`/gallery/${photo.id}`)
          .then(() => {
            getPhotos();
          })
          .catch((err) => {
            console.log('DELETE failed', err)
          })
  }




  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Gallery of My Life</h1>
      </header>
      <GalleryForm 
      addPhotoToGallery={addPhotoToGallery}
      fileName={fileName}
      setFileName={setFileName}
      selectedFile={selectedFile}
      setSelectedFile={setSelectedFile}
      />
      <GalleryList 
      galleryPhotos={galleryPhotos}
      givePhotoLove={givePhotoLove}
      deletePhoto={deletePhotoFromGallery}
      />
    </div>
    
  );
}

export default App;
