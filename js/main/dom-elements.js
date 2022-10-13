import { STORAGE } from '../storage.js'
import { USER } from '../user.js'
export { INITIAL_HOME_ELEMENTS }


//             const commentsSection = comments.map(comment => {
                
//                 const div = document.createElement('div')
//                 div.setAttribute('class', 'commentary')

//                 const p_postedBy = document.createElement('p')
//                 p_postedBy.setAttribute('class', 'posted-by')
//                 p_postedBy.textContent = `Posted by: ${comment.postedBy}`

//                 const span_postID = document.createElement('span')
//                 const textContent_span_postID = document.createTextNode(`${comment.id}`)
//                 span_postID.append(textContent_span_postID)
                
//                 const classAttribute_span_postID = document.createAttribute('class')
//                 classAttribute_span_postID.value = 'user-comment-post-id'
//                 span_postID.setAttributeNode(classAttribute_span_postID)

//                 const p_userCommentary = document.createElement('p')
//                 p_userCommentary.setAttribute('class', 'user-commentary')

//                 const p_userCommentaryTextNode = document.createTextNode(comment.comment)
//                 p_userCommentary.appendChild(p_userCommentaryTextNode)

//                 div.append(p_postedBy, span_postID, p_userCommentary)

//                 return div
//             })

//             commentsSection.forEach(commentDiv => div_commentsSection.append(commentDiv))

//             div_post.append(div_postHeader, p, ul, div_commentsSection, div_postAvaliations)

//             return div_post

//         })

function INITIAL_HOME_ELEMENTS(
    postID = null, 
    title = null, 
    description = null, 
    postedBy = null, 
    commentsLength = null,
    input_commentText = null) {

    return {
        div_post: {
            div: {
                class: 'post',
                ['data-post-id']: postID
            }
        },
        
        div_postHeader: {
            div: {
                class: 'post-header'
            }
        },
        
        h2_postHeader: {
            h2: {
                class: 'post-title',
                textNodeContent: {
                    active: true,
                    textContent: title
                }
            }
        },
        
        span_postHeader: {
            span: {
                class: 'post-id',
                textNodeContent: {
                    active: true,
                    textContent: `(${postID})`
                }
            }
        },

        p_postDescription: {
            p: {
                class: 'post-description',
                textNodeContent: {
                    active: true,
                    textContent: description
                }
            }
        },
        
        ul_postStatistics: {
            ul: {
                class: 'post-statistics'
            }
        },

        li_postedBy: {
            li: {
                textNodeContent: {
                    active: true,
                    textContent: `Posted by: ${postedBy}`
                }
            }
        },
        
        li_totalComments: {
            li: {
                textNodeContent: {
                    active: true,
                    textContent: `Total Comments: ${commentsLength}`
                }
            }
        },

        div_commentsSection: {
            div: {
                class: 'comments-section'
            }
        },
        
        h2_commentsSection: {
            h2: {
                class: 'comments-section-title',
                textNodeContent: {
                    active: true,
                    textContent: 'Comments'
                }
            }
        },

        div_postAvaliations: {
            div: {
                class: 'post-avaliations'
            }
        },
        
        input_commentText: {
            input: {
                class: 'input',
                type: 'text',
                ['data-js']: 'comment-text'
            }
        },
        
        button_addComment: {
            button: {
                class: 'input',
                type: 'button',
                ['data-js']: 'add-comment'
            }
        },

        button_addComment: {
            button: {
                class: 'input',
                type: 'button',
                ['data-js']: 'add-comment',
                eventListener: {
                    active: true,
                    eventType: 'click',
                    listener: (event) => {
        
                        const closestElementPostID = event.target.closest('[data-post-id]')
        
                        if(closestElementPostID.nodeType === Node.ELEMENT_NODE) {
        
                            if(input_commentText.value.length === 0) {
                                console.log('Write something before sending your comment.')
                                return
                            }
        
                            const inputWords = input_commentText.value.split(' ')
                            const placeholderAmount = []
        
                            for(let i = 0; i < inputWords.length; i++) {
                                if(inputWords[i].startsWith('${')) {
                                    placeholderAmount.push({
                                        type: inputWords[i],
                                        index: i
                                    })
                                }
                            }
        
                            const postID = closestElementPostID.dataset.postId
        
                            if(placeholderAmount.length >= 0) {
                                placeholderAmount.forEach((placeholder, index) => {
                                    const { type } = placeholder
                                    
                                    import('../utils.js').then(modules => {
                                        const placeholderObj = modules.placeholders(postID, type)
        
                                        inputWords[placeholder.index] = inputWords[placeholder.index].replace(type, placeholderObj)
        
                                        if(index === placeholderAmount.length - 1) {
                                            STORAGE.addNewComment(postID, USER.userID, inputWords.join(' '))
        
                                        }
                                    })
                                })
                                return
                            }
        
                            STORAGE.addNewComment(postID, USER.userID, input.value)
        
                        }
                    }
                }
            }
        },
        
        span_commentsNotFound: {
            span: {
                class: 'comments-not-found',
                textNodeContent: {
                    active: true,
                    textContent: 'There are not any comments yet'
                }
            }
        }

    }
}