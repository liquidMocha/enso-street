import PropTypes from 'prop-types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

const PostItemTitleBar = ({
  hideBackButton, backLink, title, renderRightItem,
}) => {
  const history = useHistory();

  return (
    <div className="fixed-title-bar">
      {hideBackButton ? <span />
        : (
          <span onClick={() => {
            history.push(backLink);
          }}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </span>
        )}
      <h1>{title}</h1>
      {renderRightItem
        ? renderRightItem()
        : (
          <h3
            className="fixed-title-bar__right-element"
            onClick={() => {
              history.push('/');
            }}
          >
            Cancel
          </h3>
        )}
    </div>
  );
};

PostItemTitleBar.propTypes = {
  hideBackButton: PropTypes.bool,
  backLink: PropTypes.string,
  title: PropTypes.string.isRequired,
  renderRightItem: PropTypes.func,
};

PostItemTitleBar.defaultProps = {
  hideBackButton: false,
  backLink: '',
  renderRightItem: undefined,
};

export default PostItemTitleBar;
