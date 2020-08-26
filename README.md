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
由于我们的递归执行element来构建dom和添加dom属性，这存在一个问题
执行无法被打断(这是JS运行的内在机制)， 我们需要将工作划分成一个个增量单元
nextUnitOfWork,通过performUnitOfWork执行单个增量并返回下个工作单元
Fiber, element对象映射了一颗链表树的Fiber树