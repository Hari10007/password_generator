import React, { useState } from 'react'
import PasswordGenerator from '../../components/home/PasswordGenerator'
import PasswordTable from '../../components/home/PasswordTable'
import Header from '../../components/home/Header'

function PasswordGeneratorPage() {
    const [passwordUpdated, setPasswordUpdated] = useState(false);
 

  
    const handlePasswordUpdate = () => {
      setPasswordUpdated(!passwordUpdated);
    };

  return (
    <>
    <Header />
    <div className='container '>
      <div className='d-flex flex-column justify-content-center align-items-center my-5' style={{ minHeight: '50vh' }}>
        <h4>Password Generator</h4>
        <PasswordGenerator  handlePasswordUpdate={handlePasswordUpdate} />
      </div>
        <PasswordTable passwordUpdated={passwordUpdated} />
    </div>
    </>
  )
}

export default PasswordGeneratorPage
