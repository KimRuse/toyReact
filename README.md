# toyReact
打造自己的玩具React，用于学习

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