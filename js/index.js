class TextReplication {
    constructor(input) {
        this.input = input

        //animation
        this.input.addEventListener('focus', this.animate.bind(this))

        //replicate text
        let elementFocusedId = this.input.getAttribute('data-text-replicate')
        if (elementFocusedId === null) {
            console.warn("no attribute data-text-replicate on input")
            return
        }
        this.target = document.getElementById(elementFocusedId)
        if (this.target === null) {
            console.warn("target not found, researched id is :", elementFocusedId)
            return
        }
        this.input.addEventListener('keyup', this.replicate.bind(this))
    }

    replicate(e) {
        this.target.innerText = e.target.value
    }

    animate(e) {
        let elementFocusedPosition = this.input.getAttribute('data-card-position')
        let frontCard = document.getElementsByClassName('front-card')[0]
        let isElementBackPosition = frontCard.classList.contains('go-back')
        let backCard = document.getElementsByClassName('back-card')[0]
        if(elementFocusedPosition === 'front' && isElementBackPosition) {
            frontCard.classList.remove('go-back')
            frontCard.classList.add('go-front')
            backCard.classList.remove('go-front')
            backCard.classList.add('go-back')
        }
        else if(elementFocusedPosition === "back") {
            backCard.classList.remove('go-back')
            backCard.classList.add('go-front')
            frontCard.classList.remove('go-front')
            frontCard.classList.add('go-back')
        }
    }
}

let inputs = document.querySelectorAll('input[type=text]')
inputs.forEach(input => {
    new TextReplication(input)
})