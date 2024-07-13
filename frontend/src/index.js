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
<<<<<<< HEAD
        <React.StrictMode>
=======
        {/* <React.StrictMode> */}
>>>>>>> 885121f (Added filter feature to Beers route)
            <App />
            {/* <Suspense fallback={<Spinner />} >
                <AppComponent />
            </Suspense> */}
<<<<<<< HEAD
        </React.StrictMode>
=======
        {/* </React.StrictMode> */}
>>>>>>> 885121f (Added filter feature to Beers route)
    </BrowserRouter>
)