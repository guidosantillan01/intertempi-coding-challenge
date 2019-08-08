const { app, BrowserWindow, Menu } = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'intertempi Desktop App'
  });

  mainWindow.loadFile('src/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
}

function signupUser() {
  console.log('Signing up User');
}

function loginUser() {
  console.log('Loggin in User');
}

function logoutUser() {
  console.log('Loggin out User');
}

const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Signup',
        click() {
          signupUser();
        }
      },
      {
        label: 'Login',
        click() {
          loginUser();
        }
      },
      {
        label: 'Logout',
        click() {
          logoutUser();
        }
      },
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  }
];

app.on('ready', createWindow);

// Add empty object to menu
if (process.platform === 'darwin') {
  mainMenuTemplate.unshift({});
}

// Add developer tools when development mode
if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        accelerator:
          process.platform === 'darwin' ? 'Command+Shift+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload',
        accelerator: 'F5'
      }
    ]
  });
}

// app.on('window-all-closed', function() {
//   if (process.platform !== 'darwin') app.quit();
// });

// app.on('activate', function() {
//   if (mainWindow === null) createWindow();
// });
