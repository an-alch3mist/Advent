function INIT_advent()
{
    document.querySelectorAll("pre")[0].innerHTML = get_html(READ_a);
    document.querySelectorAll("pre")[1].innerHTML = get_html(READ_b);
}

function replace_str(unsafe) 
{
    let CHAR_MAP = new Map(
        [
            ['&', `&amp;`],
            ['<', `&lt;`],
            ['>', `&gt;`],
            ['"', `&quot;`],
            ["'", `&#39;`],
        ]
    );

    return unsafe.replace(/[&<"'>]/g, matched_char => CHAR_MAP.get(matched_char));
}

function get_html(READ)
{
    let str = "";
    READ.split('\n').forEach(line => {
        if(line[0] == '+')      str += `<l-green>${replace_str(line)}</l-green>`
        else if(line[0] == '#') str += `<l-gray>${replace_str(line)}</l-gray>`
        else if(line[0] == '-') str += `<l-red>${replace_str(line)}</l-red>`
        else                    str += `${replace_str(line)}`

        str += '\n';
    });
    return str;
}

let READ_a = 
`+2024/
    DAY-#-desc/
#    ├── index-desc.html    # got util.js, IN.js, EXEC.js running in order         
#    ├── IN.js              # input goes here
+    └── EXEC.js             # execution of logic is done here
    
    util/
#    ├── util.js           # utils(v2, U) are stored here

    static/
#    ├── style.css`;

let READ_b = 
`#   in ./index-desc.html <body>
-   <script src="https://unpkg.com/advent-2024@latest/util/util.js">`;


/*<!--
- text in red
+ text in green
! text in orange
# text in gray
@@ text in purple (and bold)@@
-->*/

INIT_advent();