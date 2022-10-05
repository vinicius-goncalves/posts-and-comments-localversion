const DB_NAME = 'posts-and-comments'
const DB_VERSION = 1
const OBJ_STORE_NAME = 'data'

const db = indexedDB.open(DB_NAME, DB_VERSION)

const newPost = {
    id: 9999,
    title: 'Title',
    description: 'Lorem ispum',
    comments: [
        { postedBy: 'ABCdef', commentary: 'Lorem ipsum' }
    ]
}

class Post {
    constructor(id, title, description, comments) {
        this.id = id,
        this.title = title,
        this.description = description
        this.comments = []
    }
}

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
            store.put(newPost)

        }
    })
})

function addNewPost(id, title, description) {

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
        
        const idFound = store.get(id)

        idFound.addEventListener('success', ({ target }) => {
            
            target.result.comments.push({
                postedBy, comment
            }) 

            store.put(target.result)

        })
    })
}