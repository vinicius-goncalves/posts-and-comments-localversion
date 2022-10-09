import { randomUserID } from '../utils.js'
import { STORAGE } from '../storage.js'
import { POST_CREATE_INTERACTIONS } from './post-creation.js'
import { USER } from '../user.js'

const postsWrapper = document.querySelector('[class="posts-wrapper"]')

const allCloseTargetButtons = document.querySelectorAll('[data-target-close]')
const allOpenTargetButtons = document.querySelectorAll('[data-open-target]')

function renderPosts() {

    STORAGE.getAllPosts(posts => {

        const postsDivs = posts.map(post => {
            
            const { id, title, description, postedBy, comments } = post
            
            const div_post = document.createElement('div')
            div_post.setAttribute('class', 'post')
            div_post.setAttribute('data-post-id', id)

            const div_postHeader = document.createElement('div')
            div_postHeader.setAttribute('class', 'post-header')

            const h2_postHeader = document.createElement('h2')
            h2_postHeader.setAttribute('class', 'post-title')
            h2_postHeader.textContent = title

            const span_postHeader = document.createElement('span')
            span_postHeader.setAttribute('class', 'post-id')
            span_postHeader.textContent = `(${id})`

            div_postHeader.append(h2_postHeader, span_postHeader)

            const p = document.createElement('p')
            p.setAttribute('class', 'post-description')
            p.textContent = description

            const ul = document.createElement('ul')
            ul.setAttribute('class', 'post-statistics')

            const li_postedBy = document.createElement('li')
            li_postedBy.textContent = `Posted by: ${postedBy}` 

            const li_totalComments = document.createElement('li')
            STORAGE.getTotalComments(id, result => {
                li_totalComments.textContent = `Total Comments: ${result}`
            })

            ul.append(li_postedBy, li_totalComments)

            const div_commentsSection = document.createElement('div')
            div_commentsSection.setAttribute('class', 'comments-section')
            
            const h2_commentsSection = document.createElement('h2')
            h2_commentsSection.setAttribute('class', 'comments-section-title')
            h2_commentsSection.textContent = 'Comments'

            div_commentsSection.append(h2_commentsSection)

            const div_postAvaliations = document.createElement('div')
            div_postAvaliations.setAttribute('class', 'post-avaliations')

            const input = document.createElement('input')
            input.setAttribute('class', 'input')
            input.setAttribute('type', 'text')
            input.setAttribute('data-js', 'comment-text')
            
            const button = document.createElement('button')
            button.setAttribute('class', 'input')
            button.setAttribute('type', 'button')
            button.setAttribute('data-js', 'add-comment')

            button.addEventListener('click', (event) => {

                // console.log(event.target.closest('[data-post-id]'))
                const closestElementPostID = event.target.closest('[data-post-id]')

                if(closestElementPostID.nodeType === Node.ELEMENT_NODE) {

                    const postID = closestElementPostID.dataset.postId
                    console.log(postID)
                    STORAGE.addNewComment(postID, USER.userID, input.value)

                }
            })

            const i = document.createElement('i')
            i.setAttribute('class', 'material-icons')
            
            const i_textNode = document.createTextNode('reply')
            i.appendChild(i_textNode)

            button.append(i)

            div_postAvaliations.append(input, button)

            div_post.append(div_postAvaliations)

            if(!(comments.length) >= 1) {

                const span = document.createElement('span')
                span.setAttribute('class', 'comments-not-found')
                span.textContent = 'There are not any comments yet'
                div_commentsSection.append(span)

                div_post.append(div_postHeader, p, ul, div_commentsSection, div_postAvaliations)

                return div_post
            }

            const commentsSection = comments.map(comment => {
                
                const div = document.createElement('div')
                div.setAttribute('class', 'commentary')

                const p_postedBy = document.createElement('p')
                p_postedBy.setAttribute('class', 'posted-by')
                p_postedBy.textContent = `Posted by: ${comment.postedBy}`

                const p_userCommentary = document.createElement('p')
                p_userCommentary.setAttribute('class', 'user-commentary')

                const p_userCommentaryTextNode = document.createTextNode(comment.comment)
                p_userCommentary.appendChild(p_userCommentaryTextNode)

                div.append(p_postedBy, p_userCommentary)

                return div
            })

            commentsSection.forEach(commentDiv => div_commentsSection.append(commentDiv))

            div_post.append(div_postHeader, p, ul, div_commentsSection, div_postAvaliations)

            return div_post

        })

        postsDivs.forEach(div => postsWrapper.append(div))
        
    })
}

Array.prototype.forEach.call(allCloseTargetButtons, (closeButton) => {
    closeButton.addEventListener('click', (event) => {
        
        const targetClicked = event.target
        const datasetTargetClose = targetClicked.dataset.targetClose
        
        document.querySelector(`[data-wrapper="${datasetTargetClose}"]`)
            ?.setAttribute('style', 'display: none;')
        
    })
})

Array.prototype.forEach.call(allOpenTargetButtons, (openButton) => {
    
    openButton.addEventListener('click', (event) => {
    
        const targetClicked = event.target
        const datasetOpenTarget = targetClicked.dataset.openTarget
        document.querySelector(`[data-wrapper="${datasetOpenTarget}"]`)
            ?.setAttribute('style', 'display: flex;')

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