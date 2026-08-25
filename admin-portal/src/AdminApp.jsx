import React from 'react';
import { ThemeProvider } from '../../src/context/ThemeContext';
import AdminDashboard from './AdminDashboard';

export default function AdminApp() {
  return (
    <ThemeProvider>
      <AdminDashboard />
    </ThemeProvider>
  );
}
