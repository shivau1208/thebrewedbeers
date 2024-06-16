import React, { Suspense } from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import { lazy } from 'react';
import Spinner from './components/spinner/spinner.jsx';
import App from './App.jsx';

const root = createRoot(document.getElementById('root'))
export async function delayForDemo(promise) {
    return new Promise(resolve => {
      setTimeout(resolve, 50000);
    }).then(() => promise);
}
const AppComponent = lazy(()=>import('./App.jsx'))
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <App />
            {/* <Suspense fallback={<Spinner />} >
                <AppComponent />
            </Suspense> */}
        </React.StrictMode>
    </BrowserRouter>
)