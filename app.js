console.log('hello world');

const formatTime = (time, filler) => {
    if (time > 9) return "" + time;
    return (filler ? filler : "0") + "" +time;
}

const setVisibility = (id, visible) => {
    let display = visible ? 'block' : 'none';
    document.getElementById(id).style.display = display;
}

const addMedal = (name) => {
    let img = document.createElement("img");
    img.src = 'img/' + name + '.png';
    img.className = 'medal';
    img.addEventListener("animationend", () => {
        img.remove();
    }, false);
    document.getElementById('medals').appendChild(img);
}

const TIMEOUT = 3000;

const Game = {
    _resetState: () => {
        Game._state = {
            answer: undefined,
            answers: [],
            timer: undefined,
            timerElem: document.getElementById('timer'),
            medals: {}
        };
    },

    _medal: () => {
        let answers = Game._state.answers;
        if (answers.length == 1) {
            addMedal('firstblood');
        }
        if (answers.length % 2 == 0) {
            addMedal('impressive');
        }
        if (TIMEOUT - answers[answers.length-1] < 500) {
            addMedal('diehard');
        }
        if (answers[answers.length-1] < 500) {
            addMedal('headshot');
        }
    },

    timedOut: () => {
        let now = new Date().getTime() - Game._state.timer;
        if (now >= TIMEOUT) {
            Game.end();
        } else {
            Game._state.timerElem.style.width = (100 - (now / TIMEOUT) * 100) + "%";
            Game._state.timeout = setTimeout(Game.timedOut, 1);
        }
    },

    round: () => {
        if (Game._state.timeout) {
            clearTimeout(Game._state.timeout);
        }

        let time = Math.round(Math.random() * 60) % 60;
        Game._state.answer = (time + 30) % 60;
        document.getElementById('time').innerHTML = formatTime(time);
        for (let i of [0, 1, 2, 3, 4, 5]) {
            let second = Math.floor(time % 10);
            document.getElementById('box'+i).innerHTML = formatTime(second, i);
        }
        Game._state.timer = new Date().getTime();
        Game._state.timeout = setTimeout(Game.timedOut, 1);
    },

    answer: (event) => {
        let answer = Number.parseInt(event.target.innerHTML);
        let correct = Game._state.answer === answer;
        if (correct) {
            Game._state.answers.push(new Date().getTime() - Game._state.timer);
            Game._medal();
            Game.round();
        } else {
            clearTimeout(Game._state.timeout);
            Game.end();
        }
    },

    end: () => {
        setVisibility('game', false);
        setVisibility('end', true);
        document.getElementById('correct').innerHTML = Game._state.answers.length;
        if (Game._state.answers.length) {
            document.getElementById('average').innerHTML = Math.round(Game._state.answers.reduce((a, b) => a + b) / Game._state.answers.length);
        } else {
            document.getElementById('average').innerHTML = 0;
        }
    },

    start: () => {
        setVisibility('intro', false);
        setVisibility('end', false);
        setVisibility('game', true);
        Game._resetState();
        Game.round();
    }
};

document.getElementById('start').addEventListener('mousedown', Game.start);
document.getElementById('restart').addEventListener('mousedown', Game.start);
for (let box of document.querySelectorAll('.box')) {
    box.addEventListener('mousedown', Game.answer);
}
