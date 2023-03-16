### 本文记录一些跟随官方教程后的心得，按照最终版本代码逐块进行理解，包括typescript和react的一些基本操作和误区

### 函数组件
- Game: 最后输出的大组件，所有组件的父类
- Board：Game中引用的组件，包含boardProps类存储属性，函数组件Board
- Square：Board中引用的组件，包含squareProps类存储属性，函数组件Square
- 函数findWinner()

### 细节知识
##### 创建函数组件并传入参数
###### Syntax
`function funcName({value1, value2, ...}:funcProps) {...}`
or
`const funcName: React.FC<funcProps> = ({value1, value2, ...}) => {...}`
###### Note
- funcProps是用来存储传入参数的interface，通常创建在函数组件之前, i.e
`interface funcProps {value1:string;  value2: React.MouseEventHandler<HTMLButtonElement>};`

- 一些函数的类型可以在IDE的tips里可以看到。比如创建一个handleClick函数，在点击时候引用（i.e. onclick={handleClick}），当鼠标悬于onclick之上时，IDE如vs code会显示onclick函数的类型`React.MouseEventHandler<HTMLButtonElement>`

##### ()=>arrow function箭头函数
在本例中，因为handleClick()需要传入参数i，并且Board中引用Square时就会传入这个函数属性，导致渲染时该函数就会被呼叫并重新渲染页面，此时react会抛出警告。解决方法是在函数再套一个函数，这里使用箭头函数。
`<Square value={squares[3]} handleSquareClick={()=>handleClick(3)} />`
该解决方法适用于大部分带有参数的函数属性。

##### useState Hook in Typescript
###### Syntax
`const [property, setProperty] = useState<type>(default value)`
###### 示例
- number类型
`const [currentMove, setCurrentMove] = useState<number>(0);`
- array
`const [history, setHistory] = useState<string[]>(Array(3).fill(null));`
react会创建一个长度为3的string组，默认初始值为null。i.e.*{null, null, null}*
- 2d array矩阵
`const [history, setHistory] = useState<string[][]>([Array(3).fill(null)]);`
这里，react会创建一个包含长度为3的string数组的数组，也就是矩阵。初始默认值是只有一个数组。i.e.*{[null, null, null] --> [Array(3).fill(null)]}*；随着程序进行，会有新的数组被创建并加入, i.e. *{[null, null, null], [null, null, null], ...}*

##### array的map函数
###### Syntax
`array.map((element) => ...)`
`array.map((element, index) => ...)`
`array.map((element, index, array) => ...)`
##### react中的list元素
根据官方的教程推荐，JSX/TSX中的list元素应该具备一个唯一的key，i.e.
`<ol><li key={keyVal}> ... </li></ol>`

#### Game组件
Game作为App组件输出的最大的组件，其作用为控制整个游戏流程，因此Board和Square只负责渲染棋盘和控制棋子，Game负责监控每一次move并记录，以及判断胜利者-->findWinner()。在这里复盘一下游戏中时间回溯的功能。
##### 变量&函数
- currentMove：number，游戏中的move是指玩家目前为止移动的总步数，默认为0，即游戏开始未移动时；
- isXNext：boolean，判断下一步是X还是O。因为这两个状态是交替变换的，因此不需要hook，直接使用（currentMove % 2 === 0）即可，currentMove为双数（包括0）时下一步是X，否则为O；
- history：string[ ][ ]，矩阵。每下一步history就会将当前的棋盘状态加在末尾，初始状态只有一个长度为9的全为null值的列表，即currentMove=0时棋盘的状态；
- currentSquare：string[ ]，当currentMove = i时，history[i] = currentSquare,即当时的棋盘状态
- handlePlay(newSquare)：函数，此函数最后会被传入Board组件并由Board来更新其中的newSquare。利用newSquare来创建一个新的history --> newhistory是由原先的加上newSquare，然后更新history，最后更新currentMove，考虑到有时间回溯的功能，所以不能单纯+=1，而是要将当前步数设置为history的最大目录数

