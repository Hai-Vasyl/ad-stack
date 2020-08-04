import { useCallback } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { resetNavbar } from "../redux/navbar/navbarActions"

function useHTTP() {
  const { token } = useSelector((state) => state.auth)

  const fetchData = useCallback(
    ({ url, method, data, options }) => {
      const makeRequest = async () => {
        const res = await axios({
          url,
          method,
          data,
          headers: token && {
            Authorization: `Basic ${token.token}`,
          },
        })
        return res.data
      }

      if (options.isLocalStorage) {
        return (async function () {
          try {
            const data = await makeRequest()
            return data
          } catch (error) {}
        })()
      }
      return async (dispatch) => {
        try {
          dispatch(options.fetchStart())
          const data = await makeRequest()
          dispatch(options.fetchSuccess({ data, options }))
          dispatch(resetNavbar())
        } catch (error) {
          console.log(error)
          options.fetchFailure &&
            dispatch(options.fetchFailure(error.response.data.errors))
        }
      }
    },
    [token]
  )

  return { fetchData }
}

export default useHTTP
