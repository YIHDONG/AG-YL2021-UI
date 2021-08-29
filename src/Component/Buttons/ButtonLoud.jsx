import React from 'react';
import PropTypes from 'prop-types';
import constants from '../../constants';
import BasicButton from './BasicButton';

const ButtonLoudComponent = ({
  disabled, onClick, children,
}) => (
  <BasicButton
    disabled={disabled}
    onClick={onClick}
    primary={constants.color.buttonLoudAccentRed}
    secondary={constants.color.buttonLoudRed}
  >
    {children}
  </BasicButton>
);

ButtonLoudComponent.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

ButtonLoudComponent.defaultProps = {
  disabled: false,
};

export default ButtonLoudComponent;
