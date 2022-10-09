import { randomID, hueColorByPercentage, getDataDOMElement,  } from '../utils.js'
import { STORAGE } from '../storage.js'
import { USER } from '../user.js'

export { POST_CREATE_INTERACTIONS }

const descriptionCharLength = document.querySelector('[data-new-post-details="description-char-length"]')
const descriptionDataNewPost = document.querySelector('[data-new-post="description"]')

const POST_CREATE_INTERACTIONS = {

    init: () => {
        
        const createNewPostButton = document.querySelector('[data-button="create-new-post"]')        
        const dataNewPost = Array.from(document.querySelectorAll('[data-new-post]'))
        
        descriptionDataNewPost.addEventListener('input', (event) => {
            
            const currentLength = event.target.value.length
            const maxLength = event.target.maxLength

            const lengthInformation = document.createTextNode(`${currentLength}/${maxLength}`)

            if(descriptionCharLength.childNodes[0].nodeType === Node.TEXT_NODE) {
                descriptionCharLength.childNodes[0].remove()
            }

            const attribute = document.createAttribute('style')
            attribute.value = `color: ${hueColorByPercentage((currentLength / maxLength), 135, 0)}`

            descriptionCharLength.setAttributeNode(attribute)
            
            descriptionCharLength.append(lengthInformation)
            
        })

        createNewPostButton.addEventListener('click', () => {
            
            const newPostObjPromise = new Promise(resolve => {

                const postDetailsObj = dataNewPost.reduce((acc, item) => {
                    const { value } = item
                    acc = { ...acc, [item.dataset.newPost]: value }
                    return acc
                }, {})
    
                resolve(postDetailsObj)
                
            })

            newPostObjPromise.then(obj => {
                
                Object.defineProperty(obj, 'id', {
                    value: randomID(),
                    enumerable: true 
                })

                const { id, title, description } = obj

                STORAGE.createNewPost(id, title, description, USER.userID, (result) => {

                    const newPostID = result.id

                    const elementFound = getDataDOMElement('data-post-id', newPostID)
                    console.log(elementFound)

                })
            })
        })
    },

    initInformations: function() {

        const maxLength = descriptionDataNewPost.maxLength
        const currentLength = descriptionDataNewPost.value.length

        const textNode = document.createTextNode(`${currentLength}/${maxLength}`)

        descriptionCharLength.childNodes[0].remove()

        descriptionCharLength.append(textNode)
        
    }
}

window.addEventListener('DOMContentLoaded', () => {
    POST_CREATE_INTERACTIONS.initInformations()
})