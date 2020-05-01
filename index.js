let $start = document.querySelector('#start');
let $game = document.querySelector("#game")
let $time = document.querySelector("#time");
let $timeHeader = document.querySelector("#time-header");
let $resultHeader = document.querySelector("#result-header");
let $result = document.querySelector("#result");
let $gameTime = document.querySelector('#game-time');



//Счет
let score = 0;
//Игра не идет
let gameStarted = false;


function show($el) {
    $el.classList.remove('hide');
}

function hide($el) {
    $el.classList.add('hide')
}

//1 шаг
$start.addEventListener("click", startGame);
//2 шаг
$game.addEventListener("click", handleBox);

$gameTime.addEventListener("input", setTime);
//Функция определения бокса
function handleBox(event) {
    if (!gameStarted) {
        return
    }

    //Если мы кликнули по боксу с атрибутом бокс то тогда генерируем новый
    if (event.target.dataset.box) {
        score++;
        renderBox();
    }
}



//Функция начала игры
function startGame() {
    score = 0;
    $gameTime.setAttribute('disabled', 'true')
    setTime();

    hide($start)
    $game.style.background = "#fff"
    gameStarted = true;
    let interval = setInterval(function() {
        let time = parseFloat($time.textContent);
        if (time <= 0) {
            clearInterval(interval);
            endGame();
            //end game
        } else {
            $time.textContent = (time - 0.1).toFixed(1);
        }


    }, 100)

    renderBox()
}

//Окончание игры
function endGame() {
    gameStarted = false;
    setResultScore();
    $gameTime.removeAttribute('disabled')
    show($resultHeader);
    hide($timeHeader);
    $game.innerHTML = '';
    $game.style.background = "#ccc";
    show($start);

}

//Функция счета
function setResultScore() {
    $result.textContent = score.toString();
}

//Функция установки времени
function setTime() {
    let time = +$gameTime.value;
    $time.textContent = time.toFixed(1);
    hide($resultHeader);
    show($timeHeader);
}

//Функция создания бокса
function renderBox() {
    //Очищаем при каждом заходе
    $game.innerHTML = '';
    let boxSize = getRandom(20, 50);
    //Узнаем ширину и высоту поля
    let gameSize = $game.getBoundingClientRect();
    console.log(gameSize)
    let maxTop = gameSize.height - boxSize;
    let maxLeft = gameSize.left - boxSize;
    //Создание бокса
    let box = document.createElement('div');
    //К ширине и высоте бокса прибавляется рандомное значение
    box.style.height = box.style.width = boxSize + "px";
    box.style.position = "absolute";
    box.style.top = getRandom(0, maxTop) + "px";
    box.style.left = getRandom(0, maxLeft - 300) + "px";
    box.style.backgroundColor = "#000";
    box.style.cursor = "pointer";
    box.setAttribute('data-box', 'true')

    //
    // Добавление в поле 
    $game.insertAdjacentElement('afterbegin', box)
    colorBox(box);
}


//Рандомные цвета
function colorBox($el) {
    r = Math.floor(Math.random() * 255);
    g = Math.floor(Math.random() * 255);
    b = Math.floor(Math.random() * 255);
    $el.style.backgroundColor = `rgb(${r},${g},${b})`;
}

//Рандомные значения
function getRandom(max, min) {
    return Math.floor(Math.random() * (max - min) + min)
}