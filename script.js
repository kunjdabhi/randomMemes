'use strict'

const tag = document.querySelector('#tag');
const container = document.querySelector('.container');
const moreBtn = document.querySelector('.btn-more');
const loader = document.querySelector('.lds-ellipsis');
const getBtn = document.querySelector('.get-btn');
const input = document.querySelector('#subreddits');
const sideSection = document.querySelector('.side-section')

let html;

const renderMeme = function (data) {
    html = `
    <div class="meme">
    <h4>r/${data.subreddit}</h4>
    <p class="caption">
    ${data.title ? data.title : ""}
    </p>
    <img
    src=${data.url}
    alt="image"
    class="meme-image"
    />
    </div>
    `
    container.insertAdjacentHTML('beforeend', html);


}

const loading = function () {
    loader.style.display = 'inline-block'
    container.style.display = 'none';
}
const complete = function () {
    loader.style.display = 'none'
    container.style.display = 'block';
}

const getMeme = async function (url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        renderMeme(data)
    }
    catch (err) {
        console.log(err)
    }
}

const getMultipleMeme = async function (url) {
    try {
        // loading();
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        const memes = data.memes;

        memes.forEach(data => {
            renderMeme(data)
        });
        // complete();

    } catch (err) {
        console.log(err)
    }
}

getMultipleMeme('https://meme-api.herokuapp.com/gimme/10');
// getMeme('https://meme-api.herokuapp.com/gimme/ProgrammerHumor');


moreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getMultipleMeme('https://meme-api.herokuapp.com/gimme/10');
});

getBtn.addEventListener('click', () => {

    const subreddit = input.value;
    container.innerHTML = '';
    if (subreddit === '') return;
    getMultipleMeme(`https://meme-api.herokuapp.com/gimme/${subreddit}/10`);
})

sideSection.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('index')) {
        const text = e.target.textContent.slice(2)

        getMultipleMeme(`https://meme-api.herokuapp.com/gimme/${text}/10`)
    }

})

    ;

window.addEventListener('scroll', () => {

    // if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
    //     getMultipleMeme('https://meme-api.herokuapp.com/gimme/10');

    // }



})

document.body.addEventListener('DOMContentLoaded', () => {
    console.log(document.body.offsetHeight)
})


