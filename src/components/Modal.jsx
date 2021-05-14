/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React, { useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import success from './success.png';

const Background = styled.div`
  width: 100%;
  height: 100%;
  /* background: rgba(0, 0, 0, 0.8); */
  background:rgba(37, 150, 255, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 330px;
  min-height: 140px;
  display: grid;
  position: relative;

  background: #FFFFFF;
/* outline-strong */
  border: 2px solid #000000;
  box-sizing: border-box;
  /* drop-shadow-graphic */
  border-radius: 10px;
`;

const HeaderWrapperCorrect = styled.div`
  position: relative;
  height: 30px;

  display: flex;
  justify-content: left;
  align-items: center;

  /* correct-strong */
  background: #00D315;
  /* outline-strong */
  border-bottom: 1.8px solid black;
  border-radius: 8px 8px 0px 0px;
`;

const HeaderWrapperIncorrect = styled.div`
  position: relative;
  height: 30px;

  display: flex;
  justify-content: left;
  align-items: center;

  /* correct-strong */
  background: #FF4D00;
  /* outline-strong */
  border-bottom: 1.8px solid black;
  border-radius: 8px 8px 0px 0px;
`;

const ModalHeader = styled.h1`
  /* position */
  margin-left: 5px;
  text-align: center;

  /* font */
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;

  /* white */
  color: #FFFFFF;
`;

const ModalContent = styled.div`
  display: relative;
  justify-content: left;
  align-items: top;
  position: relative;
  margin-left: 10px;
  margin-right: 10px;
  
  /* body */
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;

  /* text */
  color: #2B1953;
`;

const SuccessImg = styled.img`
  position: relative;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  align-items: center;
  border-radius: 10px 0 0 10px;
  background: #FFFFFF;
`;

const CloseModalButtonCorrect = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  z-index: 10;

  color: #AAFFB2;
  background: #00D315;
  border: 1.4px solid #AAFFB2;
  box-sizing: border-box;
  border-radius: 3px;

  &:hover {
    color: #00D315;
  background: #AAFFB2;
  border: 1.4px solid #00D315;
  }
`;

const CloseModalButtonIncorrect = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  z-index: 10;

  color: #FFBEA2;
  background: #FF4D00;
  border: 1.4px solid #FFBEA2;
  box-sizing: border-box;
  border-radius: 3px;

  &:hover {
    color: #FF4D00;
  background: #FFBEA2;
  border: 1.4px solid #FF4D00;
  }
`;

export default function Modal({
  isCorrect, showModal, children, closeModal,
}) {
  const modalRef = useRef();
  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? 'translateY(0%)' : 'translateY(-100%)',
  });

  if (!showModal) { return null; }
  if (isCorrect) {
    return (
      <>
        <Background ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <HeaderWrapperCorrect>
                <ModalHeader>Correct, well done!</ModalHeader>
              </HeaderWrapperCorrect>
              <SuccessImg src={success} alt="SuccessImg" />
              <CloseModalButtonCorrect onClick={closeModal} />
            </ModalWrapper>
          </animated.div>
        </Background>
      </>
    );
  }
  return (
    <>
      <Background ref={modalRef}>
        <animated.div style={animation}>
          <ModalWrapper showModal={showModal}>
            <HeaderWrapperIncorrect>
              <ModalHeader> Not quite right... </ModalHeader>
            </HeaderWrapperIncorrect>
            <ModalContent>
              {children}
            </ModalContent>
            <CloseModalButtonIncorrect onClick={closeModal} />
          </ModalWrapper>
        </animated.div>
      </Background>
    </>
  );
}
