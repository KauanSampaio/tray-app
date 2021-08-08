const { resolve } = require('path')
const { app, Menu, Tray, dialog } = require('electron')
const Store = require('electron-store')

const schema = {
  projects: {
    type: 'string',
  },
}

const store = new Store({ schema });

//Quando o aplicativo estiver pronto, ele executará essa função que colocará o ícone no tray
app.on('ready', () => {
  //Criando um novo ícone no tray e colocando a imagem 'iconTemplate' como ícone
  const tray = new Tray(resolve(__dirname, 'assets', 'iconTemplate.png'));
  const projects = JSON.parse(store.get('projects'))


  console.log(projects);


  //Criando a opção 'Item1' no menu quando clicar no ícone no tray
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio', checked: true, click: () =>{
      //Função realizada ao clicar 'Item1' no tray
      const [path] = dialog.showOpenDialog({ properties: ['openDirectory'] }); //Mostra uma tela para o usuário abrir uma pasta e pega o caminho

      store.set('projects[]', JSON.stringify([ ... projects, path]));
    }}
  ]);

  tray.setToolTip('This is my application');
  tray.setContextMenu(contextMenu);
});
