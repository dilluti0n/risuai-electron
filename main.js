const { app, BrowserWindow, protocol } = require('electron');

const path = require('path');
const fs = require('fs');

// 1) app:// 등록은 ready 전에 특권 설정
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true } }
]);

function registerAppProtocol() {
  const distBase = path.join(app.getAppPath(), 'RisuAI', 'dist');
  console.log('base =', distBase);

  protocol.registerFileProtocol('app', (request, callback) => {
    const u = new URL(request.url);              // app://index.html  혹은 app://token/...
    let pathname = u.pathname || '/';

    // 2) 정규화: / -> /index.html, /index.html/ -> /index.html
    if (pathname === '/' || pathname === '') pathname = '/index.html';
    if (pathname.endsWith('/')) pathname = pathname.slice(0, -1);

    // 3) 선행 / 제거 + 디코드
    const rel = decodeURIComponent(pathname).replace(/^\/+/, '');

    const filePath = path.join(distBase, rel);
    // 4) (선택) 존재 확인 로그
    // console.log('app:// ->', filePath, fs.existsSync(filePath) ? 'OK' : 'MISSING');

    callback({ path: filePath });
  });
}

async function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  // await win.loadURL('http://localhost:5174');

  await win.loadURL('app://index.html');
  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  registerAppProtocol();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

