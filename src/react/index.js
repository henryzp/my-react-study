export function createElement(type, props, ...children) {
    props = props || {};
    props.children = children.length === 1 ? children[0] : children; // 处理props的children属性    
    return new Element(type, props, children);
};

export const Fragment = {
    createFragment() {
        return document.createDocumentFragment();
    }
}

class Element {
    constructor(type, props, children) {
        this.type = type;
        this.props = props;
        this.children = children;
    }
}