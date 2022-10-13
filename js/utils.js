export { 
    randomID, 
    randomUserID, 
    hueColorByPercentage, 
    getDataDOMElement, 
    placeholders,
    createElement
}

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

const placeholders = (postID, type) => ({
    '${post.id}': postID,
    '${post.title}': document.querySelector(`[data-post-id="${postID}"]`).querySelector('[class="post-title"]').childNodes[0].textContent.replace(/\"/, '').trim()
})[type]

function createElement(newElementObj, appendWhere = null) {
    
    const objEntries = Object.entries(newElementObj)[0]

    const [ element, attributes ] = objEntries

    const newElement = document.createElement(element)
    
    const entriesAttribute = Object.entries(attributes)

    entriesAttribute.forEach(pair => {

        const [ attribute, value ] = pair

        if(attribute === 'eventListener' && value.active) {
            
            const { eventType, listener } = value
            newElement.addEventListener(eventType, listener)
            return

        }

        if(attribute === 'textNodeContent' && value.active) {

            const { textContent } = value
            
            const newTextNode = document.createTextNode(textContent)
            newElement.append(newTextNode)
            return

        }

        const newAttribute = document.createAttribute(attribute)
        newAttribute.value = value

        newElement.setAttributeNode(newAttribute)

    })

    if(appendWhere !== null) {
        appendWhere.append(newElement)
        return
    }

    return newElement
    
}