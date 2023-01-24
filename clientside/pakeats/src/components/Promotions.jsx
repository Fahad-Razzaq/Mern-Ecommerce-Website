import { Box, Slide } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PromotionsData from '../data/PromotionsData'
import MyTypography from './muiElements/MyTypography'

const PromotionsContainer = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding: 6px;
    background-color: #008080;
`

const Promotions = () => {
    const [promotionsIndex,setPromotionsIndex] = useState(0);
    const [promotionsshow,setPromotionsShow] = useState(true);

    let messages = [];
    PromotionsData.map((promotion)=>{
        return (
            messages.push(promotion.message)
        )
    })

    useEffect(() => {

        setTimeout(() => {
            setPromotionsShow(false);
        }, 3000);
    
        const intervalId = setInterval(() => {
            setPromotionsIndex((i) => (i + 1) % messages.length);
          setPromotionsShow(true);
          setTimeout(() => {
            setPromotionsShow(false);
        }, 3000);
        },4000);
    
        return()=>{
            clearInterval(intervalId);
        }
    
      }, []);

  return (
    <PromotionsContainer>
        <Slide direction={promotionsshow ? "left" : "right" } in={promotionsshow}>
            <Box display={"flex"} justifyContent="center" alignItems={"center"} >
                <MyTypography text={messages[promotionsIndex]} variant={"body1"} color="neutral.contrastText" />
            </Box>
        </Slide>
    </PromotionsContainer>
  )
}

export default Promotions