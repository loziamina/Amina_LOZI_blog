import axios from "axios"
import { merge } from "@corex/deepmerge"
import config from "@/web/config"

const apiClient = (url, data, options) => {
  const jwt = typeof window !== "undefined" ? localStorage.getItem(config.security.session.cookie.key) : null
  const headers = jwt ? { authorization: jwt } : {}

  if (!options) {
    return axios(url, merge([data, { headers }, { withCredentials: true }]))
  }

  return axios(url, merge([options, { headers, data, withCredentials: true }]))
}

const getUrl = (resource) => {
  if (!Array.isArray(resource)) {
    return `/api/${resource}`
  }

  const [resourceName, resourceId] = resource

  return `/api/${resourceName}/${resourceId}`
};

const makeResourceAction = (method, hasData = true) =>
  hasData
    ? (resource, data, options) =>
        apiClient(getUrl(resource), data, { method, ...options })
    : (resource, options) => apiClient(getUrl(resource), { method, ...options })

export const readResource = makeResourceAction("GET", false)
export const createResource = makeResourceAction("POST")
export const updateResource = makeResourceAction("PATCH")
export const deleteResource = makeResourceAction("DELETE", false)

export default apiClient
