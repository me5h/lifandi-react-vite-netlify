// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Ensure this imports App correctly, .jsx extension might be needed if the file is actually App.jsx
import { SlideshowProvider } from './assets/contexts/SlideshowContext';  // Adjust the path as necessary
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SlideshowProvider> 
      <App />
    </SlideshowProvider>
  </React.StrictMode>
);
