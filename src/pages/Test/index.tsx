import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button, message } from 'antd';
import { usePersistFn } from '@umijs/hooks';
import TestModal from './TestModal';
import Child from './components/Child';
import ExpensiveTree from './components/ExpensiveTree';
import moment from 'moment';
import Holidays from 'date-holidays';
import { usePrint } from '@/utils/usePrint';

// state = 2;

// globalFn = () => {
//   console.log(s);
// };

export default function Test() {
  // const cb = useCallback(
  //   () => {
  //     console.log(a, b, c, d)
  //   },
  //   [a, b, c, d],
  // )
  const { handlePrint } = usePrint();

  const [s, setS] = useState(1);
  const [count, setCount] = useState(0);

  const showCountPersistFn = usePersistFn(() => {
    message.info(`Current count is ${count}`);
  });
  const showCountCommon = useCallback(() => {
    message.info(`Current count is ${count}`);
  }, [count]);

  const tempFn = () => {
    console.log(s);
  };
  const fn = useCallback(tempFn, []);
  // console.log(fn === tempFn);

  // 重载
  // const reverse = (x: number | string): number | string | void => {
  //   if (typeof x === 'number') {
  //     return Number(x.toString().split('').reverse().join(''));
  //   } else if (typeof x === 'string') {
  //     return x.split('').reverse().join('');
  //   }
  // };
  // 然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串。

  // 我们可以使用重载定义多个 reverse 的函数类型：
  // 我们重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示
  function reverse(x: number): number;
  function reverse(x: string): string;
  function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
      return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
      return x.split('').reverse().join('');
    }
  }
  const arr: number[] = [1, 2, 3, 4];
  const arr1: Array<string> = ['cpp', 'wqj', 'xz'];
  // const arr2: [number] = [222, 333, 444]

  let arr3: [string, number];
  arr3 = ['cpp', 10];
  // arr3 = [20, 'wqj'] // 错误写法，必须和定义的数组里面的类型相对应

  // 函数类型
  interface SearchFunc {
    (source: string, subString: string): boolean;
  }
  let mySearch: SearchFunc;
  mySearch = (src: string, sub: string): boolean => {
    let result = src.search(sub);
    return result > -1;
  };

  // 可索引的类型
  interface StringArray {
    [index: number]: string;
  }
  let myArray: StringArray;
  myArray = ['cpp', 'wqj'];
  let myStr: string = myArray[0];

  // 函数
  let myAdd: (baseValue: number, increment: number) => number = function (
    x: number,
    y: number,
  ): number {
    return x + y;
  };

  const A = (x: number, y: number): number => {
    return x + y;
  };

  interface LengthWise {
    length: number;
  }
  function loggingIdentity<T extends LengthWise>(arg: T): T {
    console.log(arg.length);
    return arg;
  }

  interface Named {
    name: string;
  }

  let x: Named;
  let y = { name: 'Alice', location: 'Seattle' };
  x = y;

  return (
    <>
      {s}
      <div onClick={() => setS(s + 1)}>加一</div>
      <div onClick={fn}>输出s的值</div>

      <Button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Add Count
      </Button>
      <ExpensiveTree showCount={showCountPersistFn} />
      <ExpensiveTree showCount={showCountCommon} />
      <h2>
        重载：{reverse(123)}
        {typeof reverse(23)}
      </h2>
      <ul>
        {arr.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
      <ul>
        {arr1.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
      {/* <ul>
        {arr2.map((item) => <li>{item}</li>)}
      </ul> */}
      <ul>
        {arr3.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
      <div>{myStr}</div>
      <div>{myAdd(1, 2)}</div>
      <div>{A(22, 22)}</div>
      <div>{loggingIdentity([123])}</div>
      <button onClick={handlePrint}>测试打印</button>
    </>
  );
}

// const hd = new Holidays('CN', 'la', 'no');
// console.log(hd);
// console.log(hd.getHolidays(2021));
// console.log(hd.isHoliday('2021-09-21'));
// console.log(hd.isHoliday('2021-09-19'));
// export default function Test() {
//   // useState
//   const [count, setCount] = useState<number>(0);
//   const [number, setNumber] = useState<number>(0);
//   const [name, setName] = useState<string>('cpp');
//   // useRef
//   const modalRef = useRef<any>(null);

//   const handleIncrement = useCallback(() => {
//     setCount(count + 1);
//   }, [count]);
//   const handleDecrement = useCallback(() => {
//     setCount(count - 1);
//   }, [count]);

//   const handleOpen = () => {
//     console.log(modalRef.current);
//     modalRef.current?.open();
//   };
//   // useEffect
//   // let timer: any;
//   // const handleCancelTimer = () => {
//   //   clearTimeout(timer);
//   // };
//   // useEffect(() => {
//   //   timer = setTimeout(() => {
//   //     setNumber(number + 2);
//   //   }, 4000);
//   //   return () => {
//   //     clearTimeout(timer);
//   //     console.log('清除定时器', number);
//   //   };
//   // }, []);
//   // [number], []还有不加

//   const handleCalendar = () => {
//     console.log(moment().format());
//   };

//   // useMemo
//   const changeName = () => {
//     setName(name + 1);
//   };

//   let [s, setS] = useState(1);
//   let A = () => {
//     console.log(s);
//   };
//   let fn = useCallback(A, [s]);

//   return (
//     <div>
//       <h1>Test页面</h1>
//       <h2>count: {count}</h2>
//       <h2>number: {number}</h2>
//       <button onClick={handleIncrement}>+</button>
//       <button onClick={handleDecrement}>-</button>
//       <button onClick={handleOpen}>打开</button>
//       <button onClick={handleCalendar}>moment</button>
//       {/* <button onClick={handleCancelTimer}>点击清除定时器</button> */}
//       {/* useRef */}
//       <button onClick={changeName}>改变名字</button>

//       <div>{count}</div>
//       <div>{name}</div>

//       <Child
//         handleIncrement={handleIncrement}
//         handleDecrement={handleDecrement}
//       />
//       <TestModal ref={modalRef} />
//     </div>
//   );
// }
