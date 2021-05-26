/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';

const HeaderContainer = styled.div`
  position: relative;
  margin: auto;
  width: 50%;
  height: 60px;
  vertical-align: middle;
  text-align: center;
  align-items: center;
 `;

const Header = styled.div`
  display: inline-block;
  margin: auto;
  padding: 2px;
  position: relative;
  padding-left: 30px;
  padding-right: 30px;
  border: 4px solid #000000;
  box-sizing: boarder-box;
  box-shadow: 2px 4px 0px #000000;
  border-radius: 35px;
  /*  font setting */
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  color:#2B1953;
  text-align: center;
  align-items: center;
 `;

const ButtonBackward = styled(BsFillCaretLeftFill)`
  position: relative;
  top: 9px;
  right: 6px;
  width: 44px;
  height: 44px;
  color: #2596FF;
  &:hover {
    color: #73b6f5;
  }
 `;

const ButtonForward = styled(BsFillCaretRightFill)`
position: relative;
  top: 9px;
  left: 6px;
  width: 44px;
  height: 44px;
  color: #2596FF;
  &:hover {
    color: #73b6f5;
  }
`;

export default function Heading({
  status, pageTitle, onGoToPage, nextPageId, previousPageId,
}) {
  const changeColor = () => {
    if (status === 'correct') {
      return '#91f39a';
    }
    if (status === 'incorrect') {
      return 'rgb(245, 178, 178)';
    }
    return '#B3DAFF';
  };
  Heading.propTypes = {
    status: PropTypes.string,
    nextPageId: PropTypes.string,
    previousPageId: PropTypes.string,
    onGoToPage: PropTypes.func.isRequired,
    pageTitle: PropTypes.string.isRequired,
  };

  Heading.defaultProps = {
    status: 'default',
    nextPageId: null,
    previousPageId: null,
  };

  return (
    <HeaderContainer>
      <Header style={{ backgroundColor: changeColor() }}>
        {previousPageId && (
        <ButtonBackward
          type="button"
          onClick={() => onGoToPage(previousPageId)}
          style={{ display: previousPageId }}
        >
          back
        </ButtonBackward>
        )}
        {pageTitle}
        {nextPageId && (
        <ButtonForward
          type="button"
          onClick={() => onGoToPage(nextPageId)}
          style={{ display: nextPageId }}
        >
          foward
        </ButtonForward>
        )}
      </Header>
    </HeaderContainer>
  );
}
