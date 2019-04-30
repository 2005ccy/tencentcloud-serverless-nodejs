import * as services from './services';
interface InitConfig {
    secretId: any;
    secretKey: any;
    region: any;
}
declare class SDK {
    config: any;
    requestHelper: any;
    init(config?: InitConfig): void;
    invoke: typeof services.invoke;
}
declare const _default: SDK;
export default _default;