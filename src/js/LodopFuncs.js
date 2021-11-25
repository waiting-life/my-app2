//====页面动态加载C-Lodop云打印必须的文件CLodopfuncs.js====

const head =
  document.head ||
  document.getElementsByTagName('head')[0] ||
  document.documentElement;

//让其它电脑的浏览器通过本机打印（仅适用C-Lodop自带的例子）：
const oscript = document.createElement('script');
oscript.src = 'http://10.10.10.232:8000/CLodopFuncs.js';
head.insertBefore(oscript, head.firstChild);

//设置priority让本机(localhost)打印更优先一点,
//用双端口(http是8000/18000,而https是8443/8444)以防其中某端口被占:
const JS1 = document.createElement('script');
const JS2 = document.createElement('script');

// if (window.location.protocol === 'https:') {
//   JS1.src = 'https://localhost.lodop.net:8443/CLodopfuncs.js?priority=2';
//   JS2.src = 'https://localhost.lodop.net:8444/CLodopfuncs.js?priority=1';
// } else {
//   JS1.src = 'http://localhost:8000/CLodopfuncs.js?priority=2';
//   JS2.src = 'http://localhost:18000/CLodopfuncs.js?priority=1';
// }
// head.insertBefore(JS1, head.firstChild);
// head.insertBefore(JS2, head.firstChild);

//====获取LODOP对象的主过程：====
function getLodop(oOBJECT, oEMBED) {
  let LODOP;
  try {
    try {
      // eslint-disable-next-line no-undef
      LODOP = getCLodop();
      // eslint-disable-next-line no-empty
    } catch (err) {}

    if (!LODOP && document.readyState !== 'complete') {
      alert('C-Lodop没准备好，请稍后再试！');
      return;
    }

    //清理原例子内的object或embed元素，避免乱提示：
    if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED);
    if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT);

    return LODOP;
  } catch (err) {
    alert('getLodop出错:' + err);
  }
}

function needCLodop() {
  return true; //本例子强制所有浏览器都调用C-Lodop
}

export { getLodop }; //导出getLodop
