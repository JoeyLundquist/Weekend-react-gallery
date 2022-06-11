import GalleryItem from "../GalleryItem/GalleryItem";

const GalleryList = ({galleryPhotos, givePhotoLove}) => {
    return (
        <>
            <ul>
                {galleryPhotos.map((photo) => {
                   return( 
                        <GalleryItem 
                            key={photo.id}
                            photo={photo}
                            givePhotoLove={givePhotoLove}
                        />
                   )
                })}
            </ul>
        </>
    )
}

export default GalleryList;