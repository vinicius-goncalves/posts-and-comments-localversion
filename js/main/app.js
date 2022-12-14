import { STORAGE, USER } from '../storage.js'
import { POST_CREATE_INTERACTIONS } from './post-creation.js'
import { createElement } from '../utils.js'
import { INITIAL_HOME_ELEMENTS } from './dom-elements.js'

const postsWrapper = document.querySelector('[class="posts-wrapper"]')

const allCloseTargetButtons = document.querySelectorAll('[data-target-close]')
const allOpenTargetButtons = document.querySelectorAll('[data-open-target]')

function renderPosts() {

    STORAGE.getAllPosts(posts => {

        const postsDivs = posts.map(post => {
            
            const { id, title, description, postedBy, comments } = post
            
            const div_post = createElement(INITIAL_HOME_ELEMENTS(id).div_post)

            const div_postHeader = createElement(INITIAL_HOME_ELEMENTS(id).div_postHeader)
            const h2_postHeader = createElement(INITIAL_HOME_ELEMENTS(id, title).h2_postHeader)
            const span_postHeader = createElement(INITIAL_HOME_ELEMENTS(id).span_postHeader)
            div_postHeader.append(h2_postHeader, span_postHeader)

            const p_postDescription = createElement(INITIAL_HOME_ELEMENTS(null, null, description).p_postDescription)

            const ul_postStatistics = createElement(INITIAL_HOME_ELEMENTS().ul_postStatistics)
            const li_postedBy = createElement(INITIAL_HOME_ELEMENTS(null, null, null, postedBy).li_postedBy)

            STORAGE.getTotalComments(id).then(result => {
                const li_totalComments = createElement(INITIAL_HOME_ELEMENTS(id, null, null, null, result).li_totalComments)
                ul_postStatistics.append(li_postedBy, li_totalComments)
            })

            const div_commentsSection = createElement(INITIAL_HOME_ELEMENTS().div_commentsSection)
            const h2_commentsSection = createElement(INITIAL_HOME_ELEMENTS().h2_commentsSection)
            div_commentsSection.append(h2_commentsSection)

            const div_postAvaliations = createElement(INITIAL_HOME_ELEMENTS().div_postAvaliations)

            const input_commentText = createElement(INITIAL_HOME_ELEMENTS().input_commentText)
            const button_addComment = createElement(INITIAL_HOME_ELEMENTS(null, null, null, null, null, input_commentText).button_addComment)

            const i = document.createElement('i')
            i.setAttribute('class', 'material-icons')
            
            const i_textNode = document.createTextNode('reply')
            i.appendChild(i_textNode)

            button_addComment.append(i)
            div_postAvaliations.append(input_commentText, button_addComment)
            div_post.append(div_postAvaliations)

            if(!(comments.length) >= 1) {

                const span_commentsNotFound = createElement(INITIAL_HOME_ELEMENTS().span_commentsNotFound)
                div_commentsSection.append(span_commentsNotFound)

                div_post.append(div_postHeader, p_postDescription, ul_postStatistics, div_commentsSection, div_postAvaliations)

                return div_post
            }

            const commentsSection = comments.map(comment => {
                
                const div_commentDiv = createElement(INITIAL_HOME_ELEMENTS().div_commentDiv)

                const p_postedBy = createElement(INITIAL_HOME_ELEMENTS(null, null, null, postedBy).p_postedBy)
                const span_postID = createElement(INITIAL_HOME_ELEMENTS(id).span_postID)

                const p_userCommentary = createElement(INITIAL_HOME_ELEMENTS(null, null, null, null, null, null, comment))

                div_commentDiv.append(p_postedBy, span_postID, p_userCommentary)

                return div_commentDiv
            })

            commentsSection.forEach(commentDiv => div_commentsSection.append(commentDiv))

            div_post.append(div_postHeader, p_postDescription, ul_postStatistics, div_commentsSection, div_postAvaliations)

            return div_post

        })

        postsDivs.forEach(div => postsWrapper.append(div))
        
    })
}

function handleTargetClicked({ target }) {

    const targetClicked = target
    const datasetTargetClicked = targetClicked.dataset
    const datasetObjKey = Object.keys(datasetTargetClicked)[0]
    
    const itemVisibility = datasetObjKey === 'targetClose' ? 'display: none;' : 'display: flex;'
    
    return document.querySelector(`[data-wrapper="${datasetTargetClicked[datasetObjKey]}"]`)
        .setAttribute('style', itemVisibility)
}

Array.prototype.forEach.call(allCloseTargetButtons, (closeButton) => {
    closeButton.addEventListener('click', (event) => {
        handleTargetClicked(event)
    })
})

Array.prototype.forEach.call(allOpenTargetButtons, (openButton) => {
    openButton.addEventListener('click', (event) => {
        handleTargetClicked(event)
    })
})

function initilizeAppFunctions() {
    renderPosts()
    POST_CREATE_INTERACTIONS.init()
    USER.setupUser()

}

window.addEventListener('DOMContentLoaded', () => {
    initilizeAppFunctions()
})