import GalleryItem from "../GalleryItem/GalleryItem";

const GalleryList = ({galleryPhotos}) => {
    return (
        <>
            <ul>
                {galleryPhotos.map((photo) => {
                   return( 
                        <GalleryItem 
                            key={photo.id}
                            photo={photo}
                        />
                   )
                })}
            </ul>
        </>
    )
}

export default GalleryList;