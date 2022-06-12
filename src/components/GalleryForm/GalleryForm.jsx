import { useState } from "react";

//Function for rendering my Gallery form
const GalleryForm = ({addPhotoToGallery, selectedFileHandler }) => {
    //State for setting and sending image description
    const [imgDescription, setImgDescription] = useState('')


    //My submit button function, runs my photo description to axios POST function in APP.JS
    const onSubmit = (e) => {
        //Prevents page reload when submitting form
        e.preventDefault();

        //Brought down to grab photo description and send it to axios for POST request
        addPhotoToGallery({
            description: imgDescription,
        })
    }
    //Renders for my GalleryForm
    return (
        <>
            {/* Form to upload photo */}
            <form onSubmit={onSubmit} encType="multipart/form-data" action="/gallery" >
                <input 
                    type="file" 
                    onChange={selectedFileHandler}
                    name="image"

                />
            </form>
            {/* Form for description, I separated them since uploads need multipart or form-data and this is just text */}
            <form onSubmit={onSubmit}>
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