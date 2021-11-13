
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// disable/enable button

function toggleButton() {
    button.dissabled = !button.disabled;
}

// passing joke to voiceRSS api

function tellMe(joke) {
    VoiceRSS.speech({
        key: '2f01c1c8905c4a37afe6a28b4ee8717b',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//get jokes from jokeAPI 

async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        tellMe(joke);
        toggleButton();
    } catch (error) {
        //catch errors here
        console.log('whoops', error)
    }
}

// event listener

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);