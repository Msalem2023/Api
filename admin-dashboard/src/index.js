import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './Hooks/useCurrentUser';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChatProvider } from './Hooks/useChat';


export const client = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client={client}>
        <ChatProvider>
            <AuthProvider>
                <Toaster />
                <App />
            </AuthProvider>
        </ChatProvider>
    </QueryClientProvider>

);

