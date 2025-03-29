import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const moveisQueryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryClientProvider client={moveisQueryClient}>
      <App />
    </QueryClientProvider>
  </Provider>
)
