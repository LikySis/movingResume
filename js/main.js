var result = `/* 
* 你好，我是Liky
* 只用文字作做我介绍太单调了
* 我就用代码来介绍吧
* 首先准备一些样式
*/

/* 首先给所有元素加上过渡效果 */
  *{
    transition: all .5s;
  }

/* 白色背景太单调了，我们来点背景 */
  html{
    color: #fff; 
    background: #2B2B2B;
  }

/* 我需要一点代码高亮 */
  .token.selector{ 
    color: #f35656; 
  }
  .token.property{ 
    color: #f0da5e; 
  }
  .token.function{
    color: #76e9c2;
  }

/* 文字离边框太近了 */
  #code{
    border: 1px solid #aaa; 
    padding: 16px;
  }

/* 加一个呼吸效果 */
  #code{
    animation: breath .5s infinite alternate-reverse;
  }

/* 来个旋转效果吧 */
  #code{
    transform: rotate(360deg);
  }

/* 现在正式开始自我介绍 */
/* 稍等，我需要一张白纸...*/
  #paper{
    position: fixed;
    right: 0;
    top: 0;
    background: #444;
    width: 50%; 
    height: 100%;
  }
  #paper > .content{
    width: 100%;
    height: 100%;
    background: white;
  }

/* 于是我就可以在白纸上写字了，请看右边
 * 这是Markdown的语法
 */

`
var result2 = `
/* 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */
`
var md = `## Liky
### 求职意向 ###
前端开发

### 技能 ###
HTML、CSS、JavaScript

### 教育经历 ###
2015.9-2019.6 辽宁大学

### 联系方式 ###
e-mail：xxxx

we-chat：xxxx

### 个人主页 ###
Link：xxxx

GitHub：xxx

### 自我评价 ###
xxxxxx
`
var result3 = `
/*
 * 这就是我的简历
 * 谢谢观看！！
 */
`

function writeCode(prefix, code, fn) {
  let domCode = document.querySelector('#code')  //domCode 就是 pre标签
  let n = 0
  let id = setInterval(() => {
    n += 1
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
    styleTag.innerHTML = prefix + code.substring(0, n)
    domCode.scrollTop = domCode.scrollHeight     //元素的内容垂直滚动高度
    if (n >= code.length) {
      window.clearInterval(id)
      fn.call()
    }
  }, 50)
}

function createPaper(fn) {
  var paper = document.createElement('div')
  paper.id = 'paper'
  var content = document.createElement('pre')
  content.className = 'content'
  
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn.call()
}


function writeMarkdown(markdown, fn) {
  let domPaper = document.querySelector('#paper>.content')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domPaper.innerHTML = markdown.substring(0, n)
    domPaper.scrollTop = domPaper.scrollHeight
    if (n >= markdown.length) {
      window.clearInterval(id)
      fn.call()
    }
  }, 50)
}


function convertMarkdownToHtml(md, fn) {
  var div = document.createElement('div')
  div.className = 'html markdown-body'
  div.innerHTML = marked(md)
  let markdownContainer = document.querySelector('#paper > .content')
  markdownContainer.replaceWith(div)
  fn.call()
}


writeCode('', result, () => { // writeCode call the function
  console.log(1)
  createPaper(() => {
    console.log(2)
    writeMarkdown(md, () => {
      console.log(3)
      writeCode(result, result2, () => {
        console.log(4)
        convertMarkdownToHtml(md, () => {
          console.log(5)
          writeCode(result + result2, result3, () => {
            console.log('完成')
          })
        })
      })
    })
  })
})