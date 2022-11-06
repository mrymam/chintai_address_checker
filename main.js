
const setAllowedAddresses = async (addresses) => {
  await chrome.storage.local.set({
    "addresses": addresses,
  })
}

document.getElementById("load-button").addEventListener("click", async () => {
  const data = await chrome.storage.local.get("addresses")
  // var inputValue = document.getElementById("textarea").value;
  document.getElementById("input-text").value = "hogehoge"
  console.log(inputValue)
  // chrome.storage.local.set({ "memo1": inputValue }, function () { });
});

window.addEventListener('load', async() => {
  const data = await chrome.storage.local.get("addresses")
  console.log(data)
  document.getElementById("textarea").value = "hogehoge"
});