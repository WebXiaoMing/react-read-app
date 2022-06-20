import React from 'react';
import { createRoot } from 'react-dom/client'
import './styles/index.less'

import App from './views/App'

const root = createRoot(document.querySelector('#root')!)

root.render(<App />)
