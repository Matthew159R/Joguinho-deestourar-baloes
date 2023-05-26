const body = document.querySelector('body')
const gameScreen = document.querySelector('.game-screen')
const hitsTag = document.querySelector('.hits')
const ballon = document.querySelector('.ballon')
const mistakesTag = document.querySelector('.mistakes')
const buttonPlay = document.querySelector('.conteiner-button-play')
const configContainer = document.querySelector('.config-container')
const easyDifficulty = document.querySelector('.easy')
const mediumDifficulty = document.querySelector('.medium')
const hardDifficulty = document.querySelector('.hard')
const timer = document.querySelector('.timer')
const config = document.querySelector('.config')
const buttonReplay = document.querySelector('.button-replay')

// Variáveis que armazenam acertos, erros, a classe que contém a skin do balão e a dificuldade
let hits = 0
let mistakes = 0
let classBallonImg = ''
let difficulty = 0

// Função do balão
const createBallon = () => {
    const ballon = document.createElement('div')
    
     // Caso o usuário não tenha selecionado dificuldade ela vai ser de 1 segundo para o desaparecimento do balão
     if (difficulty === 0) {
        difficulty = 1000
    }
    
    if (!classBallonImg) {
        ballon.className = 'ballon'

        setTimeout(() => {
            ballon.style.animation = ''
            ballon.style.animation = 'ballon-animation-reverse 0.8s forwards'

        setTimeout(() => {
            gameScreen.querySelector('.ballon').remove()
        }, difficulty)
    }, difficulty)

    }else {
        ballon.className = classBallonImg
        ballon.style.display = 'flex'

        // Tempo para o balão ser removido
        setTimeout(() => {
            ballon.style.animation = ''
            ballon.style.animation = 'ballon-animation-reverse 0.8s forwards'

        setTimeout(() => {
            gameScreen.querySelector(`.${classBallonImg}`).remove()
        }, difficulty)
    }, difficulty)
    }

    const positionY = Math.floor(Math.random() * gameScreen.offsetHeight);
    const positionX = Math.floor(Math.random() * gameScreen.offsetWidth);

    ballon.style.left = `${positionX - 40}px`
    ballon.style.top = `${positionY - 40}px`

    gameScreen.appendChild(ballon)

    // Animação para o balão desaparecer quando for clicado
    ballon.addEventListener('click', event => {
        setTimeout(() => {
            event.target.style.display = 'none'
        }, 100)
        event.target.style.animation = 'ballon-explose 0.2s forwards'
        console.log(event.target)
        hits += 1
    
        console.log(hits)
        hitsTag.querySelector('span').textContent = hits
   })

}

// Iniciando o jogo quando o play for iniciado
let count = 0
buttonPlay.addEventListener('click', () => {

    // Checando se o usuário escolheu ou não o count
    if (count === 0) {
        count = 10000
    }

    config.style.animation = 'config-playGame-animation 0.8s forwards'
    const isPlay = setInterval(() => createBallon(), 1200)

    setTimeout(() => {
        configContainer.style.display = 'none'
    }, 800)

    let timerSpan = count / 1000
    const timerInverval = setInterval(() => {
        count--
        timerSpan--
        timer.querySelector('span').textContent = timerSpan
    }, 1000)

    setTimeout(() => {
        // Aqui dentro vai qualquer código que tenha que aparecer no pós game

        setTimeout(() => {
            buttonReplay.style.display = 'block'
            buttonReplay.style.animation = 'button-replay-animation 1s forwards'
            buttonReplay.addEventListener('click', () => {
            location.reload(true)
        })
        }, 1000)

        clearInterval(isPlay)
        clearInterval(timerInverval)
        timer.querySelector('span').textContent = 'Fim'

    }, count)
    console.log(count)
})

gameScreen.addEventListener('click', event => {
    if (event.target.classList.contains('game-screen')) {
        mistakes += 1
        mistakesTag.querySelector('span').textContent = mistakes
    }
   })





// Animação dos balões de fala 

const skin = document.querySelectorAll('.skin')

const selectBallonSkin = document.querySelector('.select-ballon-skin')

selectBallonSkin.addEventListener('mouseover', event => {
    const moverElement = event.target

    if (moverElement.classList.contains('among-us')) {        
        moverElement.firstElementChild.style.display = 'flex'

        setTimeout(() => {
            moverElement.firstElementChild.style.display = 'none'
        }, 1000)

    }else if (moverElement.classList.contains('skin')) {
        moverElement.previousElementSibling.style.display = 'flex'

        setTimeout(() => {
            moverElement.previousElementSibling.style.display = 'none'
        }, 2500)
    }
})

//Escolhendo a skin do balão

const amongUsBlack = document.querySelector('.black')
const amongUsRed = document.querySelector('.red')
const amongUsYellow = document.querySelector('.yellow')

amongUsBlack.addEventListener('click', () => {
    amongUsBlack.classList.add('border-select')
    amongUsRed.classList.remove('border-select')
    amongUsYellow.classList.remove('border-select')
    classBallonImg = 'ballonImgblack'
})
amongUsRed.addEventListener('click', () => {
    amongUsRed.classList.add('border-select')
    amongUsBlack.classList.remove('border-select')
    amongUsYellow.classList.remove('border-select')
    classBallonImg = 'ballonImgred'
})  
amongUsYellow.addEventListener('click', () => {
    amongUsYellow.classList.add('border-select')
    amongUsBlack.classList.remove('border-select')
    amongUsRed.classList.remove('border-select')
    classBallonImg = 'ballonImgyellow'
})

//Escolhendo a dificuldade

easyDifficulty.addEventListener('click', () => {
    difficulty = 1200
    count = 20000
    easyDifficulty.classList.add('button-select')
    mediumDifficulty.classList.remove('button-select')
    hardDifficulty.classList.remove('button-select')
})
mediumDifficulty.addEventListener('click', () => {
    difficulty = 1000
    count = 15000
    easyDifficulty.classList.remove('button-select')
    mediumDifficulty.classList.add('button-select')
    hardDifficulty.classList.remove('button-select')
})
hardDifficulty.addEventListener('click', () => {
    difficulty = 700
    count = 10000
    easyDifficulty.classList.remove('button-select')
    mediumDifficulty.classList.remove('button-select')
    hardDifficulty.classList.add('button-select')
})