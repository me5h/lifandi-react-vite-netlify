// src/hooks/useAbly.js
import { useEffect } from 'react';
import { useSlideshow } from '../contexts/SlideshowContext';
import Ably from 'ably/promises'; // Make sure to import promises or callbacks based on usage

const useAblyListener = () => {
    const { addImage } = useSlideshow();

    useEffect(() => {
        const ably = new Ably.Realtime.Promise({ authUrl: '/.netlify/functions/generate-ably-token' });
        const channel = ably.channels.get('file-uploads');

        const onNewFile = (message) => {
            console.log('New file received:', message.data);
            addImage(message.data.downloadUrl);
        };

        channel.subscribe('new-file', onNewFile);

        return () => channel.unsubscribe('new-file', onNewFile);
    }, [addImage]);

    return null;
};
