import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css'
import { ClerkProvider } from "@clerk/clerk-react";
import Reports from './routes/Reports';
import TemplatesPage from './routes/TemplatesPage';
import CreateReport from './routes/CreateReport';
import store from './redux/store'
import { Provider } from 'react-redux'
import PDFPage from './routes/PDFPage';


const clerkPubKey: string = "pk_test_c3VubnktbW9uYXJjaC03Ny5jbGVyay5hY2NvdW50cy5kZXYk" // remember to move to env file

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
          path: "reports",
          element: <Reports />,
        },
        {
          path: "templates",
          element: <TemplatesPage/>,
        },
      ]
    },
    {
      path: "create-report",
      element: <CreateReport/>,
    },
    {
      path: "pdf-generated",
      element: <PDFPage/>,
    },
  ]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ClerkProvider publishableKey={clerkPubKey}>
        <RouterProvider router={router} />
      </ClerkProvider>
    </Provider>
  </React.StrictMode>,
)
