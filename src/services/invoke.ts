import { caseForObject } from '../helper/utils'
import { APIV3Res, APIV3Error } from '../helper/types'

interface Params {
  /**函数名 */
  functionName: string
  /**版本/别名 */
  qualifier?: string
  /**运行函数的参数 */
  clientContext?: string
  /**函数所在命名空间 */
  namespace?: string
}

type Res = APIV3Res<{
  Result: {
    MemUsage: number
    FunctionRequestId: string
    RetMsg: string
    Duration: number
    ErrMsg: string
    BillDuration: number
    InvokeResult: number
    Log: string
  }
}> &
  APIV3Error

/**
 * 第一期只支持同步调用
 * @param params
 */
export default async function(params: Params): Promise<Res> {
  const requestHelper = this.requestHelper
  const region = this.config.region

  const __params = caseForObject(
    Object.assign(
      {
        region,
        namespace: 'default',
        qualifier: '$LATEST'
      },
      params,
      {
        invocationType: 'RequestResponse',
        logType: 'Tail',
        version: '2018-04-16',
        action: 'Invoke'
      }
    ),
    'upper'
  )
  return await requestHelper(__params, {
    serviceType: 'scf'
  })
}