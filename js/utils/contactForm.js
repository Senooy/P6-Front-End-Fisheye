class Form {
    constructor() {
        this._form = document.querySelector('#toContactPhotographer')
    }

    formEvent() {
        const fieldsForm = new Map([
            ['firstName', [this._consoleDisplay]],
            ['lastName', [this._consoleDisplay]],
            ['email', [this._consoleDisplay]],
            ['msg', [this._consoleDisplay]]
        ])

        this._form.addEventListener('submit', (event) => {
            event.preventDefault();


            fieldsForm.forEach((fcts, key) => {
            const field = document.getElementsByName(key)
                
                fcts.forEach(fct => {
                    fct(field)
                })
            })
        })
    }

    _consoleDisplay(fieldList) {
        const field = this._getField(fieldList)
        console.log(`${field.name} : ${field.value}`);
    }

    _getField(fieldList) {
        return fieldList[0]
    }
}



function toggleModal() {
    document.querySelector("#modal-section").classList.toggle("show");
  }


