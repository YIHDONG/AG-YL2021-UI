import React from 'react';
import PropTypes from 'prop-types';
import constants from '../../constants';
import BasicButton from './BasicButton';

const ButtonQuietComponent = ({
  disabled, onClick, children,
}) => (
  <BasicButton
    disabled={disabled}
    onClick={onClick}
    primary={constants.color.buttonQuietAccentPurple}
    secondary={constants.color.buttonQuietPurple}
  >
    {children}
  </BasicButton>
);

ButtonQuietComponent.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

ButtonQuietComponent.defaultProps = {
  disabled: false,
};

export default ButtonQuietComponent;
