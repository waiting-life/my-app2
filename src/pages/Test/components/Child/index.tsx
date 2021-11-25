import React, { memo } from 'react';
const Child = memo((props: any) => {
  console.log('Child render');
  const { handleIncrement, handleDecrement } = props;
  return (
    <div>
      <button onClick={handleIncrement}>+1</button>
      <button onClick={handleDecrement}>-1</button>
    </div>
  );
});
export default Child;
