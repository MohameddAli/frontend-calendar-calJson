import React from "react";
import styled from "styled-components";
import { DISPLAY_MODE_DAY, DISPLAY_MODE_MONTH } from "../../helpers/constants";

// const DivWrapper = styled('div')`
//   display: flex;
//   justify-content: space-between;
//   background-color: #1E1F21;
// 	color: #DCDDDD;
// 	padding: 16px;
//   direction: rtl;
// `;

// const TextWrapper = styled('span')`
//   font-size: 32px;
// `;

// const TitleWrapper = styled(TextWrapper)`
//   font-weight: bold;
//   margin-right: 8px;
// `;

// const ButtonsWrapper = styled('div')`
//   display: flex;
//   align-items: center;
// `;

// const ButtonWrapper = styled('button')`
//   border: unset;
// 	background-color: #565759;
// 	height: 20px;
// 	margin-right: 2px;
// 	border-radius: 4px;
// 	color: #E6E6E6;
// 	outline: unset;
// 	cursor:pointer;
// `;

// const TodayButton = styled(ButtonWrapper)`
//   padding-right: 16px;
// 	padding-left: 16px;
// 	font-weight: bold;
// `;
const DivWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  background-color: #1E1F21;
	color: #DCDDDD;
	padding: 16px;
  position: relative;
  direction: rtl;
`;


const TextWrapper = styled('span')`
  font-size: 32px;
`;

const TitleWrapper = styled(TextWrapper)`
  font-weight: bold;
  margin-right: 8px;
  margin-left: 8px;
`;

const ButtonsWrapper = styled('div')`
  display: flex;
  align-items: center;
`;

const ButtonsCenterWrapper = styled(ButtonsWrapper)`
  // display: flex;
  position: absolute;
  top: 37%;
  left: 47%;
  transform: translate(50%,-50%);
`;

const ButtonWrapper = styled('button')`
  border: unset;
  background-color: ${props => props.unPressed ? "#27282a" : "#565759"};
  border: 1px solid #565759;
  height: 20px;
  border-radius: 4px;
  color: ${props => props.unPressed ? '#a4a6a9' : "#E6E6E6"};
  outline: unset;
  cursor: pointer;
  &:not(:last-child){
    margin-left: 2px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TodayButton = styled(ButtonWrapper)`
font-weight: bold;

`;

const Monitor = ({today,prevHandler,todayHandler,nextHandler, setDisplayMode, displayMode}) => (
	<DivWrapper>
    <div>
      {
        displayMode === DISPLAY_MODE_DAY ? (
          <TextWrapper>{today.format('DD')}</TextWrapper>
        ) : null
      }
      <TitleWrapper>{today.format('MMMM')} </TitleWrapper>
      <TextWrapper>{today.format('YYYY')}</TextWrapper>
    </div>
    <ButtonsCenterWrapper>
      <ButtonWrapper unPressed={displayMode === DISPLAY_MODE_MONTH} onClick={() => setDisplayMode(DISPLAY_MODE_MONTH)}>شهر</ButtonWrapper>
      <ButtonWrapper unPressed={displayMode === DISPLAY_MODE_DAY} onClick={() => setDisplayMode(DISPLAY_MODE_DAY)}>يوم</ButtonWrapper>
    </ButtonsCenterWrapper>
    
    <ButtonsWrapper>
      <ButtonWrapper onClick={prevHandler}> &lt; </ButtonWrapper>
      <TodayButton onClick={todayHandler}>اليوم</TodayButton>
      <ButtonWrapper onClick={nextHandler}> &gt; </ButtonWrapper>
    </ButtonsWrapper>
  </DivWrapper>
);

export default Monitor;
