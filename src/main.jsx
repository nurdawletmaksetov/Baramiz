import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

createRoot(document.getElementById('root')).render(
  <MantineProvider>
    <ModalsProvider>
      <App />
    </ModalsProvider>
  </MantineProvider>
);
