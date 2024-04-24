// Clock.jsx
import { useEffect, useState } from 'react';
import '../css/Clock.css';

const Clock = ({ showDate, showClock }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        // Function to get the browser's timezone in a format compatible with WorldTimeAPI
        const getTimeZone = () => {
            return Intl.DateTimeFormat().resolvedOptions().timeZone; // Get the IANA timezone string directly
        };

        // Function to fetch the current time from the WorldTimeAPI based on the browser's timezone
        const fetchTime = () => {
            const timeZone = getTimeZone();
            fetch(`https://worldtimeapi.org/api/timezone/${timeZone}`)
                .then(response => response.json())
                .then(data => {
                    const networkTime = new Date(data.datetime);
                    setTime(networkTime);
                })
                .catch(error => {
                    console.error('Error fetching time:', error);
                    setTime(new Date()); // Fallback to local time in case of error
                });
        };

        // Fetch the time initially when the component mounts
        fetchTime();

        // Set up an interval to fetch the time every 60 seconds
        const intervalId = setInterval(fetchTime, 60000); // Update from API every minute

        // Set up a second interval to increment the time every second locally
        const secondTimer = setInterval(() => {
            setTime(prevTime => new Date(prevTime.getTime() + 1000));
        }, 1000);

        // Clear intervals on component unmount
        return () => {
            clearInterval(intervalId);
            clearInterval(secondTimer);
        };
    }, []);

    return (
        <div className="clock-container">
            <div className={showClock ? "time" : "time hidden"}>{time.toLocaleTimeString()}</div>
            <div className={showDate ? "date" : "date hidden"}>{time.toLocaleDateString()}</div>
        </div>
    );
};

export default Clock;
