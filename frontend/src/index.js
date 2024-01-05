import React, { Suspense } from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import App from './App';
import { lazy } from 'react';

const root = createRoot(document.getElementById('root'))
const AppComponent = lazy(()=> import('./App.jsx'))
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <Suspense fallback={<p>Loading...</p>} >
                <AppComponent />
            </Suspense>
        </React.StrictMode>
    </BrowserRouter>
)