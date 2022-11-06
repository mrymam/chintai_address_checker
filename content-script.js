'use strict';

const handler = async () => {
  console.log("on load")
  const es = document.getElementsByClassName('cassetteitem_detail-col1')

  await setAllowedAddresses(["東京都渋谷区神泉町", "東京都渋谷区円山町"])
  const addresses = await getAllowedAddresses()

  for (let i = 0; i < es.length; i++) {
    const el = es[i]
    applyElement(el, addresses)
  }
}

const applyElement = (el, alloweds) => {
  const address = el.innerText
  if (checkAddress(address, alloweds)) {
    el.innerText = `(OK) ${address}`
  } else {
    el.innerText = `(NG) ${address}`
  }
}

const checkAddress = (address, allowedAddresses) => {
  for (let i = 0; i < allowedAddresses.length; i++) {
    const a = allowedAddresses[i]
    if (address == a) {
      return true
    }
  }
  return false
}

const getAllowedAddresses = async () => {
  const data = await chrome.storage.local.get("addresses")
  console.log(data)
  return data.addresses
}

const setAllowedAddresses = async (addresses) => {
  await chrome.storage.local.set({
    "addresses": addresses,
  })
}

window.addEventListener('load', () => handler(), false);
window.addEventListener('input', () => handler());
