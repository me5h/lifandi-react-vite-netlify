import { createContext, useState, useEffect } from 'react';
import Ably from 'ably';

export const SlideshowContext = createContext();

export const SlideshowProvider = ({ children }) => {
    const [images, setImages] = useState(['/assets/long-exposure.jpg']);  // Initial default image

    useEffect(() => {
        const ably = new Ably.Realtime({ authUrl: '/.netlify/functions/generate-ably-token' });
        const channel = ably.channels.get('file-uploads');

        const onNewFile = (message) => {
            console.log('New file message received:', message.data);
            setImages(prevImages => {
                // Check if only the default image is present
                if (prevImages.length === 1 && prevImages[0] === '/assets/long-exposure.jpg') {
                    return [message.data.downloadUrl];  // Replace the default image
                } else {
                    return [...prevImages, message.data.downloadUrl];  // Add new image to the list
                }
            });
        };

        channel.subscribe('new-file', onNewFile);

        // Clean up function to unsubscribe when the component unmounts
        return () => {
            channel.unsubscribe('new-file', onNewFile);
        };
    }, []);

    return (
        <SlideshowContext.Provider value={{ images, setImages }}>
            {children}
        </SlideshowContext.Provider>
    );
};
