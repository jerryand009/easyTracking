import xlsx from 'xlsx'
const {remote}=window.require('electron');
const {readFile}=window.require('fs').promises;

const loadExcelData = (path,sheetName)=>{
    return new Promise((resolve, reject) => {
        readFile(path).then(excelbuffer=>{
            let res = xlsx.read(excelbuffer,{type:'buffer',cellHTML:false});
            let jsonRes = xlsx.utils.sheet_to_json(res.Sheets[sheetName]);
            resolve(jsonRes)
        })
    })
};
export default loadExcelData