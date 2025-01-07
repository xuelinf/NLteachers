import { Config } from "./config";
import { HttpClient } from 'tsrpc-browser';
import { serviceProto } from './shared/protocols/serviceProto';

export const apiClient = new HttpClient(serviceProto, Config.tsrpcClientCfg);