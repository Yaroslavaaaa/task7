import React, { useEffect, useRef } from 'react';

const Image = ({ photo, observer }) => {
    const imgRef = useRef(null);

    useEffect(() => {
        const imgElement = imgRef.current;
        if (observer && imgElement) {
            observer.observe(imgElement);
        }

        return () => {
            if (observer && imgElement) {
                observer.unobserve(imgElement);
            }
        };
    }, [observer, photo]);

    const handleIntersection = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const imgElement = entry.target;
                const src = imgElement.getAttribute('data-src');
                imgElement.setAttribute('src', src);
                observer.unobserve(imgElement);
            }
        });
    };

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);
        const imgElement = imgRef.current;

        if (imgElement) {
            observer.observe(imgElement);
        }

        return () => {
            if (imgElement) {
                observer.unobserve(imgElement);
            }
        };
    }, []);

    return (
        <img
            ref={imgRef}
            src=""
            alt={photo.alt_description}
            data-src={photo.urls.small}
            style={{ width: '400px', height: 'auto', marginRight: '10px', marginBottom: '10px' }}
            className="image"
        />
    );
};

export default Image;
