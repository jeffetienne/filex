
import React from 'react'
import { Component } from 'react/cjs/react.production.min'
import FormComponent from './form-component'
import InputComponent from './input-component'

const ACTIONS = {
    edit: 'EDIT',
    add: 'ADD'
}
class FormEntrepriseComponent extends Component {
    constructor (props) {
        super(props)
        this.state = {
            fields: { company_name: '', email: '', phone: '', field: '' },
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
        if (fields.company_name.trim() === '') {
            formIsValid = false
            errors.company_name = 'Champs obligatoire !'
        }
        if (typeof fields.company_name !== 'undefined') {
            if (!fields.company_name.match(/^[a-zA-Z]+$/)) {
                formIsValid = false
                errors.company_name = 'Lettres seulement !'
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
        if (fields.field.trim() === '') {
            formIsValid = false
            errors.field = 'Champs obligatoire !'
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
        let valeur = {}
        if (!this.props.disabled) {
            if (this.props.action === ACTIONS.add) {
                valeur = { queue_id: this.props.queueId }
            }
            if (this.props.action === ACTIONS.edit) {
                valeur = this.props.employe
            }
        } else {
            valeur = this.props.employe
        }
        return (
            <div id='test'>
                <h1>Add Enterprise</h1>
                <FormComponent validerText='Sauvegarder' onSaveClick={this.handleSubmit} onCancelClick={this.props.onCancelClick} id='test1'>
                    <InputComponent
                        text='Nom'
                        type='text'
                        name='company_name'
                        value={valeur.company_name}
                        onChange={this.handleChange}
                        disabled={this.props.disabled}
                        errorText={this.state.errors.company_name}
                    />

                    <InputComponent
                        text='Field'
                        type='text'
                        name='field'
                        value={valeur.field}
                        onChange={this.handleChange}
                        disabled={this.props.disabled}
                        errorText={this.state.errors.field}
                    />

                    <InputComponent
                        text='Email'
                        type='email'
                        name='email'
                        value={valeur.email}
                        onChange={this.handleChange}
                        disabled={this.props.disabled}
                        errorText={this.state.errors.email}
                    />

                    <InputComponent
                        text='Telephone'
                        type='text'
                        name='phone'
                        value={valeur.phone}
                        onChange={this.handleChange}
                        disabled={this.props.disabled}
                        errorText={this.state.errors.phone}
                    />
                </FormComponent>
            </div>
        )
    }
}

export default FormEntrepriseComponent
