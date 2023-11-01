import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Outlet
} from 'react-router-dom'
import Products from './pages/privatePages/products/Products';
import Nav from './component/section/Nav';
import Users from './pages/privatePages/users/Users';
import Login from './pages/publicPages/Login';
import PrivateRoutes from './utils/PrivateRoutes';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Orders from './pages/privatePages/Orders/Orders';
import Categories from './pages/privatePages/categories/Categories';
import Managers from './pages/privatePages/users/Managers';

function Root({ isLogged }){
  return(
    <>
   {isLogged && <Nav />} 
    <Outlet />
    </>
  )
}

function App() {

  const { isAuthenticated } = useContext(AuthContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root isLogged={isAuthenticated} />}>
        
        <Route element={<PrivateRoutes isLogged={isAuthenticated} />}>

        <Route path='/users' element={<Users />} />
        <Route path='/managers' element={<Managers />} />
        <Route path='/products' element={<Products />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/categories' element={<Categories />} />

        </Route>


        <Route index element={<Login />} />
      </Route>
    )
  )

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
