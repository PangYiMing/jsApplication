//  考虑这样一种场景，从一个object找到id对应的对象，obj如下结构：
//  调用 fn(obj,121)
//  返回 对应object,
/**
            {
              id: 121,
              child: [
                {
                  id: 1211,
                  child: [],
                },
              ],
            }
 */
const obj = {
  id: 0,
  child: [
    {
      id: 1,
      child: [
        {
          id: 12,
          child: [
            {
              id: 121,
              child: [
                {
                  id: 1211,
                  child: [
                    {
                      id: 1211,
                      child: [],
                    },
                  ],
                },
              ],
            },
            {
              id: 122,
              child: [
                {
                  id: 1222,
                  child: null,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      child: [
        {
          id: 22,
        },
      ],
    },
    {
      id: 3,
      child: [
        {
          id: 32,
          child: [],
        },
      ],
    },
  ],
};
function fn(o, id) {
  if (o.id === id) {
    return o;
  } else {
    if (o.child) {
      for (let i = 0; i < o.child.length; i++) {
        const element = o.child[i];
        // 如果有结果那么这个结果就是应该冒泡返回的内容
        // 如果没有找到不需要冒泡 程序因为没有返回值会有undefined
        const result = fn(element, id);
        // console.log(result);
        if (result && result.id === id) {
          return result;
        }
      }
    }
  }
}

console.log(fn(obj, 1222));

// 拓展 如果有多个呢？如何找到全部？
// 那需要全遍历，这时候考虑 去掉冒泡采用数组push的方法
function fn2(o, id) {
  const arr = [];
  fnChild(o, id);
  function fnChild(o, id) {
    if (o.id === id) {
      console.log("fnChild result");
      arr.push(o);
      processChild(o, id);
    } else {
      processChild(o, id);
    }
  }
  function processChild(o, id) {
    if (o.child) {
      for (let i = 0; i < o.child.length; i++) {
        const element = o.child[i];
        fnChild(element, id);
      }
    }
  }
  return arr;
}

console.log(fn2(obj, 1211));
