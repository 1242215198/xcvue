export default {
    /**
     * 如果填写的filename则返回文件，如果填写的target则跳转页面
     */
    openFile(url, filename, target) {
        const link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        link.href = url;
        if(target && Object.prototype.toString.call(target) == '[object String]')
            link.target = target;
        else
            link.target = '_blank';
        if(filename)
            link.download = filename;

        const event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        link.dispatchEvent(event);
    },
    /**
     * 设置页面title
     */
    setTitle(param = 'XXX'){
        window.document.title = param;
    },
    /**
     * 格式化日期格式
     */
    dateFormat(d=new Date(), fmt='yy年MM月dd日 hh:mm:ss'){
        const c = {y: 'FullYear', yy: 'FullYear', M: 'Month+1', d: 'Date', h: 'Hours', m: 'Minutes', s: 'Seconds'}
        return fmt.replace(/([yMdhms])(\1*)/g, (pp, p, _p) => {
            if (_p && c[pp]) return d[`get${c[pp]}`]()
            const [k, n] = c[p].split(/\W/)
            return ('0'.repeat(pp.length - 1) + (d[`get${k}`]() + (n|0))).slice(-2)
        })
    },
    addHead(type='text/javascript',src){
        let script;
        if(type==='script'){
            script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.setAttribute("src", src);
        }else if(type==='link'){
            script = document.createElement("link");
            script.setAttribute("rel", "stylesheet");
            script.setAttribute("href", src);
        }else{
            return false;
        }
        var heads = document.getElementsByTagName("head");
        if (heads.length)
            heads[0].appendChild(script);
        else
            document.documentElement.appendChild(script);
    }
}
