import React, { useEffect, useState } from 'react'
import useAxios from '../../utilis/useAxios';

function PasswordTable({passwordUpdated}) {
  let api = useAxios()
  const [passwords, setPasswords] = useState([]);

  const fetchPassword = async () => {
    try {

      const response = await api.get('password_generator/list');

      if (response.status === 200) {
        setPasswords(response.data);
      }
    } catch (error) {
      console.error('password error:', error);
    }
  };

  useEffect(() => {   
    
    fetchPassword();
  }, [passwordUpdated]);
  return (
    <div>
        <table className="table">
            <thead className="thead-dark">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Generated Password</th>
                </tr>
            </thead>
            <tbody>
              {passwords.map((g_password, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{g_password.password}</td>
                </tr>
              ))}
            </tbody>
        </table>
    </div>
  )
}

export default PasswordTable
