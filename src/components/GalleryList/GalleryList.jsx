

const GalleryList = ({galleryPhotos}) => {
    return (
        <>
            Testing my Gallery List
            <ul>
                {galleryPhotos.map((photo) => {
                   return( 
                    <li><img src={photo.path} /> </li>
                   )
                })}
            </ul>
        </>
    )
}

export default GalleryList;