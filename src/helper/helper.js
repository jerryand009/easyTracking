export const getParentNode = (node,parentClassName)=>{
    // 从node节点逐层往上找直到找到包含parentClassName的节点并返回
    let current = node;
    while (current!==null){
        if (current.classList.contains(parentClassName)){
            return current;
        }
        current=current.parentNode
    }
    return false
};