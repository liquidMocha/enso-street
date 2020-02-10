import React from 'react';

const PostItemProgressContext = React.createContext({
  firstStepDone: false,
  secondStepDone: false,
  thirdStepDone: false,
});

export default PostItemProgressContext;
