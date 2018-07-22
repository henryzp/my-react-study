export function render(vnode, container) {
    container.appendChild(_render(vnode));
}

function _render(vnode) {
    if (typeof vnode === "string") {
        return document.createTextNode(vnode);
    }
    let { type, props, children } = vnode;
    let elem;
    if (typeof type === "string") {
        elem = document.createElement(type);
    } else if (typeof type === "object") {
        elem = type.createFragment(); // Fragment
    } else if (typeof type === "function") {
        let component = createComponent(type, props);
        component.props = props; // 防止子组件没有super(props)
        let dom = renderComponent(component);
        return dom;
    }
    for (let key in props) {
        if (key !== "children") {
            setAttribute(elem, key, props[key]);
        }
    }
    if (children) {
        children.forEach(child => {
            render(child, elem);
        });
    }
    return elem;
}

function setAttribute(node, name, value) {
    if (name === 'className') name = 'class'
    if (name === "class") {
        node.className = value;
    } else if (name === "style") {
        if (!value || typeof value === 'string') {
            node.style.cssText = value || ''
        }
        if (value && typeof value === 'object') {
            for (let key in value) {
                node.style[key] = value[key]; // 这里没有处理加什么"px"的情况
            }
        }
    } else if (name === 'dangerouslySetInnerHTML') {
        if (value) {
            node.innerHTML = value.__html || ''
        }
    } else if (name.startsWith('on')) {
        name = name.toLowerCase();
        node[name] = value;
    } else if (name in node) {
        node[name] = value;
    } else {
        node.setAttribute(name, value);
    }
}

// 创建component
function createComponent(component, props) {
    if (component.prototype.render) { // 类组件
        // 如果是类组件自己就有render方法，new类把属性传递到组件中
        component = new component(props)
    } else {
        component.render = function () {
            return component(props); // 调用render就会让函数执行
        }
    }
    return component;
}

// 渲染component
function renderComponent(component) {
    let dom = _render(component.render());
    return dom;
}