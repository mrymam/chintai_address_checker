'use strict';

const handler = () => {
  console.log("on load")
  const es = document.getElementsByClassName('cassetteitem_detail-col1')
  // console.log(es)
  // console.log(es[0].innerText)

  for (let i = 0; i < es.length; i++) {
    const el = es[i]
    applyElement(el)
  }
}

const applyElement = (el) => {
  const address = el.innerText
  if (address == "東京都渋谷区神泉町") {
    el.innerText = `(OK) ${address}`
  } else {
    el.innerText = `(NG) ${address}`
  }
}

window.addEventListener('load', () => handler(), false);
window.addEventListener('input', () => handler());
