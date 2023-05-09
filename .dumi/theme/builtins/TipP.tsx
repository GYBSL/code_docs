/*
* TipP 组件
* 用来存放重要提示，比如面试题中的重点
* 导入 axios 调 "青柠起始页的一言" 接口
*/

import React, { ReactNode } from 'react';
import "../styles/TipP.css" // 导入自定义样式

interface Props {
  children?: ReactNode;
}

// TipP 函数式组件
function TipP(props:Props) {
  return (
      <div className="TipP">
        <p className='TipP_p'>
          Tips: [ <span className='TipP_span'>{props.children}</span> ]
        </p>
      </div>
  )
}

export default TipP;
