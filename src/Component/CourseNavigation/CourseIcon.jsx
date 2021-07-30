import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import constants from '../../constants';

const CourseIcon = ({
  pageId, type, status, seen, active, onClick,
}) => {
  const getColor = () => {
    if (seen) {
      switch (status) {
        case 'incorrect':
          return ({
            background: (active ? constants.color.incorrectRed : '#FFFFFF'),
            border: (active ? constants.color.incorrectAccentRed : constants.color.incorrectRed),
          });
        case 'correct':
          return ({
            background: (active ? constants.color.correctGreen : '#FFFFFF'),
            border: (active ? constants.color.correctAccentGreen : constants.color.correctGreen),
          });
        default:
          return ({
            background: (active ? constants.color.defaultBlue : '#FFFFFF'),
            border: (active ? constants.color.defaultAccentBlue : constants.color.defaultBlue),
          });
      }
    } else {
      return ({
        background: (active ? constants.color.grey : '#FFFFFF'),
        border: (active ? constants.color.greyAccent : constants.color.grey),
      });
    }
  };

  const BaseIcon = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${getColor().background};
  border: 6px solid ${getColor().border};
  box-sizing: border-box;
  z-index: 2;
  margin: 10px auto; 
  `;

  const LearnIcon = styled(BaseIcon)`
    border-radius: 10px;
  `;

  const PracticeIcon = styled(BaseIcon)`
    border-radius: 4px;
  `;

  if (type === 'learn') {
    return <LearnIcon onKeyUp={() => onClick(pageId)} onClick={() => onClick(pageId)} role="button" tabIndex="0" />;
  }
  return <PracticeIcon onKeyUp={() => onClick(pageId)} onClick={() => onClick(pageId)} role="button" tabIndex="0" />;
};

CourseIcon.propTypes = {
  pageId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  status: PropTypes.string,
  seen: PropTypes.bool,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

CourseIcon.defaultProps = {
  status: null,
  seen: false,
  active: false,
};

export default CourseIcon;
