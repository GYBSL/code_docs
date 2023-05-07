/*
* 格言组件
* 导入 axios 调 "青柠起始页的一言" 接口
*/

import React,{ useState, useEffect } from 'react';
import axios from "axios"

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
        url: "https://v1.hitokoto.cn/?c=i&encode=json"
      }).then(res=>{
        if(res.status==200){
          if(res.data){
            setData(res.data);
          }
        }
      })
    }

    fetchData();
  },[]);

  return (
      <div className="Aphorism">
        <div>
          <p >「 {  data != null ? data.hitokoto ? data.hitokoto : null : null }」</p>
          <p style={myStyle.two}><span>——</span> { data != null ? data.from ? data.from : null : null}</p>
        </div>
      </div>
  )
}

export default Aphorism;
