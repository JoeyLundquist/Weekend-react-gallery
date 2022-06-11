import react, {useState} from 'react'
import './GalleryItem.css'

const GalleryItem = ({photo, givePhotoLove, deletePhoto}) => {
    const [photoDescription, setPhotoDescription] = useState(false)
    const togglePhotoDescription = () => {setPhotoDescription(true)}
    const addLoveToPhoto = () => {
        givePhotoLove({id: photo})
    }

    const deleteFromGallery = () => {
        deletePhoto({id: photo.id})
    }

    return (
        <>
            <li className='img-container'>
                {!photoDescription? <img onClick={togglePhotoDescription} src={photo.path}/> : 
                <div className='description-div' onClick={() => setPhotoDescription(false)}>{photo.description}</div>}
                <button
                    onClick={addLoveToPhoto}
                >
                    Love it!
                </button>
                <button
                    onClick={deleteFromGallery}
                >
                    Delete
                </button>
                <div>{!photo.likes? <span>No people love this :(</span> : <span>{photo.likes} people love this!</span>}</div>
            </li>
        </>
    )
}

export default GalleryItem;