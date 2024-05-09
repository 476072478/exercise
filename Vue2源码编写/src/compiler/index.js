// 标签名 a-aaa
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
// 命名空间标签 aa:aa-xxx
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
// 开始标签-捕获标签名
const startTagOpen = new RegExp(`^<${qnameCapture}`);
// 结束标签-匹配标签结尾的 </div>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
// 匹配属性
const attribute =
    /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// 匹配标签结束的 >
const startTagClose = /^\s*(\/?)>/;
// 匹配 {{ }} 表达式
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
function parseHTML(html) {
    function advance(n) {
        html = html.substring(n);
    }
    let root // 树的操作，需要根据开始标签和结束标签产生一个树
    // 如何构建树的父子关系
    let stack = []
    function creatASTElement(tagName, attrs) {
        return {
            tag: tagName,
            attrs,
            children: [],
            parent: null,
            type: 1
        }
    }
    function start(tagName, attrs) {
        let element = creatASTElement(tagName, attrs);
        if (root == null) {
            root = element
        }
        let parent = stack[stack.length - 1]
        if (parent) {
            element.parent = parent // 让这个元素记住自己的父亲
            parent.children.push(element) // 让这个元素记住自己的儿子
        }
        stack.push(element)
    }
    function end(tagName) {
        stack.pop()
    }
    function chars(text) {
        text = text.replace(/\s/g, '')
        if (text) {
            let parent = stack[stack.length - 1]
            parent.children.push({
                type: 3,
                text
            })
        }
    }
    function parseStartTag() {
        const start = html.match(startTagOpen);
        if (start) {
            const match = {
                tagName: start[1], //标签名
                attrs: [],
            };
            advance(start[0].length);
            let end, attr;
            // 如果不是开始标签的结束,那就一直匹配
            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                match.attrs.push({ name: attr[1], value: attr[3] || attr[4] || attr[5] || true })
                advance(attr[0].length);
            }
            if (end) {
                advance(end[0].length)
                return match
            }
            return false; //不是开始标签
        }
    }
    while (html) {
        // 如果textEnd为0,说明是一个开始标签,或一个结束标签
        let textEnd = html.indexOf("<"); //如果indexOf中的索引是0，则说明是个标签
        if (textEnd === 0) {
            const startTagMatch = parseStartTag();
            if (startTagMatch) {
                start(startTagMatch.tagName, startTagMatch.attrs);
                continue
            }
            let matches
            if (matches = html.match(endTag)) {//不是开始就会走到结束
                end(matches[1])
                advance(matches[0].length)
                continue
            }
        }
        let text
        if (textEnd >= 0) {
            text = html.substring(0, textEnd)
        }
        if (text) {
            advance(text.length)
            chars(text)
        }
    }
    return root
}
function getProps(attrs) {
    let str = ''
    for (let i = 0; i < attrs.length; i++) {
        let attr = attrs[i]
        // style = 'color:red;background:blue'
        if (attr.name == 'style') { // style:'{color:red,background:blue}'
            let obj = {}
            attr.value.split(';').reduce((memo, current) => {
                let [key, value] = current.split(':')
                memo[key] = value
                return obj
            }, obj)
            attr.value = obj
        }
        str += `${attr.name}:${JSON.stringify(attr.value)},`
    }
    return `{${str.slice(0, -1)}}`
}
function gen(child) {
    if (child.type === 1) {
        return getCode(child)
    } else {
        let text = child.text
        if (!defaultTagRE.test(text)) {
            return `_v(${JSON.stringify(text)})` //不带表达式的
        } else {
            let tokens = []
            let match
            //exec 遇到全局匹配有lastIndex问题，每次匹配前需要将lastIndex置为0
            let startIndex = defaultTagRE.lastIndex = 0
            while (match = defaultTagRE.exec(text)) {
                let endIndex = match.index;//匹配到索引
                if (endIndex > startIndex) {
                    tokens.push(JSON.stringify(text.substring(startIndex, endIndex)))
                }
                tokens.push(`_s(${match[1].trim()})`)
                startIndex = endIndex + match[0].length
            }
            if (startIndex < text.length) { //将最后的尾巴也丢进去
                tokens.push(JSON.stringify(text.slice(startIndex)))
            }
            return `_v(${tokens.join('+')})`
        }
    }
}
function getChildren(children) {
    return children.map(child => gen(child)).join(',')
}
function getCode(ast) {
    // 字符串拼接，拼接成想要的就行
    let code
    code = `_c('${ast.tag}',${ast.attrs.length ? getProps(ast.attrs) : 'undefined'}${ast.children ? ',' + getChildren(ast.children) : ''})`
    //  _c('div',{className:'xxx'},createTextVnode('hello world'))
    return code
}
// 将模板变成render函数，通过with+new Function()的方式让
export function compileToFunction(template) {
    // 将template转化成ast语法树
    let ast = parseHTML(template);
    // 通过ast语法树转成render函数
    let code = getCode(ast)
    // 生产render方法（render方法执行后的返回结果就是虚拟dom）
    const render = new Function(`with(this){return ${code}}`)
    return render
}
