import { RouterProvider } from "react-router";
import { Flowbite, ThemeModeScript } from 'flowbite-react';
import customTheme from './utils/theme/custom-theme';
import router from "./routes/Router";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <>
            <ThemeModeScript />
            <Flowbite theme={{ theme: customTheme }}>
                <ToastContainer position="top-right" />
                <RouterProvider router={router} />
            </Flowbite>
        </>
    );
}

export default App;
