const positionBoard = [
    ["-", "g", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["g", "g", "g", "g", "g", "-", "-", "-", "-", "-"],
    ["-", "g", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "b", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "b", "-", "-", "-", "-", "-", "-", "-", "b"],
    ["b", "b", "b", "b", "b", "-", "b", "b", "b", "b"],
  ];
  

const checkWinCondition = (row, col, color) => {
    let flag1 = checkVertical(col, color) // col will remain same
    let flag2 = checkHorizontal(row, color) // row will remain same

    return (flag1 || flag2)
}
  
function allAreEqual(array, color) {
    const result = array.every(element => {
        if (element === color) {
            return true;
        } else {
            return false
        }
    });

    return result
}


const checkVertical = (col, color) => {
    var checkArray = []
    let count = 2
    let win = false
    // let x = 10
    console.log("check:", positionBoard[0][col])
    let x = 6

    for (let i = 0; i < x; i++) {
        for (let k = i; k < count; k++) {
            console.log("k", k)
            let value = positionBoard[k][col]
            checkArray.push(value)
        }
        console.log(i, ":", checkArray)
        count+=1

        if(allAreEqual(checkArray, color)) {
        win = true
        return win
        }

        checkArray = []
    }

    return win
}

const checkHorizontal = (row, color) => {
    var checkArray = []
    let count = 2
    let win = false

    for (let i = 0; i < 6; i++) {
        for (let k = i; k < count; k++) {
            checkArray.push(positionBoard[row][k])
        }
        console.log(i, ":", checkArray)
        count+=1

        if(allAreEqual(checkArray, color)) {
        win = true
        return win
        }

        checkArray = []
    }

    return win
}

console.log(checkHorizontal(0, "b"))
// let y = positionBoard[1][0]
// console.log(y)
