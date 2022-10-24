class TextReplication {
    constructor(input) {
        this.input = input
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
}

let inputs = document.querySelectorAll('input')
inputs.forEach(input => {
    new TextReplication(input)
})