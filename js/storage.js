import { Post, Comment } from './post-classes.js'
export { getAllPosts, createNewPost, addNewComment }

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

function getAllPosts(callback) {
    
    dbPromise.then(db => {
        const transaction = db.transaction(OBJ_STORE_NAME, 'readonly')
        const store = transaction.objectStore(OBJ_STORE_NAME)
        const query = store.getAll()
        
        query.addEventListener('success', ({ target }) => {
            const posts = target.result
            callback(posts)
        })
    })
}

function createNewPost(id, title, description) {

    dbPromise.then(db => {
        
        const transaction = db.transaction(OBJ_STORE_NAME, 'readwrite')
        const store = transaction.objectStore(OBJ_STORE_NAME)

        const newPostObj = new Post(id, title, description)
        store.put(newPost)

    })
}

function addNewComment(id, postedBy, comment) {

    dbPromise.then(db => {
        
        const transaction = db.transaction(OBJ_STORE_NAME, 'readwrite')
        const store = transaction.objectStore(OBJ_STORE_NAME)
        const cursor = store.openCursor()

        cursor.addEventListener('success', ({ target }) => {
            
            const { ['result']: cursor } = target
            
            if(!cursor) { return }

            const post = cursor.value
            const { ['id']: postId, comments } = post

            if(postId === id) {
                
                const newComment = new Comment(postedBy, comment)
                comments.push(newComment)

                const update = cursor.update(post)

            }
            
            cursor.continue()

        })
    })
}