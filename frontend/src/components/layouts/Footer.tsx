import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import {FooterTitle} from "../../style"

const Footer: React.FC = () => {

  return (
    <>
      <AppBar position="static" color="default">
        <FooterTitle>
            (c)2022 Creator PortFolioSite 
            
        </FooterTitle>
      </AppBar>
    </>
  )
}

export default Footer