import React from "react"
import { emphasize, withStyles } from "@material-ui/core/styles"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import Chip from "@material-ui/core/Chip"
import { Link } from "@material-ui/core"

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(4),
    color: "#000000",
    fontSize: 20,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.grey[300],
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip)

function handleClick(event) {
  event.preventDefault()
  console.info("You clicked a breadcrumb.")
}

export default function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {step1 ? (
        <StyledBreadcrumb
          component="a"
          href="/cart/cart"
          label="1 Cart"
          onClick={() => <Link href="/cart/cart" />}
          style={{ backgroundColor: "#C0C0C0" }}
        />
      ) : (
        <StyledBreadcrumb disabled label="1 Cart" />
      )}
      {step2 ? (
        <StyledBreadcrumb
          component="a"
          href="/cart/address"
          label="2 Address"
          onClick={() => <Link href="/cart/address" />}
          style={{ backgroundColor: "#C0C0C0" }}
        />
      ) : (
        <StyledBreadcrumb disabled label="2 Address" />
      )}
      {step3 ? (
        <StyledBreadcrumb
          component="a"
          href="/cart/payment"
          label="3 Payment"
          onClick={() => <Link href="/cart/payment" />}
          style={{ backgroundColor: "#C0C0C0" }}
        />
      ) : (
        <StyledBreadcrumb disabled label="3 Payment" />
      )}

      {step4 ? (
        <StyledBreadcrumb
          component="a"
          href="/cart/placeorder"
          label="4 Place Order"
          onClick={() => <Link href="/cart/payment" />}
          style={{ backgroundColor: "#C0C0C0" }}
        />
      ) : (
        <StyledBreadcrumb disabled label="4 Place Order" />
      )}
    </Breadcrumbs>
  )
}
