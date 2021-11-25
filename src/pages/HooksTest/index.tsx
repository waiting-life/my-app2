import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// 1. useState实现原理
// 伪代码
// 简单实现，只有一个useState的情况
//   function _useState(initialState: any) {
//     let _state = initialState;
//     const _setState = (newState: any) => {
//       _state = newState;
//     };
//     ReactDOM.render(<App />, rootElement);
//     return [_state, _setState];
//   }

//   const [count, setCount] = _useState(0);
// let _state: any;
// function _useState(initialState: any) {
//     _state = _state || initialState
//     const _setState = (newState: any) => {
//         _state = newState
//     }
//     ReactDOM.render(<App />, rootElement);
//     return [_state, _setState]
// }
// const [count, setCount] = _useState(0)

// 使用了多个useState的时候
// let _state: any[] = [],
//   _index = 0;
// function _useState(initialState: any) {
//   let curIndex = _index;
//   _state[curIndex] =
//     _state[curIndex] === undefined ? initialState : _state[curIndex];
//   const _setState = (newState: any) => {
//     _state[curIndex] = newState;
//     ReactDOM.render(<HooksTest />, document.getElementById('root'));
//     _index = 0; // 每更新一次都要将_index重新归零，才不会重复增加_state
//   };
//   _index += 1; // 下一个操作的索引
//   return [_state[curIndex], _setState];
// }

// 回调函数的形式
let _state: any[] = [],
  _index = 0;
function _useState(initialState: any) {
  let curIndex = _index;
  _state[curIndex] =
    _state[curIndex] === undefined ? initialState : _state[curIndex];
  const _setState = (newState: any) => {
    if (typeof newState === 'function') {
      newState = newState(_state[curIndex]);
    }
    _state[curIndex] = newState;
    ReactDOM.render(<HooksTest />, document.getElementById('root'));
    _index = 0; // 每更新一次都要将_index重新归零，才不会重复增加_state
  };
  _index += 1; // 下一个操作的索引
  return [_state[curIndex], _setState];
}

// 2. useEffect实现原理
let _deps: any; // _deps记录上一次的依赖
function _useEffect(callback: any, depArray?: any) {
  const hasNoDeps = !depArray; // 如果dependencies不存在
  const hasChangeDeps = _deps
    ? !depArray.every((el: any, i: any) => el === _deps[i])
    : true;
  // 如果 dependencies 不存在，或者 dependencies 有变化
  if (hasNoDeps || hasChangeDeps) {
    callback();
    _deps = depArray;
  }
}

const HooksTest = () => {
  const [count, setCount] = _useState(0);
  const [name, setName] = _useState('cpp');
  const [age, setAge] = _useState(0);
  //   const [number, setNumber] = _useState(0);
  //   _useEffect(() => {
  //     setInterval(() => {
  //       setNumber(number + 1);
  //     }, 2000);
  //   }, [number]);

  const handleAdd = () => {
    console.log(count);
    setCount(count + 1);
  };
  const handleNameChange = () => {
    setName('cjz' + Math.random());
  };
  const handleAgeChange = () => {
    setAge((age: number): number => age + 1);
  };
  return (
    <div>
      <h2>Hooks实现测试页面</h2>
      <div>
        count: {count} name: {name} 年龄: {age}
      </div>
      {/* <div>number: {number}</div> */}

      <button onClick={handleAdd}>+1</button>
      <button onClick={handleNameChange}>修改名字</button>
      <button onClick={handleAgeChange}>增加年龄</button>
    </div>
  );
};
export default HooksTest;
