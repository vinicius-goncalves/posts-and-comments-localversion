import { Post, Comment } from './post-classes.js'
import { randomID } from './utils.js'

export { STORAGE }

const DB_NAME = 'posts-and-comments'
const DB_VERSION = 1
const OBJ_STORE_NAME = 'data'

const db = indexedDB.open(DB_NAME, DB_VERSION)

const dbPromise = new Promise(resolve => {

    db.addEventListener('success', (event) => {
        
        const dbResult = event.target.result
        resolve(dbResult)
    })

    db.addEventListener('upgradeneeded', (event) => {

        const dbResult = event.target.result
        const { objectStoreNames } = dbResult

        if(!(objectStoreNames.contains(OBJ_STORE_NAME))) {

            const store = dbResult.createObjectStore(OBJ_STORE_NAME, { keyPath: 'id' })
            store.createIndex('idIndex', 'id', { unique: true })
            store.createIndex('titleIndex', 'title', { unique: false })
            store.createIndex('descriptionIndex', 'description', { unique: false })

        }
    })
})

const STORAGE = {

    makeTransaction: function() {

    },

    getAllPosts: function (callback) {
    
        dbPromise.then(db => {
            const transaction = db.transaction(OBJ_STORE_NAME, 'readonly')
            const store = transaction.objectStore(OBJ_STORE_NAME)
            const query = store.getAll()
            
            query.addEventListener('success', ({ target }) => {
                const posts = target.result
                callback(posts)
            })
        })
    },
    
    createNewPost: function (id, title, description, postedBy, callback = null) {
    
        dbPromise.then(db => {
            
            const transaction = db.transaction(OBJ_STORE_NAME, 'readwrite')
            const store = transaction.objectStore(OBJ_STORE_NAME)
    
            const newPostObj = new Post(id, title, description, postedBy)
            const query = store.put(newPostObj)

            query.addEventListener('success', (event) => {

                const objectStoreID = event.target.result

                const deepQuery = store.get(objectStoreID)
                
                deepQuery.addEventListener('success', (event) => {
                    callback(event.target.result)
                })
            })
        })
    },
    
    addNewComment: function (postIdToAdd, postedBy, comment, callback) {
    
        dbPromise.then(db => {
            
            const transaction = db.transaction(OBJ_STORE_NAME, 'readwrite')
            const store = transaction.objectStore(OBJ_STORE_NAME)
            const cursor = store.openCursor()
    
            cursor.addEventListener('success', ({ target }) => {
                
                const { ['result']: cursor } = target
                
                if(!cursor) { return }
    
                const post = cursor.value
                const { ['id']: postId, comments } = post
    
                if(postId === postIdToAdd) {
                    
                    const newComment = new Comment(randomID(), postedBy, comment)
                    comments.push(newComment)
    
                    const update = cursor.update(post)

                    update.addEventListener('success', () => {

                        const commentsSection = document.querySelector(`[data-post-id="${postIdToAdd}"]`).querySelector('[class="comments-section"]')
                        
                        const { id, postedBy, comment } = newComment

                        const div = document.createElement('div')
                        div.setAttribute('class', 'commentary')

                        const p_postedBy = document.createElement('p')
                        p_postedBy.setAttribute('class', 'posted-by')
                        p_postedBy.textContent = `Posted by: ${postedBy}`

                        const p_userCommentary = document.createElement('p')
                        p_userCommentary.setAttribute('class', 'user-commentary')

                        const p_userCommentaryTextNode = document.createTextNode(comment)
                        p_userCommentary.appendChild(p_userCommentaryTextNode)

                        div.append(p_postedBy, p_userCommentary)

                        commentsSection.append(div)

                    })
                }
                
                cursor.continue()
    
            })
        })
    },

    getTotalComments: function (postID, callback) {

        dbPromise.then(db => {
            const transaction = db.transaction(OBJ_STORE_NAME, 'readonly')
            const store = transaction.objectStore(OBJ_STORE_NAME)
            const query = store.get(postID)
            
            query.addEventListener('success', (event) => {
                callback(event.target.result.comments.length)
            })
        })
    }
}