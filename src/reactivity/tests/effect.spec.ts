
import { effect,stop } from "../effect";
import { reactive } from "../reactive";
/**
 * 响应式数据,触发get收集依赖,触发set执行依赖
 */
describe('effect',()=>{
  it('happy path',()=>{
    
    const user = reactive({
      age:10
    })
    let nextAge;
    effect(()=>{
      nextAge = user.age+1
    })
    expect(nextAge).toBe(11)
    // // update
    user.age++
    expect(nextAge).toBe(12)
   
  })
  it('runner',()=>{
    // 1. effect(fn) -> 返回runner函数->再次执行fn -> fn的返回值return 
     let foo = 10
    const runner =  effect(()=>{
      foo++
      return 'foo'
     })
     expect(foo).toBe(11)
     const r = runner()
     expect(foo).toBe(12)
     expect(r).toBe('foo')
  })
  it("scheduler", () => {
    let dummy;
    let run: any;
    const scheduler = vi.fn(() => {
      run = runner;
    });
    const obj = reactive({ foo: 1 });
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      { scheduler }
    );
    expect(scheduler).not.toHaveBeenCalled();
    expect(dummy).toBe(1);
    // should be called on first trigger
    obj.foo++;
    expect(scheduler).toHaveBeenCalledTimes(1);
    // // should not run yet
    expect(dummy).toBe(1);
    // // manually run
    run();
    // // should have run
    expect(dummy).toBe(2);
  });
  it("stop", () => {
    let dummy;
    const obj = reactive({ prop: 1 });
    const runner = effect(() => {
      dummy = obj.prop;
    });
    obj.prop = 2;
    expect(dummy).toBe(2);
    stop(runner);
    // obj.prop = 3
    obj.prop++;
    expect(dummy).toBe(2);

    // stopped effect should still be manually callable
    runner();
    expect(dummy).toBe(3);
  });

  it("events: onStop", () => {
    const onStop = vi.fn();
    const runner = effect(() => {}, {
      onStop,
    });

    stop(runner);
    expect(onStop).toHaveBeenCalled();
  });
})
