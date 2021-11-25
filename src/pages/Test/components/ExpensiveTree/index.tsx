import React, { memo, useRef } from 'react';
import { Button } from 'antd';
const ExpensiveTree = memo<{ [key: string]: any }>(({ showCount }) => {
  const renderCountRef = useRef(0);
  console.log(renderCountRef.current);
  renderCountRef.current += 1;
  return (
    <div>
      <p>Render Count: {renderCountRef.current}</p>
      <Button onClick={showCount}>showParentCount</Button>
    </div>
  );
});

export default ExpensiveTree;
