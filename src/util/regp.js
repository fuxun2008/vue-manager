/*
* @Author: Xun.Fu
* @Date:   2017-12-25 17:31:53
* @Last Modified by:   Xun.Fu
* @Last Modified time: 2017-12-25 17:37:07
*/

/**
 * 判断是否为纯数字的银行卡号
 * @param  {string} value  银行卡号
 * @return {boolean}       true or false
 */
export const isBankCardNum = value => /^[0-9]{13,19}$/g.test(value);

/**
 * Description:  银行卡号Luhn校验算法
 * luhn校验规则：16位银行卡号（19位通用）:
 * 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
 * 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
 * 3.将加法和加上校验位能被 10 整除。
 */
/* eslint-disable no-bitwise */
export const luhnCheck = luhn => {
  let ca;
  let sum = 0;
  let mul = 0;
  let len = luhn.length;
  while (len--) {
    ca = parseInt(luhn.charAt(len), 10) << mul;
    sum += ca - (ca > 9) * 9; // sum += ca - (-(ca>9))|9
    // 1 <--> 0 toggle.
    mul ^= 1; // mul = 1 - mul;
  }
  return (sum % 10 === 0) && (sum > 0);
};

/**
 * 判断统一社会信用代码正则
 * 《GB_32100-2015_法人和其他组织统一社会信用代码编码规则.》
 * 按照编码规则:
 * 统一代码为18位，统一代码由十八位的数字或大写英文字母（不适用I、O、Z、S、V）组成，由五个部分组成：
 * 第一部分（第1位）为登记管理部门代码，9表示工商部门；(数字或大写英文字母)
 * 第二部分（第2位）为机构类别代码;(数字或大写英文字母)
 * 第三部分（第3-8位）为登记管理机关行政区划码；(数字)
 * 第四部分（第9-17位）为全国组织机构代码；(数字或大写英文字母)
 * 第五部分（第18位）为校验码(数字或大写英文字母)
 * @param  {string} value   社会信用代码
 * @return {boolean} true or false
 */
export const isSocialCreditCode = value => /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g.test(value);

/**
 * 验证组织机构代码是否合法：组织机构代码为8位数字或者拉丁字母+“-”+1位校验码。
 * 验证最后那位校验码是否与根据公式计算的结果相符。
 * 编码规则请参看
 * http://wenku.baidu.com/view/d615800216fc700abb68fc35.html
 */
export const isValidOrgCode = orgCode => {
  let ret = false;
  const codeVal = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const intVal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
  const crcs = [3, 7, 9, 10, 5, 8, 4, 2];
  if (!(orgCode === '') && orgCode.length === 10) {
    let sum = 0;
    for (let i = 0; i < 8; i++) {
      const codeI = orgCode.substring(i, i + 1);
      let valI = -1;
      for (let j = 0; j < codeVal.length; j++) {
        if (codeI === codeVal[j]) {
          valI = intVal[j];
          break;
        }
      }
      sum += valI * crcs[i];
    }
    let crc = 11 - (sum % 11);
    switch (crc) {
      case 10:
        crc = 'X';
        break;
      default:
        break;
    }
    console.log('crc=' + crc + ', inputCrc=' + parseInt(orgCode.substring(9), 10));
    if (crc === parseInt(orgCode.substring(9), 10)) {
      ret = true;
    }
  }
  console.log('ret: ', ret);

  return ret;
};

/**
 * 判断是否符合金额规则
 * 可匹配0，0.00~9999999999.99
 * @Author   Xun.Fu
 * @Datetime 2017-06-07T09:38:48+0800
 * @param    {float}     value  金额
 * @return   {boolean}          true or false
 */
export const isMoney = value => /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value);

/**
 * 判断是否符合微信号规则
 * 6—20个字母、数字、下划线或减号，必须以字母开头（不区分大小写），不支持设置中文
 * @param  {string}  value 微信号
 * @return {boolean}       true or false
 */
export const isWechat = value => /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/.test(value);

/**
 * 判断是否符合URL规则
 * @param  {string}  value URL链接
 * @return {boolean}       true or false
 */
export const isURL = value => /^(https?:\/\/(?:www\.|(?!www))[^\s.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})?$/ig.test(value);

/**
 * 判断是否符合密码规则
 * @param  {string} value 密码
 * @return {boolean}      true or false
 */
export const isPass = value => /^(?![A-Za-z]+$)(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,16}$/.test(value);

/**
 * 判断是否符合手机规则
 * @param  {string} value 手机
 * @return {boolean}      true or false
 */
export const isMobile = export const isMobile = value => /^1(3|4|5|7|8)\d{9}$/.test(value.trim());

/**
 * 判断是否符合邮箱规则
 * @param  {string} value 邮箱
 * @return {boolean}      true or false
 */
export const isEmail = value => /^[_.0-9a-z-]+@([0-9a-z][0-9a-z-]+\.){1,4}[a-z]{2,5}$/.test(value.trim());

/**
 * 判断是否是数字
 * @param  {string} value 输入值
 * @return {boolean}      true or false
 */
export const isNum = value => /^[0-9]*$/.test(value.trim());

/**
 * 判断是否是正数
 * @param    {string}    value   输入值
 * @return   {boolean}           true or false
 */
export const isPositiveNum = value => /^[1-9][0-9]*$/.test(value);

/**
 * 判断是否是整形数据
 * @param  {string} value 输入值
 * @return {boolean}      true or false
 */
export const isInteger = value => Number.isInteger(parseInt(value.trim(), 10));

/**
 * 判断是否是身份证号 15位到18位的身份证号码正则
 * @param  {string} value 身份证号
 * @return {boolean}      true or false
 */
export const isIdCard = value => /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|[Xx])$/.test(value.trim());

/**
 * 判断是否是台湾身份证 10位 /^[A-Z]{1}[1-2]{1}[0-9]{8}$/.test(value)
 * 中国台湾地区的身份证称为“国民身份证”，号码一共有10位，第1位是大写的英文字母，后9位是阿拉伯数字。比如：U193683453。http://blog.csdn.net/sktechcom/article/details/45257149
 * @param  {string} value 身份证号
 * @return {boolean}      true or false
 */
/* eslint-disable eqeqeq */
export const isTwIdCard = value => {
  const alphabetArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'W', 'Z', 'I', 'O'];
  const digitArr = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  const sexArr = [0, 0];
  let d = '';
  let f = '';
  let e = 0;
  let g = 0;

  if (value.search(/^[a-z](1|2)\d{8}$/i) == -1) {
    return false;
  }

  d = value.charAt(0).toUpperCase();
  f = value.charAt(9);

  for (let i = 0; i < alphabetArr.length; i++) {
    if (d == alphabetArr[i]) {
      e = i + 10;
      sexArr[0] = Math.floor(e / 10);
      sexArr[1] = e - (sexArr[0] * 10);
      break;
    }
  }

  for (let i = 0; i < digitArr.length; i++) {
    if (i < 2) {
      g += sexArr[i] * digitArr[i];
    } else {
      g += parseInt(value.charAt(i - 1), 10) * digitArr[i];
    }
  }

  if (g % 10 == f) {
    return true;
  }

  if ((10 - g % 10) != f) {
    return false;
  }

  return true;
};

/**
 * 判断是否是中文名字 至少2个中文字符
 * @param  {string} value 名字
 * @return {boolean}      true or false
 */
export const isChineseName = value => /^[\u4E00-\u9FA5]{2,15}$/.test(value.trim());

/**
 * 判断是否为单位组织名称 5-30个汉字
 * @Author   Xun.Fu
 * @Datetime 2017-06-26T16:24:37+0800
 * @param    {string}   value   单位组织
 * @return   {boolean}          true or false
 */
export const isOrganizationName = value => /^[\u4E00-\u9FA5]{5,30}$/g.test(value.trim());
