import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [text, setText] = useState("")
  const [addresses, setAddresses] = useState(["hogehgoe"])
  useEffect( () => {
    loadAddresses()
  }, [])

  const loadAddresses = async () => {
    const addresses = await fetchAddresses()
    setAddresses(addresses)
  }

  const deleteHandler = async (address) => {
    await deleteAddress(address)
    await loadAddresses()
  }

  const addHandler = async () => {
    console.log(process.env.NODE_ENV)
    const addresses = text.split("\n")
    for (let i = 0; i < addresses.length; i++) {
      const address = addresses[i]
      await addAddress(address)
    }
    await loadAddresses()
    setText("")
  }

  const clearHandler = async () => {
    await clearAddresses()
    await loadAddresses()
  }

  return (
    <div className="App">
      <h1 className='title'>チェックする住所の設定</h1>
      <div className='listWrap'>
        <p className='subtitle'>追加済み住所</p>
        {
          addresses.length == 0 ? <p className='list_desc'>追加済み住所はありません</p>
          : <div className='list'>
            {
              addresses.map((address, i) => {
                return <div className='listitem' key={i}>
                  <p><span style={{ color: "red" }} onClick={() => deleteHandler(address)}>[X]</span> {address}</p>
                </div>
              })
            }
          </div>
        }
      </div>
      <div className='form'>

        <p className='subtitle'>住所の追加</p>
        <p className='form_desc'>改行区切りで複数の住所を追加できます</p>
        <div>
          <textarea
            placeholder="東京都世田谷区池尻1&#13;&#10;東京都世田谷区池尻2"
            id="textarea" rows="6" className='textarea'
            value={text}
            onChange={(e) => { setText(e.target.value)}}
          />
        </div>
        <div className='buttonContainer'>
          <input type="button" className='addbutton' value="追加" onClick={() => addHandler()} />
          <input type="button" className='clearbutton' value="全クリア" onClick={() => clearHandler()} />
        </div>
      </div>
    </div>
  );
}

const fetchAddresses = async () => {
  if (process.env.NODE_ENV == "production") {
    const data = await chrome.storage.local.get("addresses")
    console.log(data)
    return !data.addresses ? [] : data.addresses
  }

  const data = localStorage.getItem('addresses')
  const addresses = JSON.parse(data)
  return !addresses ? [] : addresses
}

const clearAddresses = async () => {
  saveAddresses([])
}
const addAddress = async (address) => {
  const addresses = await fetchAddresses()
  addresses.push(address)
  saveAddresses(addresses)
}

const saveAddresses = async (addresses) => {
  if (process.env.NODE_ENV == "production") {
    // console.log(addresses)
    await chrome.storage.local.set({
      "addresses": addresses,
    })
    return
  }
  const data = JSON.stringify(addresses)
  localStorage.setItem('addresses', data)
}

const deleteAddress = async (address) => {
  let addresses = await fetchAddresses()
  addresses = addresses.filter(add => {
    return !(add == address)
  })
  await saveAddresses(addresses)
}

export default App;

/*global chrome*/