import React from 'react';

const TsTest = () => {
  // 元组
  let person: [string, number] = ['cpp', 22];
  person = ['cjz', 2];

  // 接口
  // 函数类型： 接口能够描述JavaScript中对象拥有的各种各样的外形，除了描述带有属性的普通对象外，接口也可以描述函数类型
  // 为了使用接口表示函数类型，我们需要给接口定义一个调用签名。它就像是一个只有参数列表和返回值类型的函数定义，参数列表里的每个参数都需要名字和类型
  interface searchFunc {
    (source: string, subString: string): boolean;
  }
  let mySearch: searchFunc;
  mySearch = function (source: string, subString: string): boolean {
    let result = source.search(subString);
    return result > -1;
  };
  const searchResult = mySearch('cpp', 'w');
  console.log(searchResult);

  // 可索引的类型
  // 与使用接口描述函数类型差不多，我们也可以描述那些能够"通过索引得到"的类型。
  // 可索引类型剧有一个索引签名，它描述了对象索引的类型，还有相应的索引返回值的类型
  interface StringArray {
    [index: number]: string;
  }
  // 我们定义了StringArray接口，它具有索引签名。 这个索引签名表示了当用 number去索引StringArray时会得到string类型的返回值。
  let myArray: StringArray = ['cppp', 'cjz'];
  let myStr: string = myArray[0];
  console.log(myStr); // cppp

  //

  // person = ['cpp', 22, '男']  // 不能将类型“[string, number, string]”分配给类型“[string, number]”。

  // const identity = <T extends string>(name: T) => name;
  // const identity = <T,>(name: T) => name;
  // const myIdentity = identity;

  // 可以使用带有调用签名的对象字面量来定义泛型函数：
  // const myIdentity: { <T>(name: T): T } = identity;

  // 也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。
  //   const myIdentity: <U>(name: U) => U = identity;

  interface GenericIdentityFn {
    <T>(arg: T): T;
  }
  const identity = <T,>(arg: T) => arg;
  const myIdentity: GenericIdentityFn = identity;

  interface GenericIdentityFn1<T> {
    (arg: T): T;
  }
  const myIdentity1: GenericIdentityFn1<string> = identity;

  //   class GenericNumber<T> {
  //       zeroValue: T;
  //       add: (x: T, y: T) => T;
  //   }
  //   const myGenericNumber = new GenericNumber<number>()
  //   myGenericNumbe.zeroValue = 0
  //   myGenericNumbe.add = (x, y ) => x+y

  interface LengthWise {
    length: number;
  }
  const loggingIdentity = <T extends LengthWise>(arg: T): T => {
    console.log(arg.length);
    return arg;
  };
  // const loggingIdentity1 = <T,>(arg: T): T => {
  //     console.log(arg.length)
  //     return arg
  // }

  // 枚举
  // 1. 数字枚举
  // 带初始值
  // enum Direction {
  //   UP = 1,
  //   DOWN,
  //   LEFT,
  //   RIGHT,
  // }
  // 不带初始值
  enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT,
  }
  // 错误的写法
  // enum E {
  //   A = 'c',
  //   B,
  // }

  enum E {
    B,
    A = 'c',
  }
  const { length, value } = loggingIdentity({ length: 10, value: 222 });

  // 高级类型
  // 1. 交叉类型
  const padLeft = (value: string, padding: any) => {
    if (typeof padding === 'number') {
      console.log(Array(padding + 1).join(' '));
      return Array(padding + 1).join(' ') + value;
    }
    if (typeof padding === 'string') {
      return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
  };
  const padleft = padLeft('hello', 3);
  console.log(padleft);

  type a = {
    name: string;
  };
  type b = {
    age: number;
  };
  // const o: a | b = {
  //   name: 'cpp',
  // };

  let o: a & b = {
    name: 'aka',
    age: 20,
  };
  const o1: a & b = {
    age: 222,
    name: 'cjz',
  };
  // 必须这两个都有
  // const o2: a & b = {
  //   name: 'cpp'
  // }

  // typeof 类型保护
  function padLeft1(value: string, padding: string | number) {
    if (typeof padding === 'number') {
      return Array(padding + 1).join(' ') + value;
    }
    if (typeof padding === 'string') {
      return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
  }
  const pdl1 = padLeft1('Hello', '3333');

  // 可以为null的类型
  // let s: string
  // s = undefined
  // s = null

  let s: string | null | undefined;
  s = null;
  s = undefined;

  function fn(x: number, y?: number) {
    return x + (y || 0);
  }
  fn(1, 2);
  fn(1, undefined);
  fn(1);
  // fn(1, null) //  类型“null”的参数不能赋给类型“number | undefined”的参数。

  let obj: { a: string; b?: number } = {
    a: 'cpp',
  };
  console.log(obj.a, obj.b);
  obj.a = 'cjz';
  // obj.a = undefined  // 不能将类型“undefined”分配给类型“string”
  obj.b = 12;
  obj.b = undefined;

  // 类型保护与类型断言
  // 由于可以为null的类型是通过联合类型来实现的，所以你需要使用类型保护来去除null
  function f(sn: string | null): string {
    if (sn === null) {
      return 'default';
    } else {
      return sn;
    }
  }
  // 这里很明显去除了null，也可以使用短路运算符
  function f1(sn: string | null): string {
    return sn || 'default';
  }
  // 如果编译器不能去除null和undefined，可以使用类型断言手动去除
  // function broken(name: string | null): string {
  //   function postfix(epithet: string) {
  //     return name.charAt(0) + '. the' + epithet; // error: 对象可能为 "null"
  //   }
  //   name = name || 'cpp'
  //   return postfix('wqj')
  // }

  function broken(name: string | null): string {
    function postfix(epithet: string) {
      return name!.charAt(0) + '. the' + epithet;
    }
    name = name || 'cpp';
    return postfix('wqj');
  }
  const result = broken('cjz');
  console.log(result);

  // 类型别名
  type Name = string;
  type NameResolver = () => string;
  type NameOrResolver = Name | NameResolver;
  function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
      return n;
    } else {
      return n();
    }
  }
  const name = getName('www');
  console.log(name);
  // 类型别名和接口的区别
  // type Alias = { num: number }
  // interface Interface {
  //     num: number;
  // }
  // declare function aliased(arg: Alias): Alias;
  // declare function interfaced(arg: Interface): Interface;
  // instanceof类型保护

  return (
    <div>
      <h2>TsTest测试页面</h2>
      <h3>泛型</h3>
      <p>{identity('cpp')}</p>
      <p>{myIdentity([111, 222])}</p>
      <p>{myIdentity1('www')}</p>
      <p>{loggingIdentity('cppwqj')}</p>
      <p>
        {length}: {value}
      </p>
      <div>{Direction.UP}</div>
      <div>{Direction.DOWN}</div>
      <div>{Direction.LEFT}</div>
      <div>{Direction.RIGHT}</div>
      <div>{E.A}</div>
      <div>{E.B}</div>
      <div>{padleft}</div>
      <div>
        {o.name}
        {o.age}
        {o1.name}
        {o1.age}
      </div>
      <div>{pdl1}</div>
      <div>{obj.a}</div>
      <div>{obj.b}</div>
      <div>{result}</div>
    </div>
  );
};
export default TsTest;
