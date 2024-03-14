const { contextBridge, ipcRenderer } = require('electron')


window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})

contextBridge.exposeInMainWorld(
  'electron',
  {
    displayimage: (data, imgName) => { // Add a second argument for the stock name
      let image = new Image();
      image.src = "data:image/png;base64," + data;

      image.onload = function() {
        ipcRenderer.invoke('create-window', { width: this.width, height: this.height, url: image.src, title: imgName }) // Pass the stock name
      }
    }
  }
)
