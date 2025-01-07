import * as path from "path";
import * as process from "process";
import { HttpServer, WsServer } from "tsrpc";
import { serviceProto } from "./shared/protocols/serviceProto";
import { Config } from "./config";
import { CommunicationMode } from "./define/define";
import { CheckRedisPrefix } from "./define/redis";

// Create the Server
const httpServer = new HttpServer(serviceProto, {
    port: Config.httpPort,
    json: Config.mode === CommunicationMode.JSON,
});
const wsServer = new WsServer(serviceProto, {
    port: Config.wsPort,
    json: Config.mode === CommunicationMode.JSON,
});

// Initialize before server start
async function init() {
    CheckRedisPrefix();
    await process.loadEnvFile();

    // Auto implement APIs
    await httpServer.autoImplementApi(path.resolve(__dirname, 'api'));
    await wsServer.autoImplementApi(path.resolve(__dirname, 'api'));
};

// Entry function
async function main() {
    await init();
    Promise.all([
        httpServer.start(),
        wsServer.start(),
    ]);
};
main();