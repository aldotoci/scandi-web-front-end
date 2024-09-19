import React from 'react';
import { useParams } from 'react-router-dom';

const withRouterParams = (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    return <WrappedComponent {...props} params={params} />;
  };
};

export default withRouterParams;