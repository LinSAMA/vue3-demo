
<script setup>
// 1. setup
// import { ref } from 'vue'
// 非响应式数据
// const setupValue = 'setup 实例内容2'
// 响应式数据
// const setupValue = ref('setup 实例内容2')

// 2. ref
// const count = ref(0)
// const arr = ref([])

// const handleCountChange = () => {
//   count.value++
// }
// const handleaArrayChange = () => {
//   arr.value[0] = 10
// }

// 3. reactive
// import { reactive } from 'vue'
// const dataList = reactive({
//   count: 0,
//   arr: [],
//   obj: {
//     name: 'linsama',
//     age: 18
//   }
// })
// const handleCountChange = () => {
//   dataList.count++
// }

// 4. shallowReactive
// import { shallowReactive } from 'vue'
// const dataList = shallowReactive({
//   count: 0,
//   obj: {
//     name: 'linsama',
//     age: 18
//   }
// })
// const handleCountChange = () => {
//   dataList.count++
// }
// const handleAgeChange = () => {
//   dataList.obj.name = 'aaa'
// }

// 5. readonly
// const readonlyData = readonly({
//   count: 0,
//   obj: {
//     name: 'linsama',
//     age: 18
//   }
// })
// const handleCountChange = () => {
//   readonlyData.count++
// }
// const handleNameChaneg = () => {
//   readonlyData.obj.name = '这是 name'
// }

// 6.shallowReadonly
// import { reactive, readonly, shallowReadonly } from 'vue'

// const reactiveData = reactive({
//   count: 0,
//   obj: {
//     name: 'linsama',
//     age: 18
//   }
// })

// const shallowReadonlyData = shallowReadonly(reactiveData)

// const handleCountChange = () => {
//   shallowReadonlyData.count++
// }
// const handleNameChaneg = () => {
//   shallowReadonlyData.obj.age++
// }

import { reactive, isReactive, shallowReactive, ref, readonly, isReadonly, isProxy, shallowReadonly } from 'vue'
const count = ref(0)
const reactiveData = reactive({
  count: 0,
  obj: {
    name: 'linsama',
    age: 17
  }
})
const shallowReactiveData = shallowReactive({
  count: 0,
  obj: {
    name: 'linsama',
    age: 17
  }
})
const readOnlyData = readonly({
  count: 0,
  obj: {
    name: 'linsama',
    age: 17
  }
})
const shallowReadOnlyData = shallowReadonly({
  count: 0,
  obj: {
    name: 'linsama',
    age: 17
  }
})
console.log('isReactive-', isReactive(count))
console.log('isReactive-', isReactive(count.value))
console.log('isReactive-', isReactive(reactiveData))
console.log('isReactive-', isReactive(shallowReactiveData))
console.log('isReactive-', isReactive(readOnlyData))
console.log('isReactive-', isReactive(shallowReadOnlyData))

console.log('isReadonly=', isReadonly(count))
console.log('isReadonly=', isReadonly(count.value))
console.log('isReadonly=', isReadonly(reactiveData))
console.log('isReadonly=', isReadonly(shallowReactiveData))
console.log('isReadonly=', isReadonly(readOnlyData))
console.log('isReadonly=', isReadonly(shallowReadOnlyData))

console.log('isReadonly+', isProxy(count))
console.log('isReadonly+', isProxy(count.value))
console.log('isReadonly+', isProxy(reactiveData))
console.log('isReadonly+', isProxy(shallowReactiveData))
console.log('isReadonly+', isProxy(readOnlyData))
console.log('isReadonly+', isProxy(shallowReadOnlyData))

</script>

<template>
  <div />
  <!-- <div v-text="count" />
  <button @click="handleCountChange">
    Number
  </button>
  <div v-text="arr" />
  <button @click="handleaArrayChange">
    Array
  </button> -->

  <!-- <div v-text="dataList.count" />
  <button @click="handleCountChange">
    Number
  </button>
  <div v-text="dataList.obj.name" /> -->

  <!-- <div v-text="dataList.count" />
  <button @click="handleCountChange">
    Count
  </button>
  <div v-text="dataList.obj" />
  <button @click="handleAgeChange">
    Name
  </button> -->

  <!-- <div v-text="shallowReadonlyData.count" />
  <button @click="handleCountChange">
    Count
  </button>
  <div v-text="shallowReadonlyData.obj" />
  <button @click="handleNameChaneg">
    Name
  </button> -->
</template>

<style></style>
