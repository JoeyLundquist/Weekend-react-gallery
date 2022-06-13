import react, {useState} from 'react'
import './GalleryItem.css'

//Render Function for my GalleryItems (Photos)
const GalleryItem = ({photo, givePhotoLove, deletePhoto}) => {
    //This state is used to help toggle between photo and description
    const [photoDescription, setPhotoDescription] = useState(false)

    //This function is for toggle between photo and description
    const togglePhotoDescription = () => {setPhotoDescription(true)}
   
    //This function is to send the photo id to axois PUT request
    const addLoveToPhoto = () => {
        givePhotoLove({id: photo})
    }

    //This function sends the photo id to DELETE request
    const deleteFromGallery = () => {
        deletePhoto({id: photo.id})
    }

    //Renders my gallery Items
    return (
        <>
            <li className='img-container'>
                {/* Conditional render for either photo or description */}
                {!photoDescription? <img onClick={togglePhotoDescription} src={photo.path}/> : 
                <div className='description-div' onClick={() => setPhotoDescription(false)}>{photo.description}</div>}
                <button
                    onClick={addLoveToPhoto}
                >
                    Love it!
                </button>
                <button
                    className='delete-photo-btn'
                    onClick={deleteFromGallery}
                >
                    Delete
                </button>
                {/* Conditional render for 0 likes or positive likes */}
                <div>{!photo.likes? <span>No people love this :(</span> : <span>{photo.likes} people love this!</span>}</div>
            </li>
        </>
    )
}

export default GalleryItem;