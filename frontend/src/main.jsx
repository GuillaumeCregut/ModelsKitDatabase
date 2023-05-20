import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./app/store";
import { AuthProvider } from './context/auth.provider';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </AuthProvider>,
)
