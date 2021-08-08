const { resolve } = require('path')
const { app, Menu, Tray, dialog } = require('electron')
const Store = require('electron-store')

const schema = {
  projects: {
    type: 'string',
  },
}

const store = new Store({ schema });

app.on('ready', () => {
  const tray = new Tray(resolve(__dirname, 'assets', 'iconTemplate.png'));
  const projects = JSON.parse(store.get('projects'))


  console.log(projects);


  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio', checked: true, click: () =>{
      const [path] = dialog.showOpenDialog({ properties: ['openDirectory'] });

      store.set('projects[]', JSON.stringify([ ... projects, path]));
    }}
  ]);

  tray.setToolTip('This is my application');
  tray.setContextMenu(contextMenu);
});
