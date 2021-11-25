import React, { useState, useEffect } from 'react';
import { useRequest, useDrop, useDrag, useDocumentVisibility } from 'ahooks';
import { message } from 'antd';
import Mock from 'mockjs';
const AhooksTest = () => {
  // useDrag/useDrop
  const [dragging, setDragging] = useState<string | null>(null);

  const changeUserName = (userName: string): Promise<{ success: boolean }> => {
    console.log(userName);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 2000);
    });
  };
  const [state, setState] = useState('');
  const { loading, run } = useRequest(changeUserName, {
    manual: true,
    onSuccess: (result, params) => {
      if (result.success) {
        setState('');
        message.success(`The userName was changed to "${params[0]}"`);
      }
    },
  });

  // useDrag/useDrop
  const getDragProps = useDrag({
    onDragStart: (data) => {
      setDragging(data);
    },
    onDragEnd: (data) => {
      setDragging(null);
    },
  });
  const [props, { isHovering }] = useDrop({
    onText: (text, e) => {
      console.log(e);
      alert(`'text: ${text}' dropped`);
    },
    onFiles: (files, e) => {
      console.log(e, files);
      alert(`${files.length} file dropped`);
    },
    onUri: (uri, e) => {
      console.log(e);
      alert(`uri: ${uri} dropped`);
    },
    onDom: (content: string, e) => {
      alert(`custom: ${content} dropped`);
    },
  });

  // 轮询
  //   通过设置 options.pollingWhenHidden=false ，在屏幕不可见时，暂时暂停定时任务。
  //   通过 run / cancel 来 开启/停止 轮询。
  //   在 options.manual=true 时，需要第一次执行 run 后，才开始轮询
  // const getUserName = (): Promise<string> => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(Mock.mock('@name'));
  //     }, 2000);
  //   });
  // };
  // const { data, loading, run, cancel } = useRequest(getUserName, {
  //   // manual=true 时，需要第一次执行 run 后，才开始轮询
  //   manual: true,
  //   pollingInterval: 2000,
  //   pollingWhenHidden: false,
  // });

  // 并发请求
  // const deleteUser = (userId: string): Promise<{ success: boolean }> => {
  //   console.log(userId);
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve({ success: true });
  //     }, 2000);
  //   });
  // };
  // 执行run的时候会把run的参数传给useRequest的第一个参数deleteUser这个函数
  // 通过 options.fetchKey ，可以将请求进行分类，每一类的请求都有独立的状态，你可以在 fetches 中找到所有的请求
  // const { run, fetches } = useRequest(deleteUser, {
  //   manual: true,
  //   fetchKey: (id) => id,
  //   onSuccess: (result, params) => {
  //     if (result.success) {
  //       message.success(`Disabled user ${params[0]}`);
  //     }
  //   },
  // });
  // console.log(fetches);
  // const users = [
  //   { id: '1', username: 'A' },
  //   { id: '2', username: 'B' },
  //   { id: '3', username: 'C' },
  // ];

  // 依赖请求
  // 只有当 options.ready 变为 true 时, 才会发起请求，基于该特性可以实现串行请求，依赖请求等。
  // const getUserId = (): Promise<number> => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(1011);
  //     }, 1000);
  //   });
  // };
  // const getUsername = (id: number | undefined): Promise<string> => {
  //   console.log('user id:', id);
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(Mock.mock('@name'));
  //     }, 1000);
  //   });
  // };
  // const userIdRequest = useRequest(getUserId);
  // const userNameRequest = useRequest(() => getUsername(userIdRequest.data), {
  //   ready: !!userIdRequest.data,
  // });

  // 防抖
  // 通过设置 options.debounceInterval ，则进入防抖模式。此时如果频繁触发 run ，则会以防抖策略进行请求。

  // useDrag/useDrop
  // useDrop 可以单独使用来接收文件、文字和网址的拖拽。
  // useDrag 允许一个 dom 节点被拖拽，需要配合 useDrop 使用。

  // useDocumentVisibility
  const documentVisibility = useDocumentVisibility();
  useEffect(() => {
    if (documentVisibility === 'visible') {
      console.log(`current document visibility state: ${documentVisibility}`);
    } else {
      console.log(`current document visibility state: ${documentVisibility}`);
    }
  }, [documentVisibility]);
  return (
    <div>
      <h1>ahooks钩子练习</h1>
      {/* useRequest */}
      <h2>useRequest</h2>
      <input
        type="text"
        onChange={(e) => setState(e.target.value)}
        value={state}
        placeholder="Please input your userName!"
        style={{ width: 240, marginRight: 20 }}
      />
      <button disabled={loading} type="button" onClick={() => run(state)}>
        {loading ? 'loading' : 'Edit'}
      </button>

      {/* 轮询 */}
      {/* <p>userName: {loading ? 'loading' : data}</p>
      <button type="button" onClick={run}>
        start
      </button>
      <button type="button" onClick={cancel}>
        stop
      </button> */}

      {/* 并行请求 */}
      {/* <div>你可以点击所有的按钮，每个按钮都有它们自己的状态</div>
      <ul>
        {users.map((user) => (
          <li key={user.id} style={{ marginTop: 8 }}>
            <button
              type="button"
              onClick={() => {
                run(user.id);
              }}
              disabled={fetches[user.id]?.loading}
            >
              {fetches[user.id]?.loading
                ? 'loading'
                : `delete ${user.username}`}
            </button>
          </li>
        ))}
      </ul> */}

      {/* 依赖请求 */}
      {/* <p>UserId: {userIdRequest.loading ? 'loading' : userIdRequest.data}</p>
      <p>
        UserName: {userNameRequest.loading ? 'loading' : userNameRequest.data}
      </p> */}

      {/* 防抖 */}

      <h2>useDrop/useDrag</h2>
      <div>Current document visibility state: {documentVisibility}</div>
    </div>
  );
};

export default AhooksTest;
