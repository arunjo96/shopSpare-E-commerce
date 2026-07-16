import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import  store  from './store/store.js'
import setupInterceptors from './api/setupInterceptors.js'
import { Toaster } from 'react-hot-toast'
setupInterceptors(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <App />
      <Toaster position="top-right" />
        </BrowserRouter>
    </Provider>
  </StrictMode>,
);
