import { useState } from 'react';
import '../css/Slideshow.css';

const Slideshow = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0); // State to keep track of the current image

    // Function to move to the next image
    const nextImage = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    // Function to move to the previous image
    const prevImage = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="slideshow-container">
            {images.map((image, index) => (
                <div
                    key={index}
                    style={{ backgroundImage: `url(${image})` }}
                    className={`slideshow-image ${index === currentIndex ? 'active' : ''}`}
                >
                    {/* Each image as a background, only active if it's the current index */}
                </div>
            ))}
            <button className="prev" onClick={prevImage}>Prev</button>
            <button className="next" onClick={nextImage}>Next</button>
        </div>
    );
};

export default Slideshow;
