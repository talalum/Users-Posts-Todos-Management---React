import { useState, useEffect } from 'react'
import './Style.css'


const Address = ({ userAddress, displayAddress, callback }) => {
    const [address, setAddress] = useState({
        street: userAddress.street,
        city: userAddress.city,
        zipcode: userAddress.zipcode,
    })
    useEffect(() => {
        callback(address)
    }, [address.city, address.street, address.zipcode])

    return (
        <div className={displayAddress ? 'display-address address' : 'hide-address address'}>
            Street: <input type="text" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })}/><br />
            City: <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} /><br />
            Zip Code: <input type="text" value={address.zipcode} onChange={(e) => setAddress({ ...address, zipcode: e.target.value })} /><br />
        </div>
    )
}

export default Address