// 限制最大请求数

import { Plugin } from '../types'

const useMaxRequestNumberPlugin: Plugin<any, any> = (fetchInstance) => {
  // const allAromiseArr: Array<Promise<any>> = []
  // const excutingPromiseArr: Array<Promise<any>> = []
  let _promiseService: Promise<any>

  return {
    onBefore(params) {
      return {}
    },
    onRequest(service, params) {
      if (service) {
        _promiseService = service(...params)

        fetchInstance.allAromiseArr.push(_promiseService)

        if (
          fetchInstance.excutingPromiseArr.length <
          fetchInstance.maxRequestNumber
        ) {
          fetchInstance.excutingPromiseArr.push(_promiseService)
        } else {
          return {
            stopNow: true,
          }
        }
      }

      const servicePromise = Promise.race(fetchInstance.excutingPromiseArr)

      return { servicePromise, rawServicePromise: _promiseService }
    },
  }
}

export default useMaxRequestNumberPlugin
