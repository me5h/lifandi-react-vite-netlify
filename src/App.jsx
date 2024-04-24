// App.jsx
import { useContext, useState, useEffect } from 'react';
import { SlideshowContext } from './assets/contexts/SlideshowContext';
import Slideshow from './assets/components/Slideshow';
import UploadDrawer from './assets/containers/UploadDrawer';
import Clock from './assets/components/Clock';
import Weather from './assets/components/Weather';
import Controls from './assets/components/Controls';
import './App.css';

function MainComponent() {
    const { images } = useContext(SlideshowContext);
    const [showClock, setShowClock] = useState(true);
    const [showDate, setShowDate] = useState(true);
    
    const [showWeather, setShowWeather] = useState(false);

    const [autoplay, setAutoplay] = useState(false);
    const [location, setLocation] = useState({ lat: null, lon: null });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            }, (error) => {
                console.error("Error Getting Location: ", error);
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    // Toggle functions
    const toggleClockVisibility = () => setShowClock(!showClock);
    const toggleDateDisplay = () => setShowDate(!showDate);
    const toggleWeatherDisplay = () => setShowWeather(!showWeather);
    const toggleAutoplay = () => setAutoplay(!autoplay);

    return (
        <div className="main-container">
            <div className="top-hover hover-area">
                <UploadDrawer />
            </div>

            <Slideshow images={images} />

            <div className="clock-container">
            <Clock showClock={showClock} showDate={showDate} />
            </div>

            {showWeather && location.lat && location.lon && <Weather lat={location.lat} lon={location.lon} />}

            <div className="bottom-hover hover-area">
                <Controls
                    toggleClock={toggleClockVisibility}
                    toggleDate={toggleDateDisplay}
                    toggleWeather={toggleWeatherDisplay}
                    toggleAutoplay={toggleAutoplay}
                    autoplayChecked={autoplay}
                    clockChecked={showClock}
                    dateChecked={showDate}
                    weatherChecked={showWeather}
                    images={images} // Assuming `images` is an array of image data
                />
            </div>
        </div>
    );
}

export default MainComponent;
