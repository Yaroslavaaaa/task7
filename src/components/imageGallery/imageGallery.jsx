import React, { useState, useEffect, useRef } from 'react';
import fetchPhotos from '../../utils/unsplash'; 
import './imageGallery.css';
import GalleryColumn from '../galleryColumn/galleryColumn';

function ImageGallery() {
    const [leftPhotos, setLeftPhotos] = useState([]);
    const [rightPhotos, setRightPhotos] = useState([]);
    const [observer, setObserver] = useState(null);

    useEffect(() => {
        // Create an IntersectionObserver instance
        const observerInstance = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Lazy load image when it becomes visible
                    const targetElement = entry.target;
                    const src = targetElement.getAttribute('data-src');
                    targetElement.setAttribute('src', src);
                    observerInstance.unobserve(targetElement);
                }
            });
        });

        // Set the observer instance
        setObserver(observerInstance);

        // Clean up function to disconnect the observer when component unmounts
        return () => {
            if (observerInstance) {
                observerInstance.disconnect();
            }
        };
    }, []); // Only run this effect once when component mounts

    useEffect(() => {
        getRandomPhotos();
    }, []);

    const getRandomPhotos = async () => {
        const results = await fetchPhotos();
        const halfLength = Math.ceil(results.length / 2);
        setLeftPhotos(results.slice(0, halfLength));
        setRightPhotos(results.slice(halfLength));
    };

    useEffect(() => {
        if (leftPhotos.length > 0) {
            preloadCriticalImages(leftPhotos);
        }
        if (rightPhotos.length > 0) {
            preloadCriticalImages(rightPhotos);
        }
    }, [leftPhotos, rightPhotos]);

    const preloadCriticalImages = photos => {
        photos.slice(0, 3).forEach(photo => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = photo.urls.small;
            document.head.appendChild(link);
        });
    };

    useEffect(() => {
        // Gather data on app load time
        const appLoadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log('App load time:', appLoadTime, 'ms');

        // Gather data on image load times
        const images = document.querySelectorAll('.image');
        images.forEach(image => {
            const src = image.getAttribute('src');
            const timing = window.performance.getEntriesByName(src)[0];
            if (timing) {
                console.log('Image load time', src, ':', timing.duration, 'ms');
            }
        });
    }, [leftPhotos, rightPhotos]);

    return (
        <div>
            <h1>IMAGE GALLERY</h1>
            <div className="gallery">
                <GalleryColumn photos={leftPhotos} observer={observer} />
                <GalleryColumn photos={rightPhotos} observer={observer} />
            </div>
        </div>
    );
}

export default ImageGallery;
