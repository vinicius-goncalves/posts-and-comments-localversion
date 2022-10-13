import { STORAGE } from '../storage.js'
import { USER } from '../user.js'
export { INITIAL_HOME_ELEMENTS }


function INITIAL_HOME_ELEMENTS(
    postID = null, 
    title = null, 
    description = null, 
    postedBy = null, 
    commentsLength = null,
    input_commentText = null,
    comment = null) {

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
        },

        div_commentDiv: {
            div: {
                class: 'commentary'
            }
        },

        p_postedBy: {
            p: {
                class: 'posted-by',
                textNodeContent: {
                    active: true,
                    textContent: `Posted by: ${postedBy}`
                }
            }
        },

        span_postID: {
            span: {
                class: 'user-comment-post-id',
                textNodeContent: {
                    active: true,
                    textContent: `${postID}`
                }
            }
        },

        p_userComment: {
            p: {
                class: 'user-commentary',
                textNodeContent: {
                    active: true,
                    textContent: `${comment}`
                }
            }
        }
    }
}