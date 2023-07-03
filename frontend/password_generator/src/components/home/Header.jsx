import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import { 
    faRightFromBracket,
    } 
from '@fortawesome/free-solid-svg-icons';
import useAxios from '../../utilis/useAxios';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux-toolkit/userSlice';

function Header() {

    let refresh_token = Cookies.get('refresh_token') ? Cookies.get('refresh_token') : null
    const dispatch = useDispatch('')
    const api = useAxios();

    const handleLogout = async () => {
        const response = await api.post('logout', {'refresh':refresh_token});

        if (response.status === 205) {
          dispatch(logout());
        }
    };

  return (
    <Navbar bg="dark" variant="dark" className="justify-content-center mb-4" style={{ zIndex: 100 }}>
        <Container>
            <Navbar.Brand>Password Generator</Navbar.Brand>
            <div className="d-flex align-items-center">


            <FontAwesomeIcon
                icon={faRightFromBracket}
                style={{ fontSize: '1.0rem', color: 'red', cursor: 'pointer' }}
                onClick={handleLogout}
            />
            </div>
        </Container>
    </Navbar>
  )
}

export default Header