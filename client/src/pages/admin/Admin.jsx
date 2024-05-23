import React from 'react'
import Donar from '../donar/Donar';
import Receiver from '../receiver/Receiver';

const Admin = () => {

    const storedUserData = localStorage.getItem('userData');
    const jsonData = storedUserData ? JSON.parse(storedUserData) : null;
    const isDonor = jsonData?.user?.is_donar;
    return (
        <div>
            {
                isDonor ? (<Donar />) : (<Receiver />)
            }
        </div>
    )
}

export default Admin
