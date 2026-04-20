import HikeModel from './HikeModel.js';
import HikeView from './HikeView.js';
import CommentsController from './CommentsController.js';

export default class HikeController {
    constructor(containerID) {
        this.containerElement = document.getElementById(containerID);
        this.model = new HikeModel();
        this.view = new HikeView(this.containerElement);
        this.comments = new CommentsController('hikes', document.getElementById("comments"));
        self = this;
    }

    getAllHikes() {
        self.view.renderHikeList(self.model.getAllHikes());
        self.comments.clearCommentsControls();
        self.comments.renderCommentList(self.comments.getAllComments())
        self.addListeners("h2");
    }

    getSingleHike(hikeName) {
        self.view.renderDetailedHike(self.model.getHikeByName(hikeName));
        let backButton = document.getElementById("backToMain");
        self.comments.addCommentsControls();
        self.comments.renderCommentList(self.comments.filterCommentsByName(hikeName));
        backButton.addEventListener('click', this.getAllHikes);
    }

    addListeners(elementTag) {
        let elements = document.getElementsByTagName(elementTag);

        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', function () {
                self.getSingleHike(elements[i].innerText);
            });
        }
    }
}