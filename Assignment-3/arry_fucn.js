/*
    Q: Explain what is prototype and what is prototype chain in your own words.
  Ans:  
*/



Array.prototype.myReverse = function(){
    let l = 0;
    let r = this.length -1;
    
    while(l<r){
        [this[l],this[r]] = [this[r],this[l]];
        l++;
        r--;
    }
    return this;
}
/*
Test cases for myReverse
console.log([1, 2, 3].myReverse()); 
console.log([1, , 3].myReverse()); 
console.log(['1', '2', '3'].myReverse()); 
*/

Array.prototype.myJoin = function(spr=",") {
    let finalStr = "";
    // if arr not string, and if it is a matrix
    function ElementConcat(ele) {
        if(ele === null || ele === undefined){
            return "";
        // check if the ele is an array i.e nested array    
        } else if (Array.isArray(ele)){
            let nestedStr = "";
            for(let j =0; j<ele.length; j++){
                // recursively add each nested ele
                nestedStr += ElementConcat(ele[j]);
                if(j < ele.length-1){
                    nestedStr += spr;
                }
            }
            return nestedStr;
        } else {
            return ele.toString();
        }
    }
    for (let i = 0; i<this.length; i++){
        // function call for element concat
        finalStr += ElementConcat(this[i])
        if(i < this.length-1){
            finalStr += spr;
        }
    }
    return finalStr;
}
/*
Test cases for myJoin
const arr = [1,2,4,5];
const arr2 = ['a','b','c',undefined,null,'d'];
const arr3 = ['a', [1, 2, [3, 4], 'd'], 'e'];

console.log(arr3.myJoin(' '));
*/


Array.prototype.myPop = function () {
    if(this.length === 0){
        return undefined;
    }
    let poped_ele;
    poped_ele = arr[this.length-1];
    this.length = this.length-1;
    return poped_ele;
}
/*
Test cases for myPop
const arr = [1,2,3,4];
console.log(arr.myPop());
console.log(arr);
*/


Array.prototype.myPush = function(...arg){
    
    for(let i=0; i<arg.length;i++){

        this[this.length] = arg[i];
    }
}
/*
Test case for myPush
const arr = ["1","2","4"];
arr.myPush(...[3,5]);
console.log(arr);
*/


Array.prototype.myMap = function(callbackFunc, thisArg){
    if(thisArg){
        callbackFunc = callbackFunc.bind(thisArg);
    }
    let arr = new Array(this.length);

    for(let i=0; i<this.length; i++){
        // handle sparse arrays
        if(i in this){
            arr[i] = callbackFunc(this[i],i,this)
        }
    }
    return arr;
}
/*
Test cases for myMap
const numbers = [1, 4, 9];
const roots = numbers.myMap((num) => Math.sqrt(num));
console.log(roots); // Output: [1, 2, 3]

const numbers = [1, 4, 9];
const roots = numbers.myMap((num, index, array) => {
    console.log(`Element: ${num}, Index: ${index}, Array: ${array}`);
    return Math.sqrt(num);
});
console.log(roots); // Output: [1, 2, 3]
*/


Array.prototype.myIncludes = function (searchEle, fromIndex=0) {
    if(fromIndex < 0){
        // negative index is added to the arr len to get fromIndex
        fromIndex = fromIndex + this.length;
        // if the negative index is still negative then use fromIndex=0
        if(fromIndex < 0){
            fromIndex = 0;
        }
    }

    if(fromIndex > this.length){
        return false;
    }

    for(let i=fromIndex; i<this.length;i++){
        if(this[i] === searchEle || (Number.isNaN(this[i]) && Number.isNaN(searchEle))){
            return true;
        } 
    }
    return false;
}
/*
Test cases for myIncludes
const arr = [1,2,3,4,5];
console.log(arr.myIncludes(3,2)); // true
console.log(arr.myIncludes(3,3)); // false
console.log(arr.myIncludes(4,-2)); // true
console.log(arr.myIncludes(1,5)); // false

const arr2 = [1,2,NaN,4,5];
const arr3 = [1, '2', 3, null, undefined, 5];
const arr4 = [];
const arr5 = [1,2, ,4,5];

console.log(arr2.myIncludes(NaN)); // true

console.log(arr3.myIncludes(null)); // true
console.log(arr3.myIncludes(undefined)); // true
console.log(arr3.myIncludes('2')); // true

console.log(arr4.myIncludes(1)); // false

console.log(arr5.myIncludes(undefined)); // true
*/