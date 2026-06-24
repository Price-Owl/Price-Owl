import React from 'react'
import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import { AuthProvider } from './auth.context'
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <AuthProvider>
      <Toaster position="top-center" />
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App
