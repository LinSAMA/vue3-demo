# README
## vite 构建工具  https://vitejs.cn/
  - 需要自己安装 eslint
  - 使用 npx eslint --init 命令初始化eslint配置
  - eslint 配置项文档：https://eslint.vuejs.org/

## vue3 component API
- 使用 setup(){}
  - setup() 执行的时机在 beforeCreate() 之前，在 setup() 中是还没有 创建组件实例 ，也无法使用 this
  - setup() 语法糖
  - setup() 中配置项中 const setupValue = 'setup 示例内容' 不是响应式的内容

- ref 对任意类型进行 响应 设置
  - 使用 ref() 包裹的数据，在 js 中，使用定义的数据时，需要 xx.value，在template模板中则不需要

- reactive 对对象类型进行 响应 设置
  - reactive 可以将 ref() 处理过的对象进行使用（自动脱 ref）

- shallowReactive (浅响应式处理) 只能处理对象的第一层响应式
```js
  const dataList = shallowReactive({
    count:0,
    obj:{
      name:'linsama',
      age:18
    }
  })
  const handleCountChange = () => {
    dataList.count++
  }
  const handleNameChaneg = () => {
    dataList.obj.name = 'aaa'
  }
```
> 1. 单独点击 count 按钮，会触发更新
> 2. 单独点击 name 按钮，不会触发更新
> 3. 点击 name 按钮后，点击 count 按钮，触发更新，由于前面两次操作，因此 name 的内容也会被修改

- readonly 创建对象的只读代理
  - 可以传入任意的数据，返回的值是个代理，是只读的，并且是深度只读

- shallowReadonly 用于设置浅只读操作
  - 只对第一层设置只读操作，若数据原本为响应式，则深层依旧可以进行响应式更改

- 检测方法
  - isReactive()
    只有使用 reacvtie() 和 shallowReactive() 返回 true
  - isReadonly()
    使用 readOnly() 和 shallowReadonly() 都会返回 true
  - isProxy()
    reactive(), shallowReactive(), readonly(), shallowReadonly() 返回 true
    使用 ref() 创建的对象是 false

- toRefs() 将响应式对象所有属性转换为 ref
  - 主要是解决响应性丢失的问题，通过解构操作使得响应性丢失的问题
- toRef 用于将响应式对象的执行属性转换为 ref

- computed 减少视图中的复杂逻辑
  computed() 的返回值是一个 ref

- watch 侦听数据变化并执行响应代码
  - 注意侦听源时，传的参数
  - 有第三个参数 {deep:true,immediate:true,flush:'post'}
- watchEffect 侦听器函数 
  - 自动对回调内的数据进行依赖收集的一种侦听器
  - 无法获得数据变化前的值