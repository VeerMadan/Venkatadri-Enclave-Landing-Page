import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../../src/index.css';
import AdminApp from './AdminApp.jsx';

createRoot(document.getElementById('admin-root')).render(
  <StrictMode>
    <AdminApp />
  </StrictMode>,
);
