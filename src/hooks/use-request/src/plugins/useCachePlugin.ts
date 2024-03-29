import * as cache from '../utils/cache'
import * as cachePromise from '../utils/cachePromise'
import * as cacheSubscribe from '../utils/cacheSubscribe'
import type { Plugin } from '../types'
import type { CachedData } from '../utils/cache'

const useCachePlugin: Plugin<any, any> = (
  fetchInstance,
  {
    cacheKey,
    cacheTime = 5 * 60 * 1000,
    staleTime = 0,
    setCache: customSetCache,
    getCache: customGetCache,
  }
) => {
  const unSubscribeRef = ref<() => void>()

  const currentPromiseRef = ref<Promise<any>>()

  const _setCache = (key: string, cachedData: CachedData) => {
    if (customSetCache) {
      customSetCache(cachedData)
    } else {
      cache.setCache(key, cacheTime, cachedData)
    }

    cacheSubscribe.trigger(key, cachedData.data)
  }

  const _getCache = (key: string, params: any[] = []) => {
    if (customGetCache) {
      return customGetCache(params)
    }

    return cache.getCache(key)
  }

  onBeforeMount(() => {
    if (!cacheKey) {
      return
    }

    // get data from cache when init
    const cacheData = _getCache(cacheKey)

    if (cacheData && Object.hasOwnProperty.call(cacheData, 'data')) {
      fetchInstance.state.data = cacheData.data

      if (
        staleTime === -1 ||
        new Date().getTime() - cacheData.time <= staleTime
      ) {
        fetchInstance.state.loading = false
      }
    }

    // subscribe same cachekey update, trigger update
    unSubscribeRef.value = cacheSubscribe.subscribe(cacheKey, (data) => {
      fetchInstance.state.data = data
    })
  })

  onBeforeMount(() => {
    unSubscribeRef.value?.()
  })

  if (!cacheKey) {
    return {}
  }

  return {
    onBefore: (params) => {
      const cacheData = _getCache(cacheKey, params)

      if (!cacheData || !Object.hasOwnProperty.call(cacheData, 'data')) {
        return {}
      }

      // If the data is fresh, stop request
      if (
        staleTime === -1 ||
        new Date().getTime() - cacheData.time <= staleTime
      ) {
        return {
          loading: false,
          data: cacheData?.data,
          error: undefined,
          returnNow: true,
        }
      } else {
        // If the data is stale, return data, and request continue
        return {
          data: cacheData?.data,
          error: undefined,
        }
      }
    },
    onRequest: (service, args) => {
      let servicePromise = cachePromise.getCachePromise(cacheKey)

      // If has servicePromise, and is not trigger by self, then use it
      if (servicePromise && servicePromise !== currentPromiseRef.value) {
        return { servicePromise }
      }

      servicePromise = service(...args)
      currentPromiseRef.value = servicePromise
      cachePromise.setCachePromise(cacheKey, servicePromise)

      return { servicePromise }
    },
    onSuccess: (data, params) => {
      if (cacheKey) {
        // cancel subscribe, avoid trgger self
        unSubscribeRef.value?.()

        _setCache(cacheKey, {
          data,
          time: new Date().getTime(),
        })

        // resubscribe
        unSubscribeRef.value = cacheSubscribe.subscribe(cacheKey, (d) => {
          fetchInstance.state.data = d
        })
      }
    },
    onMutate: (data) => {
      if (cacheKey) {
        // cancel subscribe, avoid trigger self
        unSubscribeRef.value?.()

        _setCache(cacheKey, {
          data,
          time: new Date().getTime(),
        })

        // resubscribe
        unSubscribeRef.value = cacheSubscribe.subscribe(cacheKey, (d) => {
          fetchInstance.state.data = d
        })
      }
    },
  }
}

export default useCachePlugin
