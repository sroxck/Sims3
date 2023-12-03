import { mutableHandlers, readonlyHandlers } from "./baseReactive"
import { track, trigger } from "./effect"

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

function createProxy(raw: any, baseHandlers) {
  return new Proxy(raw, baseHandlers)

}
