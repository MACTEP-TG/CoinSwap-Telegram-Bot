export const roundNumber = (number) => {
    const num = Number(number)
    let roundedNum = Math.round(num * 100) / 100
    let numStr = roundedNum.toString()

    if (numStr.includes('.')) {
        numStr = numStr.replace(/\.?0+$/, '')
    }

    let finalNum = parseFloat(numStr)

    finalNum = Math.round(finalNum * 20) / 20
    return Number(finalNum)
}