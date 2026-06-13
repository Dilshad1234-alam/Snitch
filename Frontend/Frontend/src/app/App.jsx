import { RouterProvider } from 'react-router'
import './App.css'
import { routes } from './app.routes'
import { useSelector } from "react-redux";
import { useAuth } from './features/auth/hook/useAuth';
import { useEffect } from 'react';
import { useWishlist } from './features/wishlist/hook/useWishlist';

function App() {

  const { handleGetMe } = useAuth();
  const { handleGetWishlist } = useWishlist()

  const user = useSelector(state => state.auth.user);

  console.log(user);
  
  useEffect(() => {
    handleGetMe()
    handleGetWishlist()
  }, [])

  return (
    <>
      <RouterProvider router={routes}/>
    </>
  )
}

export default App
