import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animateOnScroll = () => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.gallery',
            start: 'center',
            end: '+=820',
            scrub: true
        }
    });
    tl.to('.hero-section', { opacity: 0 });

    const itemsL = gsap.utils.toArray('.left-gallery .gallery-item');
    itemsL.forEach(item => {
        gsap.fromTo(item, { x: -50, opacity: 0 }, {
            opacity: 1,
            x: 0,
            scrollTrigger: {
                trigger: item,
                start: '-=850',
                end: '-=100',
                scrub: true
            }
        });
    });

    const itemsR = gsap.utils.toArray('.right-gallery .gallery-item');
    itemsR.forEach(item => {
        gsap.fromTo(item, { x: 50, opacity: 0 }, {
            opacity: 1,
            x: 0,
            scrollTrigger: {
                trigger: item,
                start: '-=850',
                end: '-=100',
                scrub: true
            }
        });
    });
};
