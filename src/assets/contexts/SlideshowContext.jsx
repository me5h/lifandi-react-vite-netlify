import { createContext, useState, useEffect } from 'react';
import Ably from 'ably';

export const SlideshowContext = createContext();

export const SlideshowProvider = ({ children }) => {
    const [images, setImages] = useState(['/assets/long-exposure.jpg']);

    useEffect(() => {
        const ably = new Ably.Realtime({ authUrl: '/.netlify/functions/generate-ably-token' });
        const channel = ably.channels.get('file-uploads');

        const onNewFile = (message) => {
            console.log('New file message received:', message.data);
            setImages(prevImages => [...prevImages, message.data.downloadUrl]);
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
