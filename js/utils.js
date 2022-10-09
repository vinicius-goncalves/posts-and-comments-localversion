export { randomID, randomUserID, hueColorByPercentage, getDataDOMElement }

function randomID () {
    
    const firstRandom = Math.round(Math.random() * Date.now())
    const secondRandom = Math.round(Math.random() * Number.MAX_SAFE_INTEGER)
    
    let randomsConcat = null
    randomsConcat=`${String(firstRandom.toString(16).slice(0, 6))}${secondRandom.toString(36)}`.split('').map(char => ({ char, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(item => Math.random() > .5 ? item.char.toUpperCase() : item.char.toLocaleLowerCase())
    return randomsConcat.join('')
}

function randomUserID() {
    const random = Math.round(Math.random() * Number.MAX_SAFE_INTEGER)
    return random.toString(16).slice(0, 7)
}

function hueColorByPercentage(percentage, hue0, hue1) {
    const hue = (percentage * (hue1 - hue0) + hue0)
    return `hsl(${hue}, 100%, 50%)`
}

function getDataDOMElement(attribute, value) {

    const itemFound = document.querySelector(`[${attribute}="${value}"]`)
    if(!itemFound) {
        return 'Element not found'
    }
    
    return itemFound

}