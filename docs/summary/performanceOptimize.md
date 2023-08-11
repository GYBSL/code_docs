---
title: 前端综合+组件封装
order: 5
toc: content
group: 
  title: 编程总结
  order: 5
---

# 前端综合+组件封装

## 1. 前端性能优化

写的很好的文章，有关前端性能优化的

[前端性能优化——首页资源压缩63%、白屏时间缩短86% - 掘金 (juejin.cn)](https://juejin.cn/post/7188894691356573754)

[一文彻底了解Web Worker，十万条数据都是弟弟 - 掘金 (juejin.cn)](https://juejin.cn/post/7137728629986820126)

## 2. Upload 上传组件使用

这里使用的是 `vue3+ts` 的 element ui 中的 `<el-upload></el-upload>` 组件

`el-upload` 子组件：

```vue
<template>
<el-upload ref="upload"
           class="upload-demo"
           v-model:file-list="fileList"
           :limit="1"
           :on-exceed="handleExceed"
           :auto-upload="true"
           accept=".pdf"
           :multiple="false"
           :http-request="httpRequest"
           :on-success="onSuccess"
           @error="onError">
    <template #trigger>
        <div class="">
            <el-button type="primary" v-if="!fileList.length">选择文件</el-button>
    	</div>
	</template>
</el-upload>
</template>

<script setup lang="ts">
    import { genFileId } from 'element-plus'
    import type { UploadInstance, UploadProps, UploadRawFile} from 'element-plus'
    import axios from 'axios';

    // let formData = new FormData(); // 可以使用FormData来模拟存放表单的数据

    // props接收父组件传下来的值
    const props = defineProps({
        modelValue: {
            type: String,
            default: '',
        },
        reset: Boolean,
    })
    
    // defineEmits定义子传父触发的自定义属性
    const emit = defineEmits(["update:modelValue", "update:fileAllList" ]);
    const upload = ref<UploadInstance>()
	const fileList = ref([])
    
    // ElMessage是element中的一个弹窗组件
    const showError = ()=>{
        ElMessage({
            message: '出错啦,上传失败',
            type: 'warning',
        })
    }

    // element 官方文档中的钩子，当上传的文件超出限制时调用，钩子中的逻辑也是官方文档中cv的
    const handleExceed: UploadProps['onExceed'] = (files) => {
        upload.value!.clearFiles()
        const file = files[0] as UploadRawFile
        file.uid = genFileId()
        upload.value!.handleStart(file)
    }

    const httpRequest = async (options) => { 
        // 这里的options是包含二进制文件file信息的参数
        // upload组件的自动上传为true时会自动调用这里的自定义上传接口
        
        /** 这里写代码逻辑*/
        
        // 需要将接口的调用返回
        return axios({
            method: "post",
            url: '',
            data: {},
        });
    }

    // 文件上传成功时的钩子，将成功之后接口返回的数据通过emit绑定
    const onSuccess = (response: any, uploadFile: UploadFile) => {
        emit('update:modelValue','')
    }

    // 文件上传失败时的钩子
    const onError = (e: any) => {
        console.log("🚀 ~ file: UploadItem.vue:76 ~ onError ~ e:", e)
        upload.value?.clearFiles();
        showError()
    };

    // 监听父组件传进来的reset, 实现重置效果
    watch(() => props.reset, () => {
        upload.value?.clearFiles();
    });

</script>
```

父组件：

```vue
<script setup lang="ts">
    import type { FormRules } from 'element-plus'
    import Upload from '../components/UploadItem.vue'

    const rules = reactive<
          FormRules<{
              name: string
              file: string[]
              enFile: string[]
    }>
        >({
        name: [{ required: true, message: '请填写名称', trigger: 'blur' }],
        file: [{ required: true, message: '请上传文件', trigger: 'change' }],
        enFile: [{ required: true, message: '请上传英文文件', trigger: 'change' }]
    })
    const formData = reactive<{
        name: string
        file: string
        enFile: string
    }>({
        name: '',
        file: '',
        enFile: '',
    })
    const reset = ref(false);
    const ruleFormRef = ref(null); // 表单引用

    // 重置方法
    const resetBtn = () => {
        formData.name = ''; // 清空名称字段
        reset.value = !reset.value; // 清空已选择的文件
    }

    const submitUpload = async (formEl: FormInstance | undefined) => {
        if (!formEl) return

        formEl.validate((valid) => {
            if (valid) {
                // 这里写你的发送请求的逻辑，然后回调函数中可以使用 ElMessage 提示上传成功
                ElMessage({
                    message: '上传成功',
                    type: 'success',
                })
            } else {
                return false
            }
        })
    }
</script>

<template>
<main class="">
    <div class="">
        <el-form ref="ruleFormRef" :rules="rules" :model="formData" label-width="100px" label-position="right">
            <el-form-item label="上传文件" prop="file">
                <Upload :reset="reset" v-model="formData.file"></Upload>
    		</el-form-item>

            <el-form-item label="名称:" prop="name">
                <el-input v-model="formData.name" placeholder="请填写名称" />
    		</el-form-item>

            <el-form-item label="英文文件:" prop="enFile">
                <Upload :reset="reset" v-model="formData.enFile"></Upload>
    		</el-form-item>

            <el-form-item class="upload-btn">
                <el-button @click="resetBtn">重置</el-button>
                <el-button class="ml-3" type="primary" @click="submitUpload(ruleFormRef)">提交</el-button>
    		</el-form-item>
    	</el-form>
    </div>
</main>
</template>

<style scoped></style>
```



## 3. oss上传文件

前端配置oss

```typescript
/**获取OSS配置文件 */
// config中的配置可能就需要和后端协商接口返回了
export async function getOSSconfig(fileName: string) {
  const config = {
    region: "",
    accessKeyId: ''
    accessKeySecret: '',
    bucket: '',
    endpoint: '',
  };

  return config;
}
```

需要安装一个包 `ali-oss`

```bash
npm i ali-oss
```

然后项目中引入，封装一个oss方法

```typescript
import OSS from 'ali-oss'
import { getOSSconfig } from '...' // 引入刚刚配置oss连接信息的方法

let OSSClient: OSS

function getOSSclient() {
  if (OSSClient) return OSSClient
  const config = getOSSconfig()
  const client = new OSS(config)

  return client
}

// 根据需求拼接上传的文件名
function createFileName(file: File) {
  // ... 你的代码逻辑 
}

/**上传文件 */
export const upLoadFile = (file: File) => {
  const client = getOSSclient(file?.name)
  // 上传的文件路径
  const uploadPath = createFileName(file)

  return client
    .put(uploadPath, file) // 文件路径 文件对象
    .then((res: any) => {
      return res
    })
}
```

然后就可以使用导出的 `upLoadFile` 方法了
