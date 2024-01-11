import React, { Suspense } from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import { lazy } from 'react';
import Spinner from './components/spinner/spinner.jsx';

const root = createRoot(document.getElementById('root'))
const AppComponent = lazy(()=>import('./App.jsx'))
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <Suspense fallback={<Spinner />} >
                <AppComponent />
            </Suspense>
        </React.StrictMode>
    </BrowserRouter>
)