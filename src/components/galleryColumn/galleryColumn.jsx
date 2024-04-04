import React, { useEffect, useRef } from 'react';
import Image from '../image/image';
import './galleryColumn.css';

const GalleryColumn = ({ photos, observer }) => {
    const columnRef = useRef(null);

    useEffect(() => {
        const images = columnRef.current.querySelectorAll('.image');
        images.forEach(image => {
            observer.observe(image);
        });

        return () => {
            images.forEach(image => {
                observer.unobserve(image);
            });
        };
    }, [photos, observer]);

    return (
        <div style={{ marginTop: '20px' }} className="gallery-column" ref={columnRef}>
            {photos.map(photo => <Image key={photo.id} photo={photo} observer={observer} />)}
        </div>
    );
};

export default GalleryColumn;
