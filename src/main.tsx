import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.scss';
import App from './app/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/index.tsx';
import { store } from './redux/store.tsx';

async function initApp() {
  const { worker } = await import('../mocks/server/browser.ts');
  await worker.start();
}

initApp().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>
  );
});
