import { useRef } from 'react';
// @ts-ignore
import { getLodop } from '../../js/LodopFuncs.js';

export function usePrint(ref: any) {
  const handlePrint = () => {
    console.log(document.querySelector('.print')?.innerHTML);
    let LODOP = getLodop(); // 调用getLodop获取LODOP对象
    // 打印初始化
    LODOP.PRINT_INIT('');
    // 高度和打印内容自适应
    LODOP.SET_PRINT_PAGESIZE(3, 1200, 160);
    // 获取打印的元素
    LODOP.ADD_PRINT_HTM(
      '0%',
      '0%',
      '100%',
      '100%',
      document.querySelector('.print')?.innerHTML,
      // ref.current?.innerHTML,
    );
    //设置对后台打印状态进行捕获
    LODOP.SET_PRINT_MODE('CATCH_PRINT_STATUS', true);
    //打印
    const prt = LODOP.PRINT();
    //返回jobId
    return prt;
  };

  return { handlePrint };
  // return (
  //   <div>
  //     <div className="print">
  //       <div
  //         style={{
  //           width: '200pt',
  //           display: 'flex',
  //           flexDirection: 'column',
  //           alignItems: 'center',
  //           margin: '0 auto',
  //         }}
  //       >
  //         <div
  //           style={{
  //             width: '100pt',
  //             padding: '2pt 5pt',
  //             fontSize: '15pt',
  //             backgroundColor: '#000',
  //             fontWeight: 500,
  //             textAlign: 'center',
  //             borderRadius: '10pt',
  //             color: '#fff',
  //           }}
  //         >
  //           取餐号 22
  //         </div>
  //         {['烤鱼', '土豆片', '雪糕', '可乐', '芒果', '米饭'].map(
  //           (item, index) => {
  //             return (
  //               <div
  //                 style={{
  //                   width: '160pt',
  //                   marginTop: '5pt',
  //                   fontSize: '12pt',
  //                   display: 'flex',
  //                   justifyContent: 'space-between',
  //                 }}
  //                 key={item}
  //               >
  //                 <div>{item}</div>
  //                 <div>{`x${index + 1}`}</div>
  //               </div>
  //             );
  //           },
  //         )}

  //         <div
  //           style={{
  //             marginTop: '12pt',
  //             width: '160pt',
  //             overflow: 'hidden',
  //             whiteSpace: 'nowrap',
  //           }}
  //         >
  //           -------------------------------------------
  //         </div>

  //         <div style={{ marginTop: '12pt', fontSize: '12pt' }}>
  //           <div>预定人: ********6931</div>
  //           <div>预定时间: 2021-11-25 22:22:22</div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}

function PrintTest() {
  const ref = useRef();
  const { handlePrint } = usePrint(ref);

  return (
    <div>
      <button onClick={handlePrint}>测试打印</button>
      <div className="print">
        <div
          style={{
            width: '200pt',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              width: '100pt',
              padding: '2pt 5pt',
              fontSize: '15pt',
              backgroundColor: '#000',
              fontWeight: 500,
              textAlign: 'center',
              borderRadius: '10pt',
              color: '#fff',
            }}
          >
            取餐号 22
          </div>
          {['烤鱼', '土豆片', '雪糕', '可乐', '芒果', '米饭'].map(
            (item, index) => {
              return (
                <div
                  style={{
                    width: '160pt',
                    marginTop: '5pt',
                    fontSize: '12pt',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                  key={item}
                >
                  <div>{item}</div>
                  <div>{`x${index + 1}`}</div>
                </div>
              );
            },
          )}

          <div
            style={{
              marginTop: '12pt',
              width: '160pt',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            -------------------------------------------
          </div>

          <div style={{ marginTop: '12pt', fontSize: '12pt' }}>
            <div>预定人: ********6931</div>
            <div>预定时间: 2021-11-25 22:22:22</div>
          </div>
        </div>
      </div>
    </div>
  );
}
