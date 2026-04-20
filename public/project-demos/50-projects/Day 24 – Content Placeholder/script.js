const header = document.getElementById('header')
const title = document.getElementById('title')
const excerpt = document.getElementById('excerpt')
const profile_img = document.getElementById('profile_img')
const name = document.getElementById('name')
const date = document.getElementById('date')

const animated_bgs = document.querySelectorAll('.animated-bg')
const animated_bg_text = document.querySelectorAll('.animated-bg-text')

setTimeout(getData, 2500)

function getData() {
    header.innerHTML = '<img src="https://plus.unsplash.com/premium_photo-1680296669146-b6c258cbc62d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />';
    title.innerHTML= 'Lorem ipsum dolor sit amet.'
    excerpt.innerHTML= 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis, beatae?'
    profile_img.innerHTML= '<img src="https://randomuser.me/api/portraits/men/45.jpg" alt="">'
    name.innerHTML= 'John Doe'
    date.innerHTML= 'Jan 13, 2025'

    animated_bgs.forEach(bg => bg.classList.remove('animated-bg'))
    animated_bg_text.forEach(bg => bg.classList.remove('animated-bg-text'))

}