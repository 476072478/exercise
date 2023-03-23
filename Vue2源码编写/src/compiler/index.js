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
    function start(tagName, attrs) {
        console.log("开始标签", tagName, attrs);
    }
    function end(tagName) {
        console.log("结束标签", tagName);
    }
    function chars(text){
        console.log('文本内容',text)
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
                match.attrs.push({name:attr[1],value:attr[3] || attr[4] || attr[5] || true})
                advance(attr[0].length);
            }
            if(end){
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
            if(matches = html.match(endTag)){//不是开始就会走到结束
                end(matches[1])
                advance(matches[0].length)
                continue
            } 
        }
        let text
        if(textEnd >= 0){
            text = html.substring(0,textEnd)
        }
        if(text){
            advance(text.length)
            chars(text)
        }
    }
}
export function compileToFunction(template) {
    // 将template转化成ast语法树
    let ast = parseHTML(template);
    // 生产render方法（render方法执行后的返回结果就是虚拟dom）
}
