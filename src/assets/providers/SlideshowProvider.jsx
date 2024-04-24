// Context creation
import { createContext, useState } from 'react';

const SlideshowContext = createContext();

import PropTypes from 'prop-types';

export const SlideshowProvider = ({ children }) => {
    const [images, setImages] = useState([]);

    return (
        <SlideshowContext.Provider value={{ images, setImages }}>
            {children}
        </SlideshowContext.Provider>
    );
};

SlideshowProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SlideshowContext;
