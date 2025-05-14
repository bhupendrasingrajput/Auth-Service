import './loadVariables.js';
import cluster from 'cluster';
import os from 'os';
import startApp from './app.js';
import config from './config/index.js';

const numCPUs = config.environment === 'development' ? 2 : os.cpus().length;
const PORT = config.port;

if (cluster.isPrimary) {
    console.log(`🧠 Primary process ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) cluster.fork();

    cluster.on('exit', (worker, code, signal) => {
        console.error(`💥 Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });
} else {
    (async () => {
        try {
            const app = await startApp();

            app.listen(PORT, () => {
                console.log(`🚀 Worker processs ${process.pid} running on port ${PORT}`);
            });
        } catch (err) {
            console.error('❌ Auth service startup failed:', err);
            process.exit(1);
        }
    })();
}
