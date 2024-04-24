import { useEffect, useContext } from 'react';
import Ably from 'ably/promises';
import { SlideshowContext } from './SlideshowContext'; // Assuming you have a context for slideshow state

const AblyListener = () => {
    const { nextImage, prevImage, toggleAutoplay, toggleClockDisplay } = useContext(SlideshowContext);

    useEffect(() => {
        const initAbly = async () => {
            try {
                const response = await fetch('/.netlify/functions/generate-ably-token');
                if (!response.ok) {
                    throw new Error(`Failed to fetch Ably token: ${response.statusText}`);
                }
                const tokenDetails = await response.json();

                const ably = new Ably.Realtime({
                    tokenDetails,
                    logLevel: 4,
                });

                ably.connection.on('connected', () => {
                    console.log('Successfully connected to Ably!');
                });

                const channel = ably.channels.get('file-uploads');

                channel.subscribe('new-file', (message) => {
                    console.log('New file message received:', message.data);
                    // Here you might want to update the state or context with the new image URL
                });

                channel.subscribe('control', (message) => {
                    console.log('Control message received:', message.data);
                    switch (message.data.action) {
                        case 'next':
                            nextImage();
                            break;
                        case 'prev':
                            prevImage();
                            break;
                        case 'toggleAutoplay':
                            toggleAutoplay(message.data.value);
                            break;
                        case 'toggleClock':
                            toggleClockDisplay();
                            break;
                        default:
                            console.log('Unknown action:', message.data.action);
                    }
                });
            } catch (error) {
                console.error('Error setting up Ably:', error);
            }
        };

        initAbly();

        // Clean up Ably connection when component unmounts
        return () => {
            // Code to disconnect from Ably
        };
    }, [nextImage, prevImage, toggleAutoplay, toggleClockDisplay]);

    return null; // This component does not render anything itself
};

export default AblyListener;
