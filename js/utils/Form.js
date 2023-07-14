class Form {
    constructor(idForm) {
        this._idForm = idForm;
    }

    generateFields(formFields) {
        // Création du formulaire
        const form = document.createElement("form");
        form.id = this._idForm;

        // Boucle pour créer les champs du formulaire
        formFields.forEach((field) => {
            const { label, name, type, options, attributs } = field;

            const fieldLabel = this._generateLabel({ label, name })
            const fieldInput = this._generateInput({ name, type, options, attributs })

            const $wrapper = document.createElement('div');
            $wrapper.classList.add('formData');

            $wrapper.appendChild(fieldLabel);
            $wrapper.appendChild(fieldInput);
            form.appendChild($wrapper);
        });

        return form;
    }

    _generateLabel({ label, name }) {
        // Création de l'élément de label
        const fieldLabel = document.createElement("label");
        fieldLabel.for = name;
        fieldLabel.textContent = label;

        return fieldLabel;
    }

    _generateInput({ name, type, options, attributs }) {
        // Création de l'élément de champ
        let fieldInput;
        if (type === "textarea") {
            fieldInput = document.createElement("textarea");
        } else if (type === "select") {
            fieldInput = document.createElement("select");
            // Boucle pour créer les options du menu déroulant
            options.forEach((option) => {
                const selectOption = document.createElement("option");
                selectOption.value = option;
                selectOption.textContent = option;
                fieldInput.appendChild(selectOption);
            });
        } else {
            fieldInput = document.createElement("input");
            fieldInput.type = type;
        }

        fieldInput.id = name;
        fieldInput.name = name;

        // Ajout des attributs personnalisés
        if (attributs) {
            for (const [attr, value] of Object.entries(attributs)) {
                fieldInput.setAttribute(attr, value);
            }
        }

        return fieldInput;
    }

    validation() {
        // À implémenter dans la classe enfant
    }

    _validationFields(validators) {
        let errors = 0;

        validators.forEach((fcts, key) => {
            const field = document.getElementById(key);
            if (field.required) {
                const msgErreur = [];

                fcts.forEach((fct) => {
                    const response = fct(field);

                    if (response !== false) {
                        msgErreur.push(response);
                    }
                });


                if (msgErreur.length >= 1) {
                    this._setDataError(field.parentNode, msgErreur[0]);
                    errors++;
                } else {
                    this._deleteDataError(field.parentNode);
                }
            }
        });

        return (errors);
    }

    isEmpty(field) {
        return field.validity.valueMissing ? "Ce champ est obligatoire" : false;
    }

    isPatternRespected(field) {
        const regexByField = new Map([
            // key : id of the field
            // value: an array with first --> regex, second --> error message
            ['firstName', [/^[A-Za-zÀ-ÖØ-öø-ÿ\-\'\ ]{2,}$/, "Il faut renseigner 2 caractères minimum"]],
            ['lastName', [/^[A-Za-zÀ-ÖØ-öø-ÿ\-\'\ ]{2,}$/, "Il faut renseigner 2 caractères minimum"]],
            ['email', [/\b[\w\.-]+@[\w\.-]+\.\w{2,}\b/i, "Email non valide"]],
        ]);

        const regexField = regexByField.get(field.id);
        if (!regexField) {
            throw new Error(`Regex for field with ID '${field.id}' not found`);
        }

        return regexField[0].test(field.value) ? false : regexField[1];
    }

    _setDataError(div, message) {
        div.setAttribute('data-error', message);
        div.setAttribute('data-error-visible', true);
    }

    _deleteDataError(div) {
        div.setAttribute('data-error-visible', false);
    }

    _getFormData() {
        const formData = {};
        const inputs = document.querySelectorAll(`#${this._idForm} input, #${this._idForm} textarea`);
        formData.idForm = this._idForm;

        inputs.forEach((input) => {
            formData[input.id] = input.value;
        });

        return formData;
    }
}

class ContactForm extends Form {
    constructor(idForm, $wrapperForm) {
        super(idForm);
        this._$wrapperForm = $wrapperForm;

        this._formFields = [
            {
                label: "Prénom",
                name: "firstName",
                type: "text",
                attributs: {
                    required: true,
                    minlength: 2,
                }
            },
            {
                label: "Nom",
                name: "lastName",
                type: "text",
                attributs: {
                  //  required: true,
                    minlength: 2,
                },
            },
            {
                label: "Email",
                name: "email",
                type: "email",
                attributs: {
                  //  required: true,
                },
            },
            {
                label: "Message",
                name: "message",
                type: "textarea",
                attributs: {
                  //  required: true,
                },
            },
        ];
        this._validators = new Map([
            ['firstName', [this.isEmpty, this.isPatternRespected]],
            ['lastName', [this.isEmpty, this.isPatternRespected]],
            ['email', [this.isEmpty, this.isPatternRespected]],
            ['message', [this.isEmpty]],
        ]);
    }

    generate() {
        this._form = this.generateFields(this._formFields);
        this._form.noValidate = true;

        // Création du bouton d'envoi
        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.textContent = "Envoyer";
        submitButton.classList.add('btn')
        submitButton.classList.add('btn--submit')
        this._form.appendChild(submitButton);

        this._form.addEventListener("submit", (event) => {
            event.preventDefault(); // Empêche l'envoi du formulaire par défaut
            this.validation(); // Appelle la méthode de validation de ContactForm
        });

        // Ajout du formulaire au conteneur
        this._$wrapperForm.appendChild(this._form);
    }

    validation() {
        console.log(`validation lancée`);

        if (this._validationFields(this._validators) === 0) {

            const response = this.response();

            console.log(`Formulaire Validé`);
            console.log(response);
            
            toggleForm();
            this._form.reset();
        }
    }

    response() {
        const formData = this._getFormData();
        const response = {
            idForm: formData.idForm,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            message: formData.message
        };

        return response;
    }
}

function toggleForm() {
    document.querySelector("#modal-section").classList.toggle("active");
    document.querySelector("#contact-form").classList.toggle("active");
}


