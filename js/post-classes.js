export { Post, Comment }

class Post {
    constructor(id, title, description, postedBy) {
        this.id = id,
        this.title = title,
        this.description = description
        this.postedBy = postedBy
        this.comments = []
    }
}

class Comment {
    constructor(id, postedBy, comment) {
        this.id = id
        this.postedBy = postedBy
        this.comment = comment
    }
}
