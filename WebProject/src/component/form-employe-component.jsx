
import React from 'react'
import { Component } from 'react/cjs/react.production.min'
import FormComponent from './form-component'
import InputComponent from './input-component'
const ACTIONS = {
    edit: 'EDIT',
    add: 'ADD',
    delete: 'DELETE'
}
class FormEmployeComponent extends Component {
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
            <div>
                <h1>Add Employee</h1>
                <FormComponent validerText='Sauvegarder' onSaveClick={this.handleSubmit} onCancelClick={this.props.onCancelClick}>
                    <InputComponent
                        text='Nom'
                        type='text'
                        id='nom_id'
                        name='last_name'
                        value={valeur.last_name}
                        onChange={this.handleChange}
                        errorText={this.state.errors.last_name}
                        disabled={this.props.disabled}
                    />
                    <InputComponent
                        text='Prénom'
                        type='text'
                        id='prenom_id'
                        name='first_name'
                        value={valeur.first_name}
                        onChange={this.handleChange}
                        disabled={this.props.disabled}
                    />
                    <InputComponent
                        text='Téléphone'
                        type='tel'
                        id='tel_id'
                        name='phone'
                        value={valeur.phone}
                        onChange={this.handleChange}
                        errorText={this.state.errors.phone}
                        disabled={this.props.disabled}
                    />
                    <InputComponent
                        text='Email'
                        type='email'
                        id='email_id'
                        name='email'
                        value={valeur.email}
                        onChange={this.handleChange}
                        errorText={this.state.errors.email}
                        disabled={this.props.disabled}
                    />
                    <InputComponent
                        text='Password'
                        type='password'
                        id='pwd'
                        name='pwd'
                        value={valeur.pwd}
                        onChange={this.handleChange}
                        errorText={this.state.errors.pwd}
                        disabled={this.props.disabled}
                    />
                    <InputComponent
                        text='Queue'
                        type='text'
                        id='queue_id'
                        name='queue_id'
                        value={valeur.queue_id}
                        onChange={this.handleChange}
                        disabled
                    />
                </FormComponent>
            </div>
        )
    }
}
export default FormEmployeComponent
