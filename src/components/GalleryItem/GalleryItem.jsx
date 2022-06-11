import react, {useState} from 'react'
import './GalleryItem.css'

const GalleryItem = ({photo}) => {
    const [photoDescription, setPhotoDescription] = useState(false)
    const togglePhotoDescription = () => {setPhotoDescription(true)}

    return (
        <>
            <li className='img-container'>
                {!photoDescription? <img onClick={togglePhotoDescription} src={photo.path}/> : 
                <div className='description-div' onClick={() => setPhotoDescription(false)}>{photo.description}</div>}
            </li>
        </>
    )
}

export default GalleryItem;