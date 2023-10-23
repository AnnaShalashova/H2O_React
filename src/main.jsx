import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './redux/store.jsx';
import { Provider } from 'react-redux';
import './index.scss'
import App from './app/App.jsx';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

async function initApp() {
  const { worker } = await import('../mocks/server/browser.js');
  await worker.start();
}


initApp().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ErrorBoundary>
        <BrowserRouter >
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>,
  )
})
