// @ts-ignore
import { getLodop } from '../../js/LodopFuncs.js';

function PrintTest() {
  const handleClick = () => {
    let LODOP = getLodop(); //调用getLodop获取LODOP对象
    // LODOP.PRINT_INIT('');
    // LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, '打印内容');
    // LODOP.PRINT();

    //打印初始化
    LODOP.PRINT_INIT('');
    //设置纸张类型，打印风格等
    LODOP.SET_PRINT_PAGESIZE(1, 0, 0, 'A5');
    LODOP.SET_PRINT_STYLE('Stretch', 2);
    LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, '打印内容');
    //设置边距，传入待打印图片的base64编码
    // LODOP.ADD_PRINT_IMAGE("0mm","0mm","RightMargin:0mm","BottomMargin:0mm",dataUrl);
    //设置对后台打印状态进行捕获
    LODOP.SET_PRINT_MODE('CATCH_PRINT_STATUS', true);
    //打印
    var prt = LODOP.PRINT();
    //返回jobId
    return prt;
  };
  return (
    <div>
      <button onClick={handleClick}>点击按钮打印</button>
    </div>
  );
}

export default PrintTest;
