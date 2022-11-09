class InputCard {
    constructor(input) {
        this.input = input

        //animation
        this.input.addEventListener('focus', this.animate.bind(this))

        //replicate text
        this.input.addEventListener('keyup', this.replicate.bind(this))
        this.input.addEventListener('change', this.replicate.bind(this))
    }

    replicate(e) {
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
        //format card number value on the illustration
        if (this.target.getAttribute('id') === "card-number") {
            function cc_format(value) {
                let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
                let matches = v.match(/\d{4,16}/g);
                let match = matches && matches[0] || ''
                let parts = []

                for (let i = 0, len = match.length; i < len; i += 4) {
                    parts.push(match.substring(i, i + 4))
                }

                if (parts.length) {
                    return parts.join(' ')
                } else {
                    return value
                }
            }
            this.target.innerText = cc_format(e.target.value)
        }
        else {
            this.target.innerText = e.target.value
        }

        /*HOW TO USE
        add data-text-replicate to input, and refer to corresponding id to replicate the 
        value in the input
        */
    }

    animate(e) {
        let elementFocusedPosition = this.input.getAttribute('data-card-position')
        let frontCard = document.getElementsByClassName('front-card')[0]
        let isElementBackPosition = frontCard.classList.contains('go-back')
        let backCard = document.getElementsByClassName('back-card')[0]

        if (elementFocusedPosition === null) {
            console.warn('no attribute data-card-position on input')
            return
        }
        if (elementFocusedPosition === 'front' && isElementBackPosition) {
            frontCard.classList.remove('go-back')
            frontCard.classList.add('go-front')
            backCard.classList.remove('go-front')
            backCard.classList.add('go-back')
        }
        else if (elementFocusedPosition === "back") {
            backCard.classList.remove('go-back')
            backCard.classList.add('go-front')
            frontCard.classList.remove('go-front')
            frontCard.classList.add('go-back')
        }

        /*HOW TO USE
      add data-card-position to input, add value "front" if the focus input correspond to an element
      in the front of the card. If not, add value "back" to data-card-position
      */
    }
}

let inputs = document.querySelectorAll('input[type=text]')
inputs.forEach(input => {
    new InputCard(input)
})

//regex
function onlyLettersRegex(input) {
    let regex = /^[a-zA-Z\s]*$/;
    return regex.test(input);
}

function onlyNumbersRegex(input) {
    let regex = /^[0-9]*$/;
    return regex.test(input);
}

//validate form
let validFormButton = document.getElementById('valid-form-button')
let formCard = document.getElementById('form-card')
let finish = document.getElementById('finish')

function validateForm(e) {
    let cardNameInput = document.getElementById('cardholder-name')
    let cardNumberInput = document.getElementById('card-number-front')
    let expirationMonthInput = document.getElementById('expiration-month-input')
    let expirationYearInput = document.getElementById('expiration-year-input')
    let secretCodeInput = document.getElementById('secret-code-input')

    if(onlyLettersRegex(cardNameInput.value) === false || cardNameInput.value === "") {
        console.log('merci de remplir le champ nom')
        return false
    }
    if(onlyNumbersRegex(cardNumberInput.value) === false || cardNumberInput.value === "") {
        console.log('merci de remplir le numéro de carte bancaire')
        return false
    }
    if(onlyNumbersRegex(expirationMonthInput.value) === false || expirationMonthInput.value === "") {
        console.log('merci de remplir le mois dexpiration')
        return false
    }
    if(onlyNumbersRegex(expirationYearInput.value) === false || expirationYearInput.value === "") {
        console.log('merci de remplir lannee dexpiration')
        return false
    }
    if(onlyNumbersRegex(secretCodeInput.value) === false || secretCodeInput.value === "") {
        console.log('merci de remplir le code secret')
        return false
    }
    //preventDefault is to avoid the refresh of the page. in this case, we just need to simulate success message
    e.preventDefault()

    //form is valid, than display message
    formCard.style.display = "none"
    finish.style.display = "flex"
}

validFormButton.addEventListener('click', validateForm)

//remove "thank you message"
let continueButton = document.getElementById('continue')
continueButton.addEventListener('click', function(){
    formCard.style.removeProperty('display')
    finish.style.removeProperty('display')
})