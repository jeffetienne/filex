
// import { on } from 'pg/lib/query'
import FormComponent from './form-component'
import InputComponent from './input-component'
import React, { Component } from 'react'
class FormPatronComponent extends Component {
    constructor (props) {
        super(props)
        this.state = {
            fields: { last_name: '', email: '', phone: '', pwd: '' },
            errors: {}
        }
        this.handleValidation = this.handleValidation.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleValidation () {
        const fields = this.state.fields
        const errors = {}
        let formIsValid = true
        if (fields.last_name.trim() === '') {
            formIsValid = false
            errors.last_name = 'Champs obligatoire !'
            console.log(errors)
        }
        if (typeof fields.last_name !== 'undefined') {
            if (!fields.last_name.match(/^[a-zA-Z]+$/)) {
                formIsValid = false
                errors.last_name = 'Lettres seulement !'
            }
        }
        if (fields.email.trim() === '') {
            formIsValid = false
            errors.email = 'Champs obligatoire !'
        }
        if (typeof fields.email !== 'undefined') {
            if (!fields.email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
                formIsValid = false
                errors.email = 'Adresse email attendu !'
            }
        }
        if (fields.phone.trim() === '') {
            formIsValid = false
            errors.phone = 'Champs obligatoire !'
        }
        if (typeof fields.phone !== 'undefined') {
            if (!fields.phone.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) {
                formIsValid = false
                errors.phone = 'Téléphone attendu !'
            }
        }
        if (fields.pwd.trim() === '') {
            formIsValid = false
            errors.pwd = 'Champs obligatoire !'
        }
        this.setState({ errors: errors })
        console.log(errors)
        return formIsValid
    }

    handleChange (e) {
        const fields = this.state.fields
        fields[e.target.name] = e.target.value
        this.setState({ fields })
    }

    handleSubmit (e) {
        e.preventDefault()
        if (this.handleValidation()) {
            this.props.onSaveClick()
        } else {
            alert('Fomulaire Invalide !' + '\n' + this.state.errors.last_name + '\n' + this.state.errors.phone + '\n' + this.state.errors.email + '\n' + this.state.errors.pwd)
        }
    }

    render () {
        return (
            <div>
                <h1>Inscription Patron</h1>
                <FormComponent validerText='Sauvegarder' onSaveClick={this.handleSubmit}>
                    <InputComponent
                        text='Nom'
                        type='text'
                        id='nom_id'
                        name='last_name'
                        onChange={this.handleChange}
                        errorText={this.state.errors.last_name}

                    />
                    <InputComponent
                        text='Prénom'
                        type='text'
                        id='prenom_id'
                        name='first_name'
                        onChange={this.handleChange}
                    />
                    <InputComponent
                        text='Téléphone'
                        type='tel'
                        id='tel_id'
                        name='phone'
                        pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                        onChange={this.handleChange}
                        errorText={this.state.errors.phone}
                    />
                    <InputComponent
                        text='Email'
                        type='email'
                        id='email_id'
                        name='email'
                        onChange={this.handleChange}
                        errorText={this.state.errors.email}
                    />
                    <InputComponent
                        text='Password'
                        type='password'
                        id='pwd_id'
                        name='pwd'
                        onChange={this.handleChange}
                        errorText={this.state.errors.pwd}
                    />
                </FormComponent>
            </div>
        )
    }
}

export default FormPatronComponent
