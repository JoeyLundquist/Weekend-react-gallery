import React,{ useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import GalleryList from '../GalleryList/GalleryList';
import GalleryForm from '../GalleryForm/GalleryForm';




function App() {
  //State to grab and render photos 
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  //State to grab files to be uploaded
  const [selectedFile, setSelectedFile] = useState([]);

  //On Page load
  useEffect(() => {
    getPhotos();
  }, [])
  
  //This is to add likes to photos
  const givePhotoLove = (photo) => {
    const photoId = photo.id.id;
    const photoLikes = {likes: photo.id.likes};
    console.log('in givePhotoLove photoId is', photoId, 'photo likes is ', photoLikes);

    //PUT request to update number of likes
    Axios.put(`/gallery/like/${photoId}`, photoLikes)
        .then(() => {
          getPhotos();
        })
        .catch((err) => {
          console.log('Failed to give photo love', err);
        })
  }
    //GET request to grab photo paths and descriptions
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
  //POST request function for uploading and adding new photos
  const addPhotoToGallery = (photoToAdd) => {
    console.log('in POST')
    photoToAdd.path = `images/${selectedFile.name}`
    
    //this POST sends the path and description to DB
    Axios.post('/gallery', photoToAdd)
        .then(() => {
          console.log('POST success')
          getPhotos();
        })
        .catch((err) => {
          console.log('POST failed', err)
          alert('Failed to add photo to gallery.', err)
        })

    //this POST sends new picture to server for storage
    Axios.post('/gallery/upload', formData)
        .then(() => {
          console.log('Upload success')
        })
        .catch((err) => {
          console.log('failed uploading ',err)
        })
  }
  //DELETE request to remove path and description from DB
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

  //Function to grab file for upload
  const selectedFileHandler = (e) => {setSelectedFile(e.target.files[0])}

  //Setting form data to be sent to server
  const formData = new FormData();
  formData.append('image', selectedFile)



  //Render return
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Gallery of My Life</h1>
      </header>
      <GalleryForm 
        addPhotoToGallery={addPhotoToGallery}
        selectedFileHandler={selectedFileHandler}
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
