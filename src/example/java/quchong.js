
function bianping(array) {
   return array.reduce((preV,curV,index,array)=>{
        return preV.concat(Array.isArray(curV)? bianping(curV):curV);
    },[]);
}
let array=[1,2,1,3,[4,9,5,[6,7],8],7,9];
console.log(quchong(bianping(array).sort()));
function quchong(array) {
    return array.reduce((preV,curV,index,array)=>{
        return preV.includes(curV)?preV:[...preV,curV];
    },[])
}


