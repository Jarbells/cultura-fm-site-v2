// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// 1. Importe o seu provider
import { RadioInfoProvider } from './contexts/RadioInfoContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 2. Envolva o <App /> com o provider */}
      <RadioInfoProvider>
        <App />
      </RadioInfoProvider>
    </BrowserRouter>
  </React.StrictMode>
);