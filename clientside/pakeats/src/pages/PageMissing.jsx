import React from 'react'
import { CenterConatiner,Image } from '../styles/globalStyles'
import MyRouterLinkButton from '../components/routerElements/MyRouterLinkButton';

const PageMissing = () => {
  return (
    <CenterConatiner width={"100%"} height={"80vh"} flexDirection={"column"}>
        <Image width={"400px"} height={"300px"} src="./images/PageNotFound.png" />
        <MyRouterLinkButton to={"/"} variant={"contained"} color={"primary"} text={"Go Back to Home Page"} />
    </CenterConatiner>
  )
}

export default PageMissing