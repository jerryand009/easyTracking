import {catchClause} from "@babel/types";

export const db_Open = (databaseName,storeName)=>{
    return new Promise((resolve,reject)=>{
        let db;
        let indexedDB = window.indexedDB||window.msIndexedDB||window.mozIndexedDB||window.webkitIndexedDB;
        const request = indexedDB.open(databaseName);
        // 不管onupgradeneeded有没有触发最终触发onsuccess或者onerror
        request.onsuccess = ev => {
            db = ev.target.result;
            resolve(db);
            console.log(`连接数据库${databaseName}成功`)
        };
        request.onerror = ev => {
            reject(ev);
            console.log(`连接数据库${databaseName}失败`+ev);
        };
        request.onupgradeneeded = ev => {
            db = ev.target.result;
            let objectStore;
            // 数据库新建成功以后，判断一下有没有表名叫storeNamed，没有就新增一张sotreName的表格，主键是id，
            if (!db.objectStoreNames.contains(storeName)) {
                objectStore = db.createObjectStore(storeName, { keyPath: "id" });
                // createIndex 三个参数分别为索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）
                objectStore.createIndex("atd", "atd", { unique: false });
                objectStore.createIndex("forwarder", "forwarder", { unique: false });
                objectStore.createIndex("tracking", "tracking", { unique: true });
                objectStore.createIndex("initiator", "initiator", { unique: false });
                objectStore.createIndex("destination", "destination", { unique: false });
                objectStore.createIndex("ata", "ata", { unique: false });
                objectStore.createIndex("comment", "comment", { unique: false });
                console.log(`创建表${storeName}成功`)
            }
        };
    })
};
export const db_Add = (db,storeName,data)=>{
    return new Promise((resolve,reject)=>{
        let request = db.transaction([storeName], "readwrite").objectStore(storeName).add(data);
        request.onsuccess = ev => {
            // console.log ("插入数据库成功",data);
            resolve(ev);
        };
        request.onerror = ev => {
            // console.log ("插入数据库失败",ev.target.error);
            reject(ev);
        };
    })
};
export const db_BulkAdd = (db,storeName,dataList)=>{
    return new Promise((resolve,reject)=>{
        let promiseList = [];
        dataList.forEach(item => {
            promiseList.push(db_Add(db, storeName, item))
        });
        // Promise.all(promiseList).then(result=>{
        //     resolve(result)
        // })

        Promise.all(
            promiseList.map(p=>{
                // 这里给每个promise添加错误处理
                return p.catch(error=>console.log(error))
            })
        ).then(result=>{
            let sortedRes = [];
            result.forEach(item=>{
                if (item){
                    sortedRes.push(item);
                }
            });
            resolve(sortedRes)
        })
    })
};
export const db_Update = (db,storeName,data)=>{
    return new Promise((resolve,reject)=>{
        let request = db.transaction([storeName], "readwrite").objectStore(storeName).put(data);
        request.onsuccess = ev => {
            resolve(ev);
            console.log ("更新数据库成功",data)
        };
        request.onerror = ev => {
            reject(ev);
            console.log ("更新数据库失败",ev.target.error)
        };
    })
};
export const db_Remove = (db,storeName,id)=>{
    return new Promise((resolve,reject)=>{
        let request = db.transaction([storeName], "readwrite").objectStore(storeName).delete(id);
        request.onsuccess = ev => {
            resolve(ev);
            console.log ("删除数据成功",id)
        };
        request.onerror = ev => {
            reject(ev);
            console.log ("删除数据失败",ev.target.error)
        };
    })
};
export const db_FindAll = (db,storeName)=>{
    return new Promise((resolve,reject)=>{
        let request = db.transaction([storeName], "readwrite").objectStore(storeName).openCursor();
        let res = [];
        request.onsuccess = ev => {
            let cursor = ev.target.result;
            if (cursor){
                res.push(cursor.value);
                cursor.continue();
            }else{
                resolve(res);
            }
        };
    })
};
export const db_FindById = (db,storeName,id)=>{
    return new Promise((resolve,reject)=>{
        let request = db.transaction([storeName], "readwrite").objectStore(storeName).openCursor();
        let res;
        request.onsuccess = ev => {
            let cursor = ev.target.result;
            if (!cursor){resolve({error:404,msg:`id ${id} not found`})}
            try{
                if (cursor.value.id!==id){
                    cursor.continue();
                }else{
                    res = cursor.value;
                    resolve(res);
                }
            }catch (error){
                console.log(error);
            }
        };
    })
};