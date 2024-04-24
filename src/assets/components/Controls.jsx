import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import '../css/Controls.css';

function Controls({
    toggleAutoplay,
    toggleClock,
    toggleDate,
    toggleWeather,
    autoplayChecked,
    clockChecked,
    dateChecked,
    weatherChecked,
    images
}) {
    return (
        <div className="controls">
            {/* Thumbnails container */}
            <div className="thumbnails-container">
                {images.map((image, index) => (
                    <img key={index} src={image.url} alt={`Thumbnail ${index + 1}`} className="thumbnail" />
                ))}
            </div>
            <Button variant="contained" color="primary">
                Previous
            </Button>
            <Button variant="contained" color="primary">
                Next
            </Button>
            <Button variant="contained" color="primary">
                Fullscreen
            </Button>
            <FormControlLabel
                control={<Switch checked={clockChecked} onChange={toggleClock} />}
                label="Show Clock"
            />
            <FormControlLabel
                control={<Switch checked={dateChecked} onChange={toggleDate} />}
                label="Show Date"
            />
            <FormControlLabel
                control={<Switch checked={weatherChecked} onChange={toggleWeather} />}
                label="Show Weather"
            />
            <FormControlLabel
                control={<Switch checked={autoplayChecked} onChange={toggleAutoplay} />}
                label="Autoplay"
            />
        </div>
    );
}

export default Controls;
