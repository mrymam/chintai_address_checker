'use strict';

const handler = async () => {
  console.log("load")
  const divs = document.getElementsByClassName('bukkenSpec')
  const es = Array.from(divs).map((div) => {
    const tb = div.firstElementChild.firstElementChild
    const ad = tb.getElementsByClassName("address")
    if (ad.length > 0) {
      return ad[1]
    }
    return tb.firstElementChild.lastChild
  })

  const addresses = await getAllowedAddresses()

  for (let i = 0; i < es.length; i++) {
    const el = es[i]
    applyElement(el, addresses)
  }
}

const applyElement = (el, alloweds) => {
  const address = el.innerText
  if (checkAddress(address, alloweds)) {
    el.innerHTML = `<span style="color: blue;font-weight: bold">(OK)</span> ${address}`
  } else {
    el.innerHTML = `<span style="color: red;font-weight: bold">(NG)</span> ${address}`
  }
}

const zenkaku2Hankaku = (str) => {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
}

const checkAddress = (address, allowedAddresses) => {
  address = zenkaku2Hankaku(address)
  for (let i = 0; i < allowedAddresses.length; i++) {
    const a = allowedAddresses[i]
    if (!address.indexOf(a)) {
      return true
    }
  }
  return false
}

const getAllowedAddresses = async () => {
  const data = await chrome.storage.local.get("addresses")
  return data.addresses
}

window.addEventListener('load', () => handler(), false);
window.addEventListener('input', () => handler());
