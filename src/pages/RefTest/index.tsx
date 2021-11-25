import React, { useRef, useState, useEffect } from 'react';
import FancyButton from '@/components/FancyButton';

const RefTest = () => {
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   setInterval(() => {
  //     setCount(count + 1);
  //   }, 2000);
  // }, []);

  // useEffect(() => {
  //   setInterval(() => {
  //     setCount((c) => c + 1);
  //   }, 5000);
  // }, []);
  // useEffect(() => {
  //   setInterval(() => {
  //     setCount((count) => count + 1);
  //   });
  // }, []);
  // const myRef = useRef(null);
  // const ref = useRef(null);
  // const handleClick = () => {
  //   console.log(myRef.current);
  // };
  //   useEffect(() => {
  //     const id = setInterval(() => {
  //       setCount((c) => c + 1);
  //     }, 1000);
  //     return () => clearInterval(id);
  //   }, []);

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     //   console.log(count);
  //     setCount(count + 1);
  //   }, 1000);
  //   return () => clearInterval(id);
  // }, []);

  //   useEffect(() => {
  //     let timer: any;
  //     timer = setInterval(() => {
  //       //   console.log(count);
  //       setCount(timer + 1);
  //     }, 1000);
  //     return () => clearInterval(timer);
  //   }, []);

  return (
    <div>
      <h2>RefTest测试页面</h2>
      {/* <button onClick={handleClick} ref={myRef}>
        click
      </button> */}
      {/* <FancyButton ref={ref}>Click me</FancyButton> */}
      <div>{count}</div>
    </div>
  );
};

export default RefTest;

// let _count = 10
// function useState() {
//   function setCount(fn) {
//     if (typeof fn === 'function') {
//       _count = fn(_count)
//     } else {
//       _count = fn
//     }

//   }
//   return [_count, setCount]
// }

// setCount(1)

// setCount((c) => c + 1)
