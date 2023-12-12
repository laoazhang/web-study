/**
 * 深拷贝函数
 * @param {*} newO 传入空白对象(外面创建传入)
 * @param {*} twoObj 要深拷贝的目标对象
 * 参数1对象会接收到twoObj拷贝过来的所有层的属性和值
 */
function deepClone(newO, twoObj, map){ // {}, twoObj对象, oneObj对象
    if (!map) {
        map = new Map()
    }
    for (let key in twoObj) { // key: 'family'
        let value = twoObj[key] // value: oneObj对象, 读到a的时候, twoObj又进来了
        if (value instanceof Array) {
            newO[key] = [] 
            deepClone(newO[key], value)
        } else if (value instanceof Object) {
            newO[key] = {} 
            if (!map.has(value)) { // 如果这个对象在map里出现过, 就不要再进入递归拷贝了(防止无限递归)
                map.set(value, 1) // map值: Map{ objObj对象: 1, twoObj对象: 1 }
                deepClone(newO[key], value, map)
            }
        } else {
            newO[key] = value; 
        }
    }
}

export default {
    deepClone
}