import GalleryItem from "../GalleryItem/GalleryItem";

const GalleryList = ({galleryPhotos, givePhotoLove, deletePhoto}) => {
    return (
        <>
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