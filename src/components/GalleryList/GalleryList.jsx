import GalleryItem from "../GalleryItem/GalleryItem";

//Function for rendering my GalleryList
const GalleryList = ({galleryPhotos, givePhotoLove, deletePhoto}) => {
    return (
        <>
            {/* 
                This just maps through my gallery then my GalleryItems assigns 
                all the <li> components to make update or deleting easier 
            */}
            <ul>
                {galleryPhotos.map((photo) => {
                   return( 
                        <GalleryItem 
                            key={photo.id}
                            photo={photo}
                            givePhotoLove={givePhotoLove}
                            deletePhoto={deletePhoto}
                        />
                   )
                })}
            </ul>
        </>
    )
}

export default GalleryList;