import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'remixicon/fonts/remixicon.css'
import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux'
import router from './routes/router.jsx';
import { store } from './store/store.js';


createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <RouterProvider router={router} />
  </Provider>,
)