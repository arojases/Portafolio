window.addEventListener("keydown", sound);

function sound(e){
    const audio = this.document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = this.document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audio) return;

    key.classList.add("playing");
   
    moveDown(key);
    audio.currentTime = 0;
    audio.play();

    removeClass(key);
}

function removeClass(key){

    document.addEventListener('transitionend', () => {
        key.classList.remove("playing");
    });
}

function moveDown(key){
    key.style.transform += `translateY(10px)`;


    if(key.hasAttribute('count') == false) {
        key.setAttribute('count', 1)
        
    } else {
        let a = Number(key.getAttribute('count'))
        key.setAttribute('count', a + 1)
    };


    if(key.getAttribute('count') == 10) {
        key.setAttribute('count', 0)
        key.removeAttribute('style')
    };
}



