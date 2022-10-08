export { POST_CREATE_INTERACTIONS }

const POST_CREATE_INTERACTIONS = {

    init: () => {
        
        const createNewPostButton = document.querySelector('[data-button="create-new-post"]')        
        const dataNewPost = Array.from(document.querySelectorAll('[data-new-post]'))
        const descriptionDataNewPost = document.querySelector('[data-new-post="description"]')
        
        descriptionDataNewPost.addEventListener('input', (event) => {
            
            const currentLength = event.target.value.length
            const maxLength = event.target.maxLength
            
        })

        createNewPostButton.addEventListener('click', (event) => {
            
            const postDetailsObj = dataNewPost.reduce((acc, item) => {
                const { value } = item
                acc = { ...acc, [item.dataset.newPost]: value }
                return acc
            }, {})

            console.log(postDetailsObj)

        })
    }
}