"use strict";
const services = require("./services");
const Capi = require("qcloudapi-sdk");
const util = require("util");
const error_1 = require("./helper/error");
const _ = require("lodash");
class SDK {
    constructor() {
        this.invoke = services.invoke;
    }
    init(config) {
        const defaultConfig = {
            secretId: process.env.TENCENTCLOUD_SECRETID,
            secretKey: process.env.TENCENTCLOUD_SECRETKEY,
            token: process.env.TENCENTCLOUD_SESSIONTOKEN,
            region: 'ap-guangzhou'
        };
        const __config = _.omitBy(_.merge({}, defaultConfig, config), _.isUndefined);
        if (!__config.secretId || !__config.secretKey)
            return console.warn(error_1.ERR_MISSING_SECRET);
        this.config = __config;
        const capi = new Capi({
            SecretId: __config.secretId,
            SecretKey: __config.secretKey,
            serviceType: 'scf',
            path: '/',
            baseHost: 'tencentcloudapi.com',
            protocol: 'https'
        });
        this.requestHelper = util.promisify(capi.request.bind(capi));
    }
    _reset() {
        this.config = null;
        this.requestHelper = null;
    }
}
module.exports = new SDK();
