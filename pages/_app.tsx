import '@/styles/globals.css'
import '@/styles/graph.css';

import type { AppProps } from 'next/app'
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Component {...pageProps} />
    </DndProvider>
  );
}

export default MyApp;