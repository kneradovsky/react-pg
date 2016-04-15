import React, { PropTypes } from 'react';

const TransParams = (props) => {
	return (
		<div>
		{props.params}
		</div>
		);
};

TransParams.propTypes = {
  params: PropTypes.element
};

export default TransParams;
