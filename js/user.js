import { randomUserID } from './utils.js'

export { USER }

const USER = {

    setupUser: function() {
        if(localStorage.getItem('posts_user') === null) {
            localStorage.setItem('posts_user', randomUserID())
        }
    },

    get userID () {
        if(localStorage.getItem('posts_user') !== null) {
            return localStorage.getItem('posts_user')
        } 
            
        this.setupUser()
        return this.userID

    }
}