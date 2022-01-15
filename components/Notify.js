import { CircularProgress } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useContext } from "react"
import { DataContext } from "../store/GlobalState"

const Notify = () => {
  const { state, dispatch } = useContext(DataContext)
  const { notify, auth } = state
  return (
    <>
      {notify.loading && <CircularProgress />}
      {notify.error && <Alert severity="error">{notify.error}</Alert>}
      {notify.success && <Alert severity="success">{notify.success}</Alert>}
    </>
  )
}

export default Notify
