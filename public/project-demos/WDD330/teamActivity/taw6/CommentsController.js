export default class CommentsController {
    commentList = []
    constructor(type, containerElement) {
        let comments = []
        this.type = type;
        this.commentList = JSON.parse(localStorage.getItem('Comments')) == undefined ? comments : JSON.parse(localStorage.getItem('Comments'))[type];
        this.containerElement = containerElement;
    }


    getAllComments() {
        return this.commentList;
    }

    filterCommentsByName(name) {
        return this.commentList.filter(element => element.name == name);
    }

    renderCommentList(list) {
        this.clearComments();
        list.forEach(element => {
            let div = document.createElement('div');
            div.classList.add("comment");
            div.innerHTML += `<h4>${element.name}</h4>
                         <p>${element.date}</p>
                         <p>${element.content}</p>`
            this.containerElement.appendChild(div);
        });
    }

    clearComments() {
        let renderedComments = document.getElementsByClassName('comment');
        if (renderedComments != null) {
            [...renderedComments].forEach(element => {
                element.parentNode.removeChild(element);
            });
        }
    }

    addCommentsControls() {
        this.clearCommentsControls();
        let commentsControls = document.createElement('div');
        commentsControls.id = 'commentsControl';
        let area = document.createElement('textarea');
        area.id = 'commentsInput';
        let button = document.createElement('button');
        button.innerText = 'Add comment';
        button.id = 'commentButton';
        commentsControls.appendChild(area);
        commentsControls.appendChild(button);
        this.containerElement.appendChild(commentsControls);
        button.onclick = () => {
            //this.addComment(this.type, {name})
            let hikeName = this.containerElement //container
                .parentNode.children["hikes"] //hike
                .children[0] //li
                .children[0].innerText; //title
            this.addComment(this.type, {
                name: hikeName,
                date: new Date(),
                content: area.value
            });
            this.renderCommentList(this.filterCommentsByName(hikeName));
            console.log(this.commentList);
        }
    }

    clearCommentsControls() {
        let controls = document.getElementById('commentsControl');
        if (controls) {
            controls.parentNode.removeChild(controls);
        }
    }

    addComment(type, comment) {
        this.commentList.unshift(comment);
        this.saveComment(type);
    }
    saveComment(type) {
        let comments = JSON.parse(localStorage.getItem("Comments")) || {};
        if (this.commentList != null) {
            comments[type] = this.commentList;
            localStorage.setItem("Comments", JSON.stringify(comments));
        }
    }
}