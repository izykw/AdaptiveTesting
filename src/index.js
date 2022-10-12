import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './components/app/App';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';


const root = createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<RouterProvider router={router}/>
	</React.StrictMode>,
);
