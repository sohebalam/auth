import React from "react"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { Link } from "@material-ui/core"
import PersonIcon from "@material-ui/icons/Person"
// import { parseCookies } from "nookies"

const ProfileMenu = ({ user }) => {
  // const cookieuser = parseCookies()
  // const user = cookieuser.user ? JSON.parse(cookieuser.user) : ""
  const { _id: id } = user
  // console.log(id)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ color: "white" }}
      >
        <PersonIcon />
        Profile
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link href={`/user/${id}`} underline="none">
          <MenuItem onClick={handleClose}>Personal Details</MenuItem>
        </Link>
        {/* <Link href={`/orders/${orderId}`} underline="none"> */}
        <MenuItem onClick={handleClose}>Orders</MenuItem>
        {/* </Link> */}
        {/* <Link href="/orderslist" underline="none">
          <MenuItem onClick={handleClose}>Orders</MenuItem>
        </Link>
        <Link href="/coursesadmin" underline="none">
          <MenuItem onClick={handleClose}>Courses</MenuItem>
        </Link> */}
      </Menu>
    </div>
  )
}

export default ProfileMenu
