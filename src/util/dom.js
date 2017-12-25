export const addClass = (el, className) => {
  if (hasClass(el, className)) {
    return;
  }
  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
};

export const hasClass = (el, className) => {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className);
};

export const getData = (el, name, val) => {
  const prefix = 'data-';
  name = prefix + name;
  if (val) {
    return el.setAttribute(name, val);
  } else {
    return el.getAttribute(name);
  }
};

let elementStyle = document.createElement('div').style;

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  };

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }

  return false;
})();

export const prefixStyle = style => {
  if (vendor === false) {
    return false;
  }

  if (vendor === 'standard') {
    return style;
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
};

// 事件绑定
export const bindHandler = () => {
  if (window.addEventListener) { // 标准浏览器
    return (elem, type, handler) => { // elem:节点 type:事件类型 handler:事件处理程序
      // 最后一个参数为true:在捕获阶段调用事件处理程序 为false:在冒泡阶段调用事件处理程序
      elem.addEventListener(type, handler, false);
    };
  } else if (window.attachEvent) { // IE浏览器
    return (elem, type, handler) => {
      elem.attachEvent('on' + type, handler);
    };
  }
  return false;
};

// 事件解除
export const removeHandler = () => {
  if (window.removeEventListerner) { // 标准浏览器
    return (elem, type, handler) => {
      elem.removeEventListerner(type, handler, false);
    };
  } else if (window.detachEvent) { // IE浏览器
    return (elem, type, handler) => {
      elem.detachEvent('on' + type, handler);
    };
  }
  return false;
};
