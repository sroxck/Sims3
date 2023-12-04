import { mutableHandlers, readonlyHandlers } from "./baseReactive"
import { track, trigger } from "./effect"
export const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadonly"
}
export function reactive(raw) {
  // return new Proxy(raw, {
  //   // target指向当前对象,key是用户访问的对象
  //   // target: {foo:1}  key: foo
  //   ...mutableHandlers
  // })
  return createProxy(raw,mutableHandlers)

}

export function readonly(raw) {
  return createProxy(raw,readonlyHandlers)
}
export function isReactive(value){
  return !!value[ReactiveFlags.IS_REACTIVE]
}
export function isReadonly(value){
  return !!value[ReactiveFlags.IS_READONLY]
}
function createProxy(raw: any, baseHandlers) {
  return new Proxy(raw, baseHandlers)

}
