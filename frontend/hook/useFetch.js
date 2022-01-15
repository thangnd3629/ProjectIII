import { useDispatch, useSelector } from "react-redux"
import { fetchWithErrHandler } from "../util/fetchWithErrNotification"
function useFetch() {
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.authReducer.token)
  const send = (api, requestOptions, timeout, withCredential) => {
    let mergedOption = { ...requestOptions }
    if (withCredential && authToken) {
      var authHeader = new Headers()
      authHeader.append("X-Auth-Token", `${authToken}`)
      authHeader.append("Content-Type", "application/json")
      mergedOption = { ...requestOptions, headers: authHeader }
    }
    return fetchWithErrHandler(api, mergedOption, timeout, dispatch)
  }

  return send
}

export default useFetch
