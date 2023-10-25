import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppRoutes from './AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
            <AppRoutes/>
        </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)