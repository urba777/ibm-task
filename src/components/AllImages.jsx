import { useEffect, useState } from "react";
import { Image } from 'cloudinary-react';
import Loading from "./Loading";

const AllImages = (props) => {

    const [imageIds, setImageIds] = useState([]);

    const loadImages = async () => {
        try {
            const response = await fetch('api/images');
            const data = await response.json();
            setImageIds(data);
            // console.log(data); //Shows array
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadImages();
    }, []);

    if (imageIds.length) {
        return (
            <>
                <h1 className='galleryTitle'>{(props.language === 'en') ? 'Gallery' : 'Galerija'}</h1>
                <div className='gallery'>
                    {imageIds && imageIds.map((imageId, index) => (
                        <div className='galleryItem' key={index}>
                            <Image
                                key={index}
                                cloudName="urba-website"
                                publicId={imageId}
                                width='200'
                                height="300"
                                crop="scale"
                            />
                            <div style={{ textTransform: 'capitalize' }} className="desc">{imageId.slice(9)}</div>
                        </div>
                    ))}
                </div>
            </>
        )
    } else {
        return (
            <div className='allImages'>
                {imageIds && imageIds.map((index) => (
                    <div key={index}>
                        <Loading />
                    </div>
                ))}
            </div>
        )
    }
}

export default AllImages;