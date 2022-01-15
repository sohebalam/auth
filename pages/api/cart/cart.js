import baseUrl from "../helpers/baseUrl"
import { parseCookies } from "nookies"
import cookie from "js-cookie"
import { useRouter } from "next/router"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

import StripeCheckout from "react-stripe-checkout"

const Cart = ({ error, products }) => {
  const router = useRouter()

  const { token } = parseCookies()
  const [cProducts, setCartProduct] = useState(products)
  let price = 0
  if (!token) {
    return (
      <div className="center-align">
        <h3>please login to view your cart</h3>
        <Link href="/login">
          <a>
            <button className="btn #1565c0 blue darken-3">Login</button>
          </a>
        </Link>
      </div>
    )
  }
  if (error) {
    M.toast({ html: error, classes: "red" })
    cookie.remove("user")
    cookie.remove("token")
    router.push("/login")
  }
  const handleRemove = async (pid) => {
    const res = await fetch(`${baseUrl}/api/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        productId: pid,
      }),
    })

    const res2 = await res.json()
    setCartProduct(res2)
  }
  const CartItems = () => {
    return (
      <>
        <div className="container">
          {cProducts.map((item) => {
            price = price + item.quantity * item.product.price
            return (
              <div style={{ display: "flex", margin: "20px" }} key={item._id}>
                <Image
                  src={item.product.selectedFile}
                  width="200rem"
                  height="100rem"
                />
                <div style={{ marginLeft: "20px" }}>
                  <h6>{item.product.name}</h6>
                  <h6>
                    {item.quantity} x £ {item.product.price}
                  </h6>
                  <button
                    className="btn red"
                    onClick={() => {
                      handleRemove(item.product._id)
                    }}
                  >
                    remove
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </>
    )
  }

  const handleCheckout = async (paymentInfo) => {
    console.log(paymentInfo)
    const res = await fetch(`${baseUrl}/api/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        paymentInfo,
      }),
    })
    const res2 = await res.json()
    M.toast({ html: res2.mesage, classes: "green " })
    router.push("/")
  }

  const TotalPrice = () => {
    return (
      <>
      
      <div
        className="container"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h5>Total £ {price}</h5>
        {products.length != 0 && (
          <StripeCheckout
            name="My store"
            amount={price * 100}
            image={products.length > 0 ? products[0].product.selectedFile : ""}
            currency="GBP"
            // shippingAddress={true}
            billingAddress={true}
            zipCode={true}
            stripeKey="pk_test_51H3gVIARrn8JZG3gx2b4WTqj6pl7AsVTUfY3e8u8u8vdRnZ4uCGrFOOD0wbm1lubTqMbQxlZtpPIjx49EXY8MNpo00BzYLddFg"
            token={(paymentInfo) => handleCheckout(paymentInfo)}
          >
            <button className="btn">Checkout</button>
          </StripeCheckout>
        )}
      </div>
      <div
        className="container">
       <Link href='/'>
       
        <button className="btn align: right">Continue Shopping</button>
       </Link>
        </div>
      </>
    )
  }
  return (
    <div className="container">
      <CartItems />
      <TotalPrice />
    </div>
  )
}

const redirectOnError = (ctx) =>
  typeof window !== "undefined"
    ? router.push("/")
    : ctx.res.writeHead(302, { Location: "/" }).end()

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx)

  const res = await fetch(`${baseUrl}/api/cart`, {
    headers: {
      Authorization: token,
    },
  })

  try {
    let products = []
    products = await res.json()
    if (products.error) {
      return {
        props: { error: products.error },
      }
    }

    return {
      props: { products },
    }
  } catch (error) {
    return redirectOnError(ctx)
  }
}

export default Cart
