# toyReact
打造自己的玩具React，用于学习 参考下面资料
https://pomb.us/build-your-own-react/
# 项目初始化
配置环境，支持热编译

# render JSX to DOM
渲染JSX 到 DOM
- createElement方法用于生成element对象
- createTextElement方法用于处理字符串
- render方法用于递归element创建dom并给dom赋值props,通过document.appendChild链接各节点

# Fiber
将element对象所表示的树结构
-> 转换成由指针链接的链表树结构
这样可以将不可终止的递归调用element对象的遍历行为
-> 转换为可以拆解的fiber工作单元所连接的fiber树
的调用。
给出第一个rootFiber作为第一个nextUnitOfWork
通过performUnitOfWork方法调用nextUnitOfWork,并返回下一个需要执行的nextUnitOfWork,我们可以设置条件来决定是否继续执行performUnitOfWork

# commit
之前我们的构建存在问题，游览器是可以随时中止执行的在整颗树执行完时，这时用户将看到的是一颗不完整的UI树，这时我们需要将插入dom部分的代码剔除
我们会在整颗fiber树都构建好了再提交到commitRoot方法，帮我们构建dom树
同时设置currentRoot用于更新时跟wipRoot比较