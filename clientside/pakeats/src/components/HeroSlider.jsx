import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { sliderData } from "../data/sliderData";
import { RouterLink } from "../styles/globalStyles";
import MyButton from "./muiElements/MyButton";
import MyTypography from "./muiElements/MyTypography";

// Styled-Components

const Container = styled(Box)`
  width: 100%;
  height: 85vh;
  background-color: #eeeeee;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled(Box)`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled(Box)`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled(Box)`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled(Box)`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 80%;
`;

const InfoContainer = styled(Box)`
  flex: 1;
  padding: 40px;
`;

const HeroSlider = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [slideIndex, setSlideIndex] = useState(0);
  const [show, setShow] = useState(true);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : (sliderData.length-1));
    } else {
      setSlideIndex(slideIndex < (sliderData.length-1) ? slideIndex + 1 : 0);
    }
  };

  useEffect(() => {

    
    const intervalId = setInterval(() => {
        setSlideIndex((i) => (i + 1) % sliderData.length);
      setShow(true);
      
    },4000);

    return()=>{
        clearInterval(intervalId);
    }

  }, []);

  return (
    <>
      <Container>
        <Arrow direction="left" onClick={() => handleClick("left")}>
          <ArrowLeftOutlined />
        </Arrow>
        <Wrapper slideIndex={slideIndex} slideleft={"translateX(" + slideIndex*-100 + "vw)"}>
          {sliderData.map((slideitem) => (
            <Slide bg={slideitem.bg} key={slideitem.id}>
              {matches ? (
                ""
              ) : (
                <ImgContainer>
                  <Image src={slideitem.img} />
                </ImgContainer>
              )}
              <InfoContainer>
                <MyTypography text={slideitem.title} variant={"h2"} color="neutral.main" gutterBottom={true} />
                <MyTypography text={slideitem.desc} variant={"h5"} color="neutral.main" gutterBottom={true} />

                <RouterLink to={slideitem.src} >
                <MyButton
                  variant={"contained"}
                  size="large"
                  color={"primary"}
                  text={slideitem.btnText}
                />

                </RouterLink>
              </InfoContainer>
            </Slide>
          ))}
        </Wrapper>
        <Arrow direction="right" onClick={() => handleClick("right")}>
          <ArrowRightOutlined />
        </Arrow>
      </Container>
    </>
  );
};

export default HeroSlider;
