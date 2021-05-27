/*
A modal component (actually a function) created by Matt in May, 2021.
The user can either create a correct or incorrect modal based on the answer of the user.
A correct modal has its own styles and an img of encouragement.
An incorrect modal also has its own styles and have some feedback passed from its parent.
*/
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import success from './resources/success.png';

/* **************************Styles using styled-components******************************** */
const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background:rgba(37, 150, 255, 0.5);
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalWrapper = styled.div`
  width: 330px;
  min-height: 140px;
  display: grid;
  position: relative;

  background: #FFFFFF;
  border: 4px solid #000000;
  box-sizing: border-box;
  border-radius: 8px;
`;

const HeaderWrapperCorrect = styled.div`
  position: relative;
  height: 34px;

  display: flex;
  justify-content: left;
  align-items: center;

  background: #00D315;
  border-bottom: 4px solid black;
  border-radius: 4px 4px 0px 0px;
  padding: 5px;
`;

const HeaderWrapperIncorrect = styled.div`
  position: relative;
  height: 34px;

  display: flex;
  justify-content: left;
  align-items: center;

  background: #FF4D00;
  border-bottom: 4px solid black;
  border-radius: 4px 4px 0px 0px;
  padding: 5px;
`;

const HeaderWrapperDefault = styled.div`
  position: relative;
  height: 34px;

  display: flex;
  justify-content: left;
  align-items: center;

  background: #2596FF;
  border-bottom: 4px solid black;
  border-radius: 4px 4px 0px 0px;
  padding: 5px;
`;

const ModalHeader = styled.h1`
  margin-left: 5px;
  text-align: center;

  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;

  color: #FFFFFF;
`;

const ModalContent = styled.div`
  display: relative;
  justify-content: left;
  align-items: top;
  position: relative;
  margin-left: 10px;
  margin-right: 10px;
  
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;

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

const CloseModalButtonDefault = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  z-index: 10;

  color: #B3DAFF;
  background: #2596FF;
  border: 1.4px solid #B3DAFF;
  box-sizing: border-box;
  border-radius: 3px;

  &:hover {
    color:  #2596FF;
    background: #B3DAFF;
    border: 1.4px solid #2596FF;
  }
`;

/* **************************Function that  returns a modal******************************* */
export default function Modal({
  title, status, showModal, children, closeModal,
}) {
  const modalRef = useRef();
  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? 'translateY(0%)' : 'translateY(-100%)',
  });

  let modalJsx;
  if (status === 'incorrect') {
    modalJsx = (
      <>
        <HeaderWrapperIncorrect>
          <ModalHeader>{title}</ModalHeader>
        </HeaderWrapperIncorrect>
        <ModalContent>
          {children}
        </ModalContent>
        <CloseModalButtonIncorrect onClick={closeModal} />
      </>
    );
  } else if (status === 'correct') {
    modalJsx = (
      <>
        <HeaderWrapperCorrect>
          <ModalHeader>{title}</ModalHeader>
        </HeaderWrapperCorrect>
        <ModalContent display="none">
          {children}
        </ModalContent>
        <SuccessImg src={success} alt="SuccessImg" />
        <CloseModalButtonCorrect onClick={closeModal} />
      </>
    );
  } else {
    modalJsx = (
      <>
        <HeaderWrapperDefault>
          <ModalHeader>{title}</ModalHeader>
        </HeaderWrapperDefault>
        <ModalContent display="none">
          {children}
        </ModalContent>
        <CloseModalButtonDefault onClick={closeModal} />
      </>
    );
  }

  return (showModal
    && (
      <Background data-testid="modal-correct" ref={modalRef} onClick={closeModal}>
        <animated.div style={animation}>
          <ModalWrapper showModal={showModal}>
            {modalJsx}
          </ModalWrapper>
        </animated.div>
      </Background>
    )
  );
}
Modal.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  children: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};
Modal.defaultProps = {
  children: '',
};
