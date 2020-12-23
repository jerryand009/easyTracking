import React,{useState,useEffect} from 'react'
// 通过useKeyPress(13)来调用，当键盘按下Enter就触发Event，keyCode为13，targetCode和KeyCode相等，则将keyPressed设置为True，说明Enter键被按下
const useKeyPress = (targetCode)=>{
    const [keyPressed,setKeyPressed] = useState(false);
    const keyDownEvent = (event)=>{
        const {keyCode} = event;
        if (targetCode===keyCode){
            setKeyPressed(true)
        }
    };
    const keyUpEvent = (event)=>{
        const {keyCode} = event;
        if (targetCode===keyCode){
            setKeyPressed(false)
        }
    };
    useEffect(()=>{
        document.addEventListener('keydown',keyDownEvent);
        document.addEventListener('keyup',keyUpEvent);
        return ()=>{
            document.removeEventListener('keydown',keyDownEvent);
            document.removeEventListener('keyup',keyUpEvent)
        }
    },[]);
    return keyPressed
};
export default useKeyPress