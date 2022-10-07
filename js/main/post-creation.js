export { POST_CREATE_INTERACTIONS }

const POST_CREATE_INTERACTIONS = {

    init: () => {
        const createNewPostButton = document.querySelector('[data-button="create-new-post"]')

        createNewPostButton.addEventListener('click', (event) => {
            console.log(event)
        })
    }
}