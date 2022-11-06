import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [addresses, setAddresses] = useState(["hogehgoe"])
  useEffect( () => {
    const func = async () => {
      const addresses = await fetchAddresses()
      setAddresses(addresses)
    }
    func()
  }, [])

  return (
    <div className="App">
      <div>
        {
          addresses.map((address, i ) => {
            return <p key={i}>{address}</p>
          })
        }
      </div>
    </div>
  );
}

const fetchAddresses = async () => {
  if (process.env.NODE_ENV == "production") {
    const data = await chrome.storage.local.get("addresses")
    return !data.address ? [] : data.address
  }

  const data = localStorage.getItem('addresses')
  const addresses = JSON.parse(data)
  return !addresses ? [] : addresses
}

const saveAddress = async (address) => {
  const addresses = await fetchAddresses()
  addresses.push(address)
  if (process.env.NODE_ENV == "production") {
    await chrome.storage.local.save("addresses", addresses)
    return
  }
  const data = JSON.stringify(addresses)
  localStorage.setItem('addresses', data)
}

const deleteAddress = async (address) => {
  let addresses = await fetchAddresses()
  addresses = address.filter(add => {
    return !add == address
  })
  await addresses(addresses)
}

export default App;

/*global chrome*/