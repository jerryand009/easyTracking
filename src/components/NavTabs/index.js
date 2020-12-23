import React from 'react'
import classnames from 'classnames'
const NavTabs = ({tabList,activeTab,onTabClick})=>{
    return (
        <ul className="nav nav-tabs">
            {
                tabList.map((tab)=>{
                    const className = classnames({
                        "nav-link":true,
                        "active":activeTab===tab.id
                    });
                    return (
                        <li className="nav-item pointer" key={tab.id}>
                            {
                                <span className={className} onClick={()=>onTabClick(tab.id)}>{tab.title}</span>
                            }
                        </li>
                    )
                })
            }
        </ul>
    )
};
export default NavTabs