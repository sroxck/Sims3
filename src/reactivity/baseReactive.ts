/*
 * @Author: sroxck
 * @Date: 2023-12-03 15:47:33
 * @LastEditors: sroxck
 * @LastEditTime: 2023-12-04 20:59:26
 * @Description: 
 */
import { track, trigger } from "./effect"
import { ReactiveFlags } from "./reactive"
const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)
function createGetter(isReadonly = false) {
  return function get(target, key) {
    if(key  === ReactiveFlags.IS_REACTIVE){
      return !isReadonly
    }
    if(key == ReactiveFlags.IS_READONLY){
      return isReadonly
    }
    if (!isReadonly) {
      track(target, key)
    }
    return Reflect.get(target, key)
  }
}

function createSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value)
    trigger(target, key)
    // 触发依赖
    return res
  }
}
export const mutableHandlers = {
  get,
  set
}
export const readonlyHandlers = {
  get: readonlyGet,
  set(target, key, value) {
    console.warn(`key:${key} set error [readonly]`)
    return true
  }
}
