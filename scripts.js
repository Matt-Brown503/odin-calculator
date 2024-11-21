console.log('connected')

const calcKeyNums = [7,8,9,'+',4,5,6,'-',1,2,3,'x','c',0,'=','/']
const calcKeysContainer = document.querySelector('#calcKeysContainer')

function createCalcKey(k) {
    let newKey = document.createElement('div')
    newKey.id = k
    let classAttributes = k;
    newKey.setAttribute('class', 'calc-key')
    let keySpan = document.createElement('span')
    keySpan.innerText = k

    newKey.appendChild(keySpan)
    return newKey
}


calcKeyNums.forEach(key => {
    calcKeysContainer.appendChild(createCalcKey(key))
});

