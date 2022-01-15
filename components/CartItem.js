import { TableRow, TableCell, Button } from "@material-ui/core"
import Link from "next/link"
import Image from "next/image"
import DeleteIcon from "@material-ui/icons/Delete"
import { increase, decrease } from "../store/Actions"
import { Alert } from "@material-ui/lab"
import Dialog from "../components/Dialog"
import { useState } from "react"

const CartItem = ({ item, dispatch, cart }) => {
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
  })

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    })
    // employeeService.deleteEmployee(id)
    // setRecords(employeeService.getAllEmployees())
    // setNotify({
    //   isOpen: true,
    //   message: "Deleted Successfully",
    //   type: "error",
    // })
  }

  return (
    <>
      <TableRow>
        <TableCell>
          <Image src={item.selectedFile} height="150rem" width="250rem" />
        </TableCell>
        <TableCell size="small">
          <Link href={`/product/${item._id}`}>
            <a>{item.title}</a>
          </Link>
        </TableCell>
        <TableCell size="small">
          <Button
            onClick={() => dispatch(decrease(cart, item._id))}
            disabled={item.quantity === 0 ? true : false}
          >
            -
          </Button>{" "}
          <a>{item.quantity}</a>
          <Button
            onClick={() => dispatch(increase(cart, item._id))}

            // onSubmit={
            //   item.quantity === 1 ? (
            //     <Alert severity="warning">
            //       Only one course will be added to your account
            //     </Alert>
            //   ) : (
            //     false
            //   )
            // }
          >
            +
          </Button>
        </TableCell>
        <TableCell>
          <a>{item.price}</a>
        </TableCell>
        <TableCell>
          <Button
            onClick={() => {
              setConfirmDialog({
                isOpen: true,
                title: "Are you sure to delete this record?",
                // subTitle: "You can't undo this operation",
                onConfirm: () => {
                  onDelete(item.id)
                },
              })
              dispatch({
                type: "ADD_MODAL",
                payload: { data: cart, id: item._id, title: item.title },
              })
            }}
          >
            <DeleteIcon />
          </Button>
        </TableCell>
        <TableCell></TableCell>
      </TableRow>
      <Dialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  )
}

export default CartItem
