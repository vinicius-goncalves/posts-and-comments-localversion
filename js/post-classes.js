export { Post, Comment }

class Post {
    constructor(id, title, description, comments) {
        this.id = id,
        this.title = title,
        this.description = description
        this.comments = []
    }
}

class Comment {
    constructor(postedBy, comment) {
        this.postedBy = postedBy
        this.comment = comment
    }
}
