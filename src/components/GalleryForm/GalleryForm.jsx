import { useState } from "react";

const GalleryForm = ({addPhotoToGallery}) => {
    const [imgPath, setImgPath] = useState('');
    const [imgDescription, setImgDescription] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();
        addPhotoToGallery({
            path: imgPath,
            description: imgDescription
        })
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input 
                    onChange={(evt) => setImgPath(evt.target.value)}
                    type="text"
                    placeholder="Image Path"
                    value={imgPath}
                    required
                />
                <input 
                    onChange={(evt) => setImgDescription(evt.target.value)}
                    type="text"
                    placeholder="Image Description"
                    value={imgDescription}
                    required
                />
                <input type="submit" value="Post Image" />
            </form>
        </>
    )
}

export default GalleryForm;