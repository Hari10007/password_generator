import React from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate, Outlet} from 'react-router-dom'
import { selectUser } from '../redux-toolkit/userSlice'


import ProtectedRoute from './ProtectedRoute'
import LoginPage from '../pages/login/LoginPage'
import PasswordGeneratorPage from '../pages/home/PasswordGeneratorPage'
import NoMatchPage from '../pages/error_pages/NoMatchPage'


function LoginRoute() {
    const user = useSelector(selectUser);

    if (user) {
      return <Navigate to="/password_generator" />;
    } else {
      return <LoginPage />;
    }
  }
  
function UserRoutes() {

    return (
      <>
        <Routes>
            <Route path="/" exact element={<Navigate to="/login" replace />} />

            <Route path="/login" exact element={<LoginRoute />} />
            <Route element={<ProtectedRoute  logoutPath="/login"/>}>
              <Route path="/" element={<Outlet />}>
                  <Route path="password_generator" element={<PasswordGeneratorPage />} />

                  <Route path="*" element={<NoMatchPage/>} />
              </Route>
            </Route>
        </Routes>
      </>
    );
}
  
  export default UserRoutes;