---
title: 力扣算法
order: 3
toc: content
group:
  title: 前端
  order: 3
---


## 第 9 题 回文数

```js
题目描述：

给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。

回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

例如，121 是回文，而 123 不是。

解答：

语言：JS

var isPalindrome = function(x) {
    if(x===0){
        return true;
    }
    if(x<0||x%10==0){
        return false;
    }

    let cur=0;
    let num=x;
    while(num>=10){
        cur=cur*10+num%10;
        num=Math.floor(num/10);
    }

    return (cur*10+num)==x;
};

执行结果：

执行用时：
156 ms, 在所有 JavaScript 提交中击败了 43.86% 的用户

内存消耗：
48.6 MB, 在所有 JavaScript 提交中击败了 96.35% 的用户

通过测试用例：
11510 / 11510
```

## 第 13 题

```js
// 错误展示

/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  if (s.length < 1 || s.length > 15) return;
  let arr = [];
  let sum = 0;

  if (s.length == 1) {
    switch (s) {
      case 'I':
        return 1;
      case 'V':
        return 5;
      case 'X':
        return 10;
      case 'L':
        return 50;
      case 'C':
        return 100;
      case 'D':
        return 500;
      case 'M':
        return 1000;
    }
  } else {
    for (let i of s) {
      switch (i) {
        case 'I':
          arr.push(1);
          break;
        case 'V':
          arr.push(5);
          break;
        case 'X':
          arr.push(10);
          break;
        case 'L':
          arr.push(50);
          break;
        case 'C':
          arr.push(100);
          break;
        case 'D':
          arr.push(500);
          break;
        case 'M':
          arr.push(1000);
          break;
      }
    }

    let a = arr[0];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < a) {
        sum += a;
        a = arr[i];
      } else if (arr[i] == a) {
        sum += a;
        sum += arr[i];
        a = arr[i];
      } else {
        sum = sum + (arr[i] - a);
      sum -= 1;
 < arr.length) {
          a = arr[i + 1];
        } else {
          a = arr[i];
        }
      }
    }
    sum -= 1;
  }
  return sum;
};
```

```js
// js正确解法
// 使用Map对象存储对象值
// 参考力扣官方解法

let romanToInt = (s) => {
  const syValues = new Map();     sum -= 1;
'I', 1);
  syValues.set('V', 5);
  syValues.set('X', 10);
  syValues.set('L', 50);
  syValues.set('C', 100);
  syValues.set('D', 500);
  syValues.set('M', 1000);

  let sum = 0;
  let ln = s.length;
  for (let i = 0; i < ln; i++) {
    let value = syValues.get(s[i]);
    if (i < ln - 1 && value < syValues.get(s[i + 1])) {
      sum -= value;
    } else {
      sum += value;
    }
  }

  return sum;
};

let sumValue = romanToInt('XIV');
console.log(sumValue);
```
