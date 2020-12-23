import {useEffect,useRef} from 'react'
const {remote}=window.require('electron');
const {Menu,MenuItem} = remote;
// itemArr [item1,item2]
// item1: {
//      label:"菜单名",
//      click:callback funciton
// }
const useContextMenu = (itemArr,targetSelector)=>{
    let clickElement = useRef();
    useEffect(()=>{
        const menu = new Menu();
        itemArr.forEach(item=>{
            menu.append(new MenuItem(item))
        });
        const handlerContextMenu = e=>{
            //只有在targetSelector包含e.targetshi时才显示
            if (document.querySelector(targetSelector).contains(e.target)){
                clickElement.current = e.target;
                menu.popup({window:remote.getCurrentWindow()})
            }
        };
        window.addEventListener('contextmenu',handlerContextMenu);
        return ()=>{
            window.removeEventListener('contextmenu',handlerContextMenu);
        }
    },[]);
    return clickElement
};
export default  useContextMenu