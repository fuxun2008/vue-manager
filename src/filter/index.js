/*
* @Author: Xun.Fu
* @Date:   2017-12-25 16:11:36
* @Last Modified by:   Xun.Fu
* @Last Modified time: 2017-12-25 16:28:38
*/

import emoji from 'emoji';

/**
 * 时间格式转换 ms -> date
 * @return {string} yyyy-MM-dd hh:mm:ss格式时间
 */
export const msToDate = (_ms, _format) => {
  let ms = _ms;
  let format = _format;
  if (ms.toString().length === 10) {
    ms *= 1000;
  }
  format = format || 'yyyy-MM-dd hh:mm:ss';
  const d = new Date(ms);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hour = d.getHours();
  const minute = d.getMinutes();
  const seconds = d.getSeconds();

  const addPrefix = source => (source < 10 ? `0${source}` : source);

  format = format.replace('yyyy', year)
    .replace('MM', addPrefix(month))
    .replace('dd', addPrefix(day))
    .replace('hh', addPrefix(hour))
    .replace('mm', addPrefix(minute))
    .replace('ss', addPrefix(seconds));

  return format;
};

/**
 * 兼容https/http
 * @param  {string} value 地址
 * @return {string}       替换后的地址
 */
export const https = value => {
  if (value) {
    return value.replace(/^http(s)?:/gi, '');
  }
  return '';
};

/**
 * 添加金额分隔符
 * @Author   Xun.Fu
 * @Datetime 2017-07-25T10:24:12+0800
 * @param    {number}    _str   金额
 * @return   {string}           格式化后的金额字串
 */
export const formatNumber = _str => {
  const str = _str + '';
  let baseLen = 3;
  if (str.indexOf('.') > -1) {
    baseLen += str.length - str.indexOf('.');
  }
  if (str.length <= baseLen) {
    return str;
  }
  return formatNumber(str.substring(0, str.length - baseLen)) + ', ' + str.substring(str.length - baseLen);
};

/**
 * 添加中国单位
 * @param number {number} 输入金额
 * @param decimalDigit {number} 小数点后尾数
 */
export const NumberUpperFormat = (number, decimalDigit = 1) => {
  const getDigit = integer => {
    let digit = -1;
    while (integer >= 1) {
      digit++;
      integer /= 10;
    }
    return digit;
  };

  const addWan = (integer, n, mutiple, d) => {
    const digit = getDigit(integer);
    if (digit > 3) {
      let remainder = digit % 8;
      if (remainder >= 5) { // ‘十万’、‘百万’、‘千万’显示为‘万’
        remainder = 4;
      }
      if (digit > 5) return Math.floor(Math.round(n / Math.pow(10, remainder + mutiple - d)) / Math.pow(10, decimalDigit)) + '万';
      return Math.round(n / Math.pow(10, remainder + mutiple - d)) / Math.pow(10, decimalDigit) + '万';
    }
    return Math.round(n / Math.pow(10, mutiple - d)) / Math.pow(10, decimalDigit);
  };

  decimalDigit = decimalDigit == null
    ? 2
    : decimalDigit;
  const integer = Math.floor(number);
  const digit = getDigit(integer);
  const unit = [];
  if (digit > 3) {
    const multiple = Math.floor(digit / 8);
    if (multiple >= 1) {
      const tmp = Math.round(integer / Math.pow(10, 8 * multiple));
      unit.push(addWan(tmp, number, 8 * multiple, decimalDigit));
      for (let i = 0; i < multiple; i++) {
        unit.push('亿');
      }
      return unit.join('');
    }
    return addWan(integer, number, 0, decimalDigit);
  }
  return number;
};

/**
 * emoji表情转换函数
 * @param    {string} code emoji UTF-8
 * @return   {emoji}       表情
 */
export const googleToUnified = code => emoji.googleToUnified(code);

export const softbankToUnified = code => emoji.softbankToUnified(code);

export const kddiToUnified = code => emoji.kddiToUnified(code);

export const docomoToUnified = code => emoji.docomoToUnified(code);

export const unifiedToHTML = code => emoji.unifiedToHTML(code);
