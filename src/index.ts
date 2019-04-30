import * as services from './services'
import * as Capi from 'qcloudapi-sdk'
import * as util from 'util'

interface InitConfig {
  secretId
  secretKey
  region
}

class SDK {
  public config
  public requestHelper

  init(config?: InitConfig) {
    const __config = Object.assign(
      {},
      {
        secretId: process.env.TENCENTCLOUD_SECRETID,
        secretKey: process.env.TENCENTCLOUD_SECRETKEY,
        region: 'ap-guangzhou'
      },
      config
    )

    if (!__config.secretId || !__config.secretKey)
      throw Error('Init failed! Missing secretId or secretKey.')

    this.config = __config
    const capi = new Capi({
      SecretId: __config.secretId,
      SecretKey: __config.secretKey,
      serviceType: 'scf',
      path: '/',
      baseHost: 'tencentcloudapi.com',
      protocol: 'https'
    })
    this.requestHelper = util.promisify(capi.request.bind(capi))
  }
  invoke = services.invoke
}

export default new SDK()