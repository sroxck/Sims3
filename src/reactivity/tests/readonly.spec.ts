import { isReadonly, readonly } from "../reactive"

/*
 * @Author: sroxck
 * @Date: 2023-12-03 15:37:39
 * @LastEditors: sroxck
 * @LastEditTime: 2023-12-04 20:59:43
 * @Description: 
 */
describe('readonly',()=>{
  // readonly 不能被set 只能读 get 不会触发依赖更新,不需要依赖收集

  it('happy path',()=>{
    const original = {foo:1,bar:{baz:2}}
    const warpped = readonly(original)
    expect(warpped).not.toBe(original)
    expect(warpped.foo).toBe(1)
    expect(isReadonly(warpped)).toBe(true)
    expect(isReadonly(original)).toBe(false)
  })

  it('warn then call set',()=>{
    // console.warn()
    console.warn = vi.fn()
    const user = readonly({
      age:10
    })
    user.age = 11
    expect(console.warn).toBeCalled()
  })
})
