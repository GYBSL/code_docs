/*
* 格言组件
* 导入 axios 调接口
* 导入 apiURL 枚举
*/

import React,{ useState, useEffect } from 'react';
import axios from "axios"
import apiURL from '../apiUrl/index';


// 自定义样式
const myStyle={
	one:{textAlign:"center",cursor: "default"},
	two:{transform: "translate(1rem)"}
}

// Aphorism 格言函数式组件
function Aphorism() {
  const [data,setData] = useState(null)

  useEffect(() => {
    const fetchData = async () =>{
      await axios({
        method: "get",
        url: apiURL.XCAPI
      }).then(res=>{
        if(res.status==200){
          if(res.data){
            setData(res.data.data);
          }
        }
      })
    }

    fetchData();
  },[]);

  return (
      <div className="Aphorism">
        <div>
          <p >「 {  data != null ? data.sentence ? data.sentence : null : null }」</p>
          <p style={myStyle.two}><span>——</span> {data != null ? data.fromWho ? data.fromWho : null : null} { data != null ? data.from ? "《"+ data.from +"》" : null : null }</p>
        </div>
      </div>
  )
}

export default Aphorism;
