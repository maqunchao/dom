window.dom = {
    //创建一个dom节点
    create(string){
        //创建一个template容器标签
        const container = document.createElement("template");
        //删除字符串的头尾空格
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },

    //先找到node节点的下一个节点,再将node2的插入到该节点的前面, 等于插入到node节点后面
    after(node, node2){
        node.parentNode.insertBefore(node2, node.nextSibling);
    },
    
    //插到该节点的前面 
    before(node, node2){
        node.parentNode.insertBefore(node2, node);
    },

    //添加子节点
    append(parent, node){
        parent.appendClid(node);
    },

    //添加父节点
    wrap(node, parent){
        //先把插入该节点的前面
        dom.before(node, parent)
        //append会将插入的值,从原来的地方移开
        dom.append(parent, node)
    },

    //删除某个节点
    remove(node){
        node.parentNode.removeChild(node)
        return node
    },
    //删除子节点
    empty(node){
        const array = [];
        let a = node.firstChild;
        while(x){
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    },

    
    //读写属性
    attr(node, name, value){
        //重载
        if(arguments.length === 3){
            node.setAttribute(name, value)
        } else if(arguments.length === 2){
            return node.getAttribute(name)
        }
    },

    //改变文本内容
    text(node, string){ //适配
        //获取文本内容
        if(arguments.length === 2){
            if('innerText' in node){
                node.innerText = string  //IE
            } else {
                node.textContent = string //chrome firefox
            }
            
        } else if(arguments.length === 1){ //只获取节点
            if('innerText' in node){
                return node.innerText
            } else {
                return node.textContent
            }
        }
    },

    //更改html
    html(node, string){
        if(arguments.length === 2){

            node.innerHTML = string
        } else if(arguments.length === 1){
            return node.innerHTML
        }
    },
    //修改style
    style(node, name, value){
        if(arguments.length === 3){
            //dom.style(div, 'color', 'red')
            node.style[name] = value
        } else if(arguments.length === 2){
            if(typeof name === 'string'){
                //dom.style(div, 'color') 获取div的 style中的颜色
                return node.style[name]
            } else if( name instanceof Object){
                //dom.style(div, {color:'red'})
                const object = name
                for(let key in object){
                    node.style[key] = object[key]
                }
            }
        }
    },
    //添加style
    class:{
        add(node, className){
            node.classList.add(className)
        },
        remove(node, className){
            node.classList.remove(className)
        },
        has(node, className){
            return node.classList.contains(className)
        }
    },

    //添加事件的监听
    on(node, eventName, fn){
        node.addEventListener(eventName, fn)
    },
    //删除事件监听
    off(node, eventName, fn){
        node.removeEventListener(eventName, fn)
    },

    //指定某个范围scope, 默认在document中查找
    find(selector, scope){
        return (scope || document).querySelectorAll(selector)

    },
    //获取父元素
    parent(node){
        return node.parentNode
    },
    //获取子元素
    children(node){
        return node.children
    },
    //获取兄弟姐妹元素
    siblings(node){
        //先将父节点的所有元素转成数组, 然后筛选掉自身元素
        return Array.from(node.parentNode.children).filter(n=>n!==node)
    },
    //获取上一个元素
    next(node){
        let x = node.nextSibling
        while(x && x.nodeType === 3){
            x = x.nextSibling
        }
        return x
    },

    //获取下一个元素
    previous(node){
        let x = node.previousSibling
        while(x &&  x.nodeType === 3){
            x = x.previousSibling
        }
        return x
    },
    //遍历所有节点
    each(nodeList, fn){
        for (let i = 0; i < nodeList.length; i++) {
           fn.call(null, nodeList[i])
        }
    },
    //获取该元素排行
    index(node){
        const list = dom.children(node.parentNode)
        let i;
        for (i = 0; i < list.length; i++) {
           if(list[i] === node){
               break
           }
        }
        return i
    }

}