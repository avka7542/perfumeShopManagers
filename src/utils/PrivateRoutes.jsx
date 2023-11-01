import { Navigate , Outlet } from "react-router-dom"

function PrivateRoutes({isLogged}) {

   if(!isLogged){
    return <Navigate to="/" />
   }

  return <Outlet />
}

export default PrivateRoutes;