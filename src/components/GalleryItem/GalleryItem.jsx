import react, {useState} from 'react'
import './GalleryItem.css'

const GalleryItem = ({photo, givePhotoLove}) => {
    const [photoDescription, setPhotoDescription] = useState(false)
    const togglePhotoDescription = () => {setPhotoDescription(true)}
    const addLoveToPhoto = () => {
        givePhotoLove({id: photo})
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
                <div>{!photo.likes? <span>No people love this photo :(</span> : <span>{photo.likes} people love this!</span>}</div>
            </li>
        </>
    )
}

export default GalleryItem;