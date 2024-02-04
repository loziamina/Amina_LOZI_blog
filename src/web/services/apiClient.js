import axios from "axios"
import { merge } from "@corex/deepmerge"
import config from "@/web/config"

const apiClient = async (url, data = null, options = {}) => {
  try {
    const jwt = typeof window !== "undefined" ? localStorage.getItem(config.security.session.cookie.key) : null
    const headers = jwt ? { authorization: jwt } : {}

    if (!options.method) {
      options.method = data ? "POST" : "GET"
    }

    if (data) {
      options.data = data
    }

    options.headers = merge([headers, options.headers])
    options.withCredentials = true

    const response = await axios(url, options)

    return response.data
  } catch (error) {
    throw error
  }
}

const getUrl = (resource) => {
  if (!Array.isArray(resource)) {
    return `/api/${resource}`
  }

  const [resourceName, resourceId] = resource

  return `/api/${resourceName}/${resourceId}`
}

const makeResourceAction = (method, hasData = true) => async (resource, data, options) => {
  try {
    const response = await apiClient(getUrl(resource), data, { method, ...options })
    return response
  } catch (error) {
    throw error
  }
}

export const readResource = makeResourceAction("GET", false)
export const createResource = makeResourceAction("POST")
export const updateResource = makeResourceAction("PATCH")
export const deleteResource = makeResourceAction("DELETE", false)

export default apiClient
