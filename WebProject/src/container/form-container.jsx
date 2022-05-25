import React, { Component } from 'react'
import FormComponent from '../component/form-component'
import FormEmployeComponent from '../component/form-employe-component'
import FormEntrepriseComponent from '../component/form-entreprise-component'
import FormPatronComponent from '../component/form-patron-component'
import FormQueueComponent from '../component/form-queue-component'
import GestionQueueComponent from '../component/gestion-queue-component'
import InputComponent from '../component/input-component'
import LiComponent from '../component/li-component'
import ListEmployesComponent from '../component/list-employes-component'
import ListEntreprisesComponent from '../component/list-entreprises-component'
import ListQueueComponent from '../component/list-queue-component'
import LoginComponent from '../component/login-component'
import RapportComponent from '../component/rapport-component'
import NavbarComponent from '../component/navbar-component'
import TableComponent from '../component/table-component'
import constante from '../constantes/constante'
import ButtonComponent from '../component/button-component'

function buildHeader (method, body) {
    return {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}
const ACTIONS = {
    inscription_patron: 'INSCRIPTION PATRON',
    inscription_employe: 'INSCRIPTION EMPLOYE',
    ajouter_entreprise: 'AJOUTER ENTREPRISE',
    ajouter_queue: 'AJOUTER QUEUE',
    details_entreprise: 'DETAILS ENTREPRISE',
    queues_entreprise: 'QUEUES ENTREPRISE',
    details_queue: 'DETAILS QUEUE',
    lister_entreprises: 'LISTER ENTREPRISES',
    lister_employes: 'LISTER EMPLOYES',
    edit_entreprise: 'EDIT ENTREPRISE',
    edit_employe: 'EDIT EMPLOYE',
    delete_employe: 'DELETE EMPLOYE',
    details_employe: 'DETAILS EMPLOYE',
    delete_entreprise: 'DELETE ENTREPRISE',
    rapport: 'RAPPORT',
    home: 'Accueil',
    logout: 'LOGOUT',
    login: 'LOGIN'
}

const ACTIONS_NAVBAR = {
    home_logout: 'home_logout',
    login: 'login',
    register: 'register',
    home_patron: 'home_patron',
    entreprises: 'entreprises',
    employes: 'employes',
    rapport: 'rapport',
    logout: 'logout'
}

const DOMAINES = [
    {
        value: 1,
        label: 'Alimentaire'
    },
    {
        value: 2,
        label: 'Medical'
    },
    {
        value: 3,
        label: 'Loisir'
    }
]
const SUBSCRIPTIONS = [
    {
        value: 1,
        label: 'Basic'
    },
    {
        value: 2,
        label: 'Premium'
    }
]

const ROLES = [
    {
        value: 1,
        label: 'Enterprise'
    },
    {
        value: 2,
        label: 'Employee'
    },
    {
        value: 3,
        label: 'Client'
    }
]

let tempData = { email: 'ornella@isi.com', pwd: '000' }
let t = {}

class FormContainer extends Component {
    constructor (props) {
        super(props)
        this.state = {
            formValues: {},
            action: ACTIONS.logout,
            patrons: [],
            entreprises: [],
            e: {},
            headers: [],
            entreprise: {},
            role: 0,
            compte: {},
            employes: [],
            queues: [],
            user_queues: [],
            queueId: 0,
            errors: { last_name: '' },
            fields: {}
        }
        t = this
        this.handleInputOnChange = this.handleInputOnChange.bind(this)
        this.handleOnSaveEntreprise = this.handleOnSaveEntreprise.bind(this)
        this.handleOnCancelClickEmployes = this.handleOnCancelClickEmployes.bind(this)
        this.handleOnCancelClickEntreprises = this.handleOnCancelClickEntreprises.bind(this)
        this.handleOnSaveClickEmploye = this.handleOnSaveClickEmploye.bind(this)
        this.handleOnSaveClickPatron = this.handleOnSaveClickPatron.bind(this)
        this.handleOnClickNavBar = this.handleOnClickNavBar.bind(this)
        this.handleOnDetailsClick = this.handleOnDetailsClick.bind(this)
        this.handleOnDeleteClick = this.handleOnDeleteClick.bind(this)
        this.handleOnEditClick = this.handleOnEditClick.bind(this)
        this.handleOnAddClick = this.handleOnAddClick.bind(this)
        this.handleOnQueuesClick = this.handleOnQueuesClick.bind(this)
        this.handleOnSaveQueue = this.handleOnSaveQueue.bind(this)
        this.handleOnCancelClickQueue = this.handleOnCancelClickQueue.bind(this)
        this.handleOnDetailsQueueClick = this.handleOnDetailsQueueClick.bind(this)
        this.handleOnNextClick = this.handleOnNextClick.bind(this)
        this.handleOnEmployeesClick = this.handleOnEmployeesClick.bind(this)
        this.handleOnAssignClick = this.handleOnAssignClick.bind(this)
        this.handleOnSelectRole = this.handleOnSelectRole.bind(this)
        this.handleOnInsertClick = this.handleOnInsertClick.bind(this)
        this.handleOnReportClick = this.handleOnReportClick.bind(this)
        this.listEntreprises = this.listEntreprises.bind(this)
        this.listQueues = this.listQueues.bind(this)
    }

    handleTime (queueId) {
        setInterval(function printTime () {
            fetch(constante.URL + constante.TODAY_USER_QUEUES_ENDPOINT + queueId, { method: 'GET' })
                .then(response => response.json())
                .then(responseObject => {
                    t.setState({ user_queues: responseObject.user_queues })
                })
        }, 20000)
    }

    componentDidMount () {
        this.setState({ formValues: { email: 'ornella@isi.com', pwd: '000' } })
    }

    listEntreprises (userId) {
        fetch(constante.URL + constante.COMPANIES_ENDPOINT + userId, { method: 'GET' })
            .then(response => response.json())
            .then(responseObject => {
                t.setState({
                    entreprises: responseObject.company,
                    action: ACTIONS.lister_entreprises
                })
            })
    }

    listQueues (companyId) {
        fetch(constante.URL + constante.QUEUES_ENDPOINT + companyId, { method: 'GET' })
            .then(response => response.json())
            .then(responseObject => {
                const qs = responseObject.queues.map(q => {
                    let queue = {}
                    queue = { value: q.queue_id, label: q.queue_name }
                    return queue
                })
                this.setState({ queues: qs })
            })
    }

    listUserQueues (queueId) {
        fetch(constante.URL + constante.TODAY_USER_QUEUES_ENDPOINT + queueId, { method: 'GET' })
            .then(response => response.json())
            .then(responseObject => {
                t.setState({ user_queues: responseObject.user_queues, action: ACTIONS.details_queue })
            })
    }

    handleOnSelectRole (event) {
        switch (event.target.id) {
        case '1':
            this.setState({ role: 1, action: ACTIONS.login })
            break
        case '2':
            this.setState({ role: 2, action: ACTIONS.login })
            break
        case '3':
            fetch(constante.URL + constante.COMPANIES_ENDPOINT, { method: 'GET' })
                .then(response => response.json())
                .then(responseObject => {
                    t.setState({
                        role: 3,
                        entreprises: responseObject.company,
                        action: ACTIONS.lister_entreprises
                    })
                })
            break
        default:
            break
        }
    }

    handleOnLogin () {
        fetch(constante.URL + constante.LOGIN_ENDPOINT, buildHeader('POST', tempData))
            .then(response => response.json())
            .then(response => {
                t.setState({
                    compte: response.user
                })
                if (response.user.queue_id) {
                    t.setState({
                        role: 2
                    })
                    t.listUserQueues(response.user.queue_id)
                } else {
                    t.setState({
                        action: ACTIONS.lister_entreprises
                    })
                    t.listEntreprises(response.user.user_id)
                }
            }).catch(err => {
                console.log(err)
            })
    }

    handleOnReportClick (event) {
        this.setState({ action: ACTIONS.rapport })
    }

    handleOnAddClick () {
        switch (this.state.action) {
        case ACTIONS.lister_entreprises:
            this.setState({ action: ACTIONS.ajouter_entreprise, entreprise: {} })
            break
        case ACTIONS.lister_employes:
            this.setState({ action: ACTIONS.inscription_employe })
            break
        case ACTIONS.queues_entreprise:
            this.setState({ action: ACTIONS.ajouter_queue })
            break
        default:
            break
        }
    }

    handleOnDetailsClick (event) {
        fetch(constante.URL + constante.COMPANY_ENDPOINT + event.target.id, { method: 'GET' })
            .then(response => response.json())
            .then(responseObject => {
                this.setState({ e: responseObject.company[0], action: ACTIONS.details_entreprise })
            })
    }

    handleOnEmployeesClick (event) {
        fetch(constante.URL + constante.EMPLOYEES_ENDPOINT + event.target.id, { method: 'GET' })
            .then(response => response.json())
            .then(responseObject => {
                this.setState({ employes: responseObject.user, action: ACTIONS.lister_employes })
            })
    }

    handleOnQueuesClick (event) {
        fetch(constante.URL + constante.QUEUES_ENDPOINT + event.target.id, { method: 'GET' })
            .then(response => response.json())
            .then(responseObject => {
                this.setState({ queues: responseObject.queues, action: ACTIONS.queues_entreprise })
            })
    }

    handleOnDetailsQueueClick (event) {
        this.listUserQueues(event.target.id)
        tempData.queue_id = event.target.id
    }

    handleOnAssignClick (event) {
        this.setState({ queueId: event.target.id, action: ACTIONS.inscription_employe })
    }

    handleOnSaveQueue () {
        tempData.avg_waiting_time = null
        tempData.avg_processing_time = null
        tempData.latitude = null
        tempData.longitude = null
        fetch(constante.URL + constante.QUEUE_ENDPOINT, buildHeader('POST', tempData))
            .then(response => response.json())
            .then(responseObject => {
                this.setState({
                    queues: responseObject,
                    action: ACTIONS.queues_entreprise,
                    showForm: false
                })
            })
    }

    handleOnCancelClickQueue () {

    }

    handleOnNextClick () {
        fetch(constante.URL + constante.USER_QUEUE_ENDPOINT, buildHeader('PUT', { queue_id: 1 }))
            .then(response => response.json())
            .then(responseObject => {
                t.listUserQueues(responseObject.user_queue.queue_id)
            })
    }

    handleOnEditClick (event) {
        fetch(constante.URL + constante.COMPANY_ENDPOINT + event.target.id, { method: 'GET' })
            .then(response => response.json())
            .then(responseObject => {
                tempData = responseObject.company[0]
                this.setState({ e: responseObject.company[0], action: ACTIONS.edit_entreprise })
            })
    }

    handleOnDeleteClick (event) {
        if (confirm('Are you sure you want to delete this?')) {
            fetch(constante.URL + constante.COMPANY_ENDPOINT + event.target.id, { method: 'DELETE' })
                .then(response => response.json())
                .then(responseObject => {
                    t.listEntreprises(this.state.compte.user_id)
                })
        }
    }

    handleOnDetailsEmployeClick (event) {
        fetch(constante.URL + constante.USER_ENDPOINT + event.target.id, { method: 'GET' })
            .then(response => response.json())
            .then(responseObject => {
                t.listQueues('1')
                t.setState({ e: responseObject.user, action: ACTIONS.details_employe })
            })
    }

    handleOnEditEmployeClick (event) {
        fetch(constante.URL + constante.USER_ENDPOINT + event.target.id, { method: 'GET' })
            .then(response => response.json())
            .then(responseObject => {
                t.listQueues('1')
                t.setState({ e: responseObject.user, action: ACTIONS.edit_employe })
            })
    }

    handleOnDeleteEmployeClick (event) {
        fetch(constante.URL + constante.USER_ENDPOINT + event.target.id, { method: 'DELETE' })
            .then(response => response.json())
            .then(responseObject => {
                t.setState({ e: responseObject, action: ACTIONS.lister_employes })
            })
    }

    handleOnSaveEntreprise = () => {
        tempData.admin_id = this.state.compte.user_id
        if (this.state.action === ACTIONS.ajouter_entreprise) {
            fetch(constante.URL + constante.COMPANY_ENDPOINT, buildHeader('POST', tempData))
                .then(response => response.json())
                .then(responseObject => {
                    t.listEntreprises(this.state.compte.user_id)
                })
        } else if (this.state.action === ACTIONS.edit_entreprise) {
            fetch(constante.URL + constante.COMPANY_ENDPOINT, buildHeader('PUT', tempData))
                .then(response => response.json())
                .then(responseObject => {
                    t.listEntreprises(this.state.compte.user_id)
                })
        }
    }

    handleOnCancelClickEntreprises = () => {
        this.setState({
            action: ACTIONS.lister_entreprises,
            showForm: false
        })
    }

    handleOnCancelClickEmployes = () => {
        this.setState({
            action: ACTIONS.lister_employes,
            showForm: false
        })
    }

    handleInputOnChange (e) {
        tempData[e.target.name] = e.target.value
    }

    handleOnSaveClickPatron = () => {
        tempData.role_id = 1
        tempData.birthdate = null
        tempData.queue_id = null
        console.log(tempData)
        fetch(constante.URL + constante.USER_ENDPOINT, buildHeader('POST', tempData))
            .then(response => response.json())
            .then(responseObject => {
                this.setState({
                    compte: responseObject.user,
                    action: ACTIONS.lister_entreprises,
                    showForm: false
                })
                t.listEntreprises(responseObject.user.user_id)
            })
    }

    handleOnSaveClickEmploye = () => {
        tempData.role_id = 2
        tempData.birthdate = null
        tempData.subscription_id = null
        console.log(tempData)
        fetch(constante.URL + constante.USER_ENDPOINT, buildHeader('POST', tempData))
            .then(response => response.json())
            .then(responseObject => {
                this.setState({ action: ACTIONS.lister_entreprises })
            })
    }

    handleOnClickNavBar (event) {
        switch (event.target.id) {
        case ACTIONS_NAVBAR.home_logout:
            this.setState({ action: ACTIONS.logout })
            break
        case ACTIONS_NAVBAR.login:
            this.setState({ action: ACTIONS.login })
            break
        case ACTIONS_NAVBAR.register:
            this.setState({ action: ACTIONS.inscription_patron })
            break
        case ACTIONS_NAVBAR.home_patron:
            this.setState({ action: ACTIONS.lister_entreprises })
            break
        case ACTIONS_NAVBAR.rapport:
            this.setState({ action: ACTIONS.rapport })
            break
        case ACTIONS_NAVBAR.entreprises:
            this.setState({ action: ACTIONS.lister_entreprises })
            if (this.state.role === 3) {
                fetch(constante.URL + constante.COMPANIES_ENDPOINT, { method: 'GET' })
                    .then(response => response.json())
                    .then(responseObject => {
                        t.setState({ entreprises: responseObject.company })
                    })
            } else {
                fetch(constante.URL + constante.COMPANIES_ENDPOINT + this.state.compte.user_id, { method: 'GET' })
                    .then(response => response.json())
                    .then(responseObject => {
                        t.setState({ entreprises: responseObject.company })
                    })
            }
            break
        case ACTIONS_NAVBAR.logout:
            this.setState({ action: ACTIONS.logout, compte: {} })
            break
        default:
            break
        }
    }

    renderHome () {
        return (
            <div align='center'>
                <h1>Welcome</h1>
                <h2>Who are you?</h2>
                <div id='btns'>
                    <button type='button' id={ROLES[0].value} className='btn btn-outline-primary' onClick={this.handleOnSelectRole}>Entreprise</button>
                    <button type='button' id={ROLES[1].value} className='btn btn-outline-primary' onClick={this.handleOnSelectRole}>Employe</button>
                    <button type='button' id={ROLES[2].value} className='btn btn-outline-primary' onClick={this.handleOnSelectRole}>Client</button>
                </div>
            </div>
        )
    }

    renderPaiementPatron () {
        return (
            <div>
                <h1>Paiement </h1>
                <FormComponent action='/paiements' onSaveClick={this.handleOnSaveClick} onCancelClick={this.handleOnCancelClickEntreprises}>
                    <InputComponent label='Numéro carte bancaire' type='number' name='numeroCarte' value={this.state.formValues.numeroCarte} />

                    <InputComponent label='Nom sur la carte' type='text' name='nom' value={this.state.formValues.nomPatron} />

                    <InputComponent label='Date d"expiration' type='date' name='exp' value={this.state.formValues.expiration} />

                    <InputComponent label='Code secret' type='number' name='code' value={this.state.formValues.code} />
                </FormComponent>
                <TableComponent
                    titre='Liste paiements effectués'
                    headers={this.state.headers}
                    lignes={this.state.paiements}
                />
            </div>
        )
    }

    renderInscriptionPatron () {
        return (
            <div>
                <FormPatronComponent
                    subscriptions={SUBSCRIPTIONS}
                    patron={this.state.formValues}
                    errors={this.state.errors}
                    onChange={this.handleInputOnChange}
                    onSaveClick={this.handleOnSaveClickPatron}
                    onCancelClick={this.handleOnCancelClickEntreprises}
                />
            </div>
        )
    }

    renderFormLogin () {
        return (
            <LoginComponent
                onChange={this.handleInputOnChange}
                onCancelClick={this.handleOnCancelClickEntreprises}
                onSaveClick={this.handleOnLogin}
                login={tempData}
            />
        )
    }

    renderRapport () {
        return (
            <RapportComponent
                text='Rapport patron'
                id='rapport'
            />
        )
    }

    renderFormEntreprise (disabled, entreprise, action) {
        return (
            <div>
                <FormEntrepriseComponent
                    domaines={DOMAINES}
                    entreprise={entreprise}
                    disabled={disabled}
                    action={action}
                    onChange={this.handleInputOnChange}
                    onSaveClick={this.handleOnSaveEntreprise}
                    onCancelClick={this.handleOnCancelClickEntreprises}
                />
            </div>
        )
    }

    renderFormQueue (disabled) {
        return (
            <div>
                <FormQueueComponent
                    disabled={disabled}
                    onChange={this.handleInputOnChange}
                    onSaveClick={this.handleOnSaveQueue}
                    onCancelClick={this.handleOnCancelClickQueue}
                />
            </div>
        )
    }

    renderListEntreprise (titre, role) {
        return (
            <div>
                <ListEntreprisesComponent
                    titre={titre}
                    role={role}
                    entreprises={this.state.entreprises}
                    onDetailsClick={this.handleOnDetailsClick}
                    onEmployeesClick={this.handleOnEmployeesClick}
                    onQueuesClick={this.handleOnQueuesClick}
                    onEditClick={this.handleOnEditClick}
                    onDeleteClick={this.handleOnDeleteClick}
                    onAddClick={this.handleOnAddClick}
                    onReportClick={this.handleOnReportClick}
                />
            </div>
        )
    }

    renderListQueue (titre, role) {
        return (
            <div>
                <ListQueueComponent
                    titre={titre}
                    role={role}
                    queues={this.state.queues}
                    onDetailsClick={this.handleOnDetailsQueueClick}
                    onAssignClick={this.handleOnAssignClick}
                    onEditClick={this.handleOnEditClick}
                    onAddClick={this.handleOnAddClick}
                />
            </div>
        )
    }

    handleOnInsertClick () {
        console.log(tempData.queue_id)
        if (tempData.email !== '') {
            fetch(constante.URL + constante.USER_CLIENT_ENDPOINT, buildHeader('POST', tempData))
                .then(response => response.json())
                .then(responseObject => {
                    console.log('object' + responseObject.user_queue.queue_id)
                    t.listUserQueues(responseObject.user_queue.queue_id)
                })
        }
    }

    renderFormInsertQueue (role) {
        return (
            <div>
                <InputComponent
                    text='Email'
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Enter your email adress'
                    onChange={this.handleInputOnChange}
                />
                <br />
                <ButtonComponent
                    text='Insert'
                    classe='btn btn-primary'
                    onClick={this.handleOnInsertClick}
                />
            </div>
        )
    }

    renderDetailsQueue (titre) {
        if (this.state.user_queues) {
            this.handleTime(this.state.user_queues[0].queue_id)
        }

        return (
            <div>
                <h2>{titre}</h2>
                <br />
                {this.state.role === 3 &&
                <div>
                    <InputComponent
                        text='Email'
                        type='email'
                        id='email'
                        name='email'
                        placeholder='Enter your email adress'
                        onChange={this.handleInputOnChange}
                    />
                    <ButtonComponent
                        text='Insert'
                        classe='btn btn-primary'
                        onClick={this.handleOnInsertClick}
                    />
                </div>}
                <br />
                <GestionQueueComponent
                    role={this.state.role}
                    clients={this.state.user_queues}
                    onDetailsClick={this.handleOnDetailsClick}
                    onDeleteClick={this.handleOnDeleteClick}
                    onNextClick={this.handleOnNextClick}
                />
            </div>
        )
    }

    renderListEmploye (titre) {
        return (
            <div>
                <ListEmployesComponent
                    titre={titre}
                    employes={this.state.employes}
                    onDetailsClick={this.handleOnDetailsEmployeClick}
                    onEditClick={this.handleOnEditEmployeClick}
                    onDeleteClick={this.handleOnDeleteEmployeClick}
                    onAddClick={this.handleOnAddClick}
                />
            </div>
        )
    }

    renderInscriptionEmploye (disabled, employe, queueId, action) {
        return (
            <div>
                <FormEmployeComponent
                    employe={employe}
                    disabled={disabled}
                    queueId={queueId}
                    action={action}
                    onChange={this.handleInputOnChange}
                    onSaveClick={this.handleOnSaveClickEmploye}
                    onCancelClick={this.handleOnCancelClickEmployes}
                />
            </div>
        )
    }

    renderNavBarComponent () {
        let navValue = <div />
        if (this.state.compte.role_id) {
            switch (this.state.compte.role_id) {
            case 1:
                navValue = (
                    <div>
                        <NavbarComponent>
                            <LiComponent
                                liClass='nav-item active'
                                ankerclass='nav-link'
                                text='Home'
                                id='home_patron'
                                cursor='pointer'
                                onClickHandler={this.handleOnClickNavBar}
                            />
                            <LiComponent
                                liClass='nav-item'
                                ankerclass='nav-link'
                                cursor='pointer'
                                text='Entreprises'
                                id='entreprises'
                                onClickHandler={this.handleOnClickNavBar}
                            />
                            <LiComponent
                                liClass='nav-item'
                                ankerclass='nav-link'
                                text='Log out'
                                id='logout'
                                onClickHandler={this.handleOnClickNavBar}
                            />
                        </NavbarComponent>
                    </div>
                )
                break
            case 2:
                navValue = (
                    <div>
                        <NavbarComponent>
                            <LiComponent
                                liClass='nav-item active'
                                ankerclass='nav-link'
                                text='Home'
                                id='home_employee'
                                cursor='pointer'
                                onClickHandler={this.handleOnClickNavBar}
                            />
                            <LiComponent
                                liClass='nav-item'
                                ankerclass='nav-link'
                                text='Log out'
                                id='logout'
                                onClickHandler={this.handleOnClickNavBar}
                            />
                        </NavbarComponent>
                    </div>
                )
                break
            case 3:
                navValue = (
                    <div>
                        <NavbarComponent>
                            <LiComponent
                                liClass='nav-item active'
                                ankerclass='nav-link'
                                text='Home'
                                id='home_patron'
                                cursor='pointer'
                                onClickHandler={this.handleOnClickNavBar}
                            />
                        </NavbarComponent>
                    </div>
                )
                break
            default:
                navValue = (
                    <div>
                        <NavbarComponent>
                            <LiComponent
                                liClass='nav-item active'
                                ankerclass='nav-link'
                                text='Home'
                                id='home_patron'
                                cursor='pointer'
                                onClickHandler={this.handleOnClickNavBar}
                            />
                        </NavbarComponent>
                    </div>
                )
                break
            }
        } else {
            if (this.state.role > 0) {
                switch (this.state.role) {
                case 1:
                    navValue = (
                        <div>
                            <NavbarComponent>
                                <LiComponent
                                    liClass='nav-item active'
                                    ankerclass='nav-link'
                                    text='Home'
                                    id='home'
                                    cursor='pointer'
                                    onClickHandler={this.handleOnClickNavBar}
                                />
                                <LiComponent
                                    liClass='nav-item'
                                    ankerclass='nav-link'
                                    cursor='pointer'
                                    text='Login'
                                    id='login'
                                    onClickHandler={this.handleOnClickNavBar}
                                />
                                <LiComponent
                                    liClass='nav-item'
                                    ankerclass='nav-link'
                                    text='Register'
                                    id='register'
                                    onClickHandler={this.handleOnClickNavBar}
                                />
                            </NavbarComponent>
                        </div>
                    )
                    break
                case 2:
                    navValue = (
                        <div>
                            <NavbarComponent>
                                <LiComponent
                                    liClass='nav-item active'
                                    ankerclass='nav-link'
                                    text='Home'
                                    id='home'
                                    cursor='pointer'
                                    onClickHandler={this.handleOnClickNavBar}
                                />
                                <LiComponent
                                    liClass='nav-item'
                                    ankerclass='nav-link'
                                    cursor='pointer'
                                    text='Login'
                                    id='login'
                                    onClickHandler={this.handleOnClickNavBar}
                                />
                            </NavbarComponent>
                        </div>
                    )
                    break
                case 3:
                    navValue = (
                        <div>
                            <NavbarComponent>
                                <LiComponent
                                    liClass='nav-item active'
                                    ankerclass='nav-link'
                                    text='Home'
                                    id='home'
                                    cursor='pointer'
                                    onClickHandler={this.handleOnClickNavBar}
                                />
                                <LiComponent
                                    liClass='nav-item'
                                    ankerclass='nav-link'
                                    text='Entreprises'
                                    id='entreprises'
                                    onClickHandler={this.handleOnClickNavBar}
                                />
                            </NavbarComponent>
                        </div>
                    )
                    break
                default:
                    navValue = (
                        <div>
                            <NavbarComponent>
                                <LiComponent
                                    liClass='nav-item active'
                                    ankerclass='nav-link'
                                    text='Home'
                                    id='home_patron'
                                    cursor='pointer'
                                    onClickHandler={this.handleOnClickNavBar}
                                />
                            </NavbarComponent>
                        </div>
                    )
                    break
                }
            } else {
                navValue = (
                    <div>
                        <NavbarComponent>
                            <LiComponent
                                liClass='nav-item active'
                                ankerclass='nav-link'
                                text='Home'
                                id='home_logout'
                            />
                        </NavbarComponent>
                    </div>
                )
            }
        }
        return navValue
    }

    render () {
        let vue = <div />
        switch (this.state.action) {
        case ACTIONS.inscription_patron:
            vue = this.renderInscriptionPatron()
            break
        case ACTIONS.lister_entreprises:
            if (this.state.compte.role_id === 1) {
                vue = this.renderListEntreprise('Liste Enterprises', this.state.compte.role_id)
            } else {
                vue = this.renderListEntreprise('Liste Enterprises', 3)
            }
            break
        case ACTIONS.ajouter_entreprise:
            if (this.state.compte.role_id === 1) {
                vue = this.renderFormEntreprise(false, this.state.e, 'ADD')
            }
            break
        case ACTIONS.ajouter_queue:
            if (this.state.compte.role_id === 1) {
                vue = this.renderFormQueue(false)
            }
            break
        case ACTIONS.details_entreprise:
            if (this.state.compte.role_id === 1) {
                vue = this.renderFormEntreprise(true, this.state.e, '')
            }
            break
        case ACTIONS.queues_entreprise:
            vue = this.renderListQueue('List Queues', this.state.compte.role_id)
            break
        case ACTIONS.paiements:
            if (this.state.compte.role_id === 1) {
                vue = this.renderPaiementPatron()
            }
            break
        case ACTIONS.edit_entreprise:
            if (this.state.compte.role_id === 1) {
                vue = this.renderFormEntreprise(true, this.state.e, 'EDIT')
            }
            break
        case ACTIONS.edit_employe:
            if (this.state.compte.role_id === 1) {
                vue = this.renderInscriptionEmploye(false, this.state.e, this.state.e.queue_id, 'EDIT')
            }
            break
        case ACTIONS.details_employe:
            if (this.state.compte.role_id === 1) {
                vue = this.renderInscriptionEmploye(false, this.state.e, this.state.queueId, '')
            }
            break
        case ACTIONS.lister_employes:
            if (this.state.compte.role_id === 1) {
                vue = this.renderListEmploye('Liste Employes')
            }
            break
        case ACTIONS.inscription_employe:
            if (this.state.compte.role_id === 1) {
                tempData = { queue_id: this.state.queueId }
                vue = this.renderInscriptionEmploye(false, this.state.e, this.state.queueId, 'ADD')
            }
            break
        case ACTIONS.details_queue:
            vue = this.renderDetailsQueue('List customers in queue')
            break
        case ACTIONS.rapport:
            if (this.state.compte.role_id === 1) {
                vue = this.renderRapport()
            }
            break
        case ACTIONS.login:
            vue = this.renderFormLogin()
            break
        default:
            vue = this.renderHome()
            break
        }

        return (
            <div>
                {this.renderNavBarComponent()}
                <div className='container'>
                    {vue}
                </div>
            </div>
        )
    }
}

export default FormContainer
