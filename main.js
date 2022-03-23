const keys = document.querySelectorAll(".key")

function PlayNote(event){
    let audioKeyCode = getKeyCode(event)

    const key = document.querySelector(`.key[data-key="${audioKeyCode}"]`)

    const cantFoundAnyKey = !key // A exclamação especifica que o true que a variável recebe é invertido. Se key for false, cantFoundAnyKey recebe true.
    if (cantFoundAnyKey){
        return
    }

    /* VERSÃO ALTERNATIVA:
    const isKeyExists = key
    if (!isKeyExists){ // A exclamação inverte o valor do boolean. Se a tecla não existe, o retorno é true.
        return
    }
    */

    addPlayingClass(key) // Reproduz a sequência de funções para a animação da tecla sendo pressionada.
    playAudio(audioKeyCode) // Toca o audio da tecla.
}

function addPlayingClass(key){
    key.classList.add('playing') // Adiciona a classe playing.
}

function getKeyCode(event){
    let KeyCode
    
    const isKeyboard = event.type === "keydown"
    if (isKeyboard){
        KeyCode = event.KeyCode
    } else {
        KeyCode = event.target.dataset.key
    } // Se o evento for no teclado, KeyCode recebe a informação, senão, a verificação acontece por clique com o mouse pegando a informação dentro do elemento em HTML.

    return KeyCode // Se você quer que a função retorne um valor para ser usado fora do escopo, deve sempre ser definido return.
}

function playAudio(audioKeyCode){
    const audio = document.querySelector(`audio[data-key="${audioKeyCode}"]`)
    audio.currentTime = 0 // Incio em zero
    audio.play() // Tocar quando for clicada a tecla
}

function removePlayingClass(event){
    event.target.classList.remove("playing") // Remover a classe playing.
}

keys.forEach(function(key){ // Essa função cria uma variável apenas dentro do próprio escopo que recebe o evento de clique por meio do listener, após isso, esse evento é redirecionado para a função PlayNote.
    key.addEventListener("click", PlayNote)
    key.addEventListener("transitionend", removePlayingClass) // Após a transição acabar, iniciar a função.
})

window.addEventListener("keydown", PlayNote) // O listener espera o evento acontecer e manda esse evento como parâmetro para a função. A função precisa que o parâmetro seja definido, já que o listener apenas guarda a informação, e a função que irá interagir com ela.