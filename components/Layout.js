import { Container } from "@material-ui/core"
import React from "react"
import NavBar from "./NavBar"
import Footer from "../components/Footer"

function Layout({ children }) {
  return (
    <Container>
      <NavBar />
      {children}
      <Footer />
    </Container>
  )
}

export default Layout
