import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import constants from '../../constants';

const Button = styled.button`
  min-width: 30px;
  min-height: 30px; 
  background-color: ${({ primary }) => primary};
  border: 4px solid #000000;
  box-sizing: border-box;
  box-shadow: 2px 4px 0px #000000;
  border-radius: 4px;
  display: block;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;

  :hover {
    color: ${({ secondary }) => secondary};
    path {
      fill: ${({ secondary }) => secondary}
    }  
  }

  :disabled {
    background-color: ${constants.color.grey};
    border-color: ${constants.color.greyAccent};
    box-shadow: none;
    color: ${constants.color.greyAccent};

    path {
      fill: ${constants.color.greyAccent}
    }
  }
`;

const ButtonComponent = ({
  disabled, onClick, children, primary, secondary,
}) => (
  <Button
    disabled={disabled}
    onClick={onClick}
    primary={primary}
    secondary={secondary}
  >
    {children}
  </Button>
);

ButtonComponent.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
};

ButtonComponent.defaultProps = {
  disabled: false,
};

export default ButtonComponent;
