import React from 'react';

const FancyButton = React.forwardRef((props: any, ref: any) => {
  console.log(props, ref);
  return <button ref={ref}>{props.children}</button>;
});
export default FancyButton;
