/*
* @Author: Xun.Fu
* @Date:   2017-12-25 17:16:21
* @Last Modified by:   Xun.Fu
* @Last Modified time: 2017-12-25 17:17:22
*/

import storage from 'good-storage';

storage.set('test', 'hello world')
console.log('test: ', storage.get('test', ''));
