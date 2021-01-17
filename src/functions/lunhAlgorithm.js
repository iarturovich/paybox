export default function (cardNumbers) {
    const digits = []
    for (const number in cardNumbers) {
        digits.push(...Array.from(cardNumbers[number]))
    }

    const evens = []
    const unEvens = []

    digits.forEach((f, index) => {
        if ((index + 1) % 2 === 0) {
            let value = +f * 2
            if (value > 9) {
                value = +value.toString()[0] + +value.toString()[1]
            }
            evens.push(value)
        } else {
            unEvens.push(+f)
        }
    })
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const summ = unEvens.reduce(reducer) + evens.reduce(reducer)
    if (summ % 10 !== 0) {
        return {
            summ,
            message: 'Карта не действительна'
        }
    }
    return {
        summ,
        message: 'Карта действительна'
    }
}