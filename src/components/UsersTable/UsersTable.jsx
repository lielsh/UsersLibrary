import { Component } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import TableIcons from '../TableIcons/TableIcons';
import EmailValidator from 'email-validator';
import { loading, updateUsers } from '../../actions/actions';

class UsersTable extends Component {
    
    constructor(props) {

        super(props);

        this.clearErrors = this.clearErrors.bind(this);
        this.checkValues = this.checkValues.bind(this);

        this.columns = [
            {
                title: 'Id',
                field: 'id',
                type: 'numeric',
                initialEditValue: this.props.len,
                editComponent: props => (
                    <TextField
                        type = "number"
                        defaultValue = {props.value}
                        disabled = {true}
                    />
                )
            },
            {
                title: 'Name',
                field: 'name',
                initialEditValue: '',
                editComponent: props => (
                    <TextField
                        defaultValue = {props.value || ''}
                        onChange = {e => props.onChange(e.target.value)}
                        error = {this.state.nameError.error}
                        helperText = {this.state.nameError.helperText}
                    />
                )
            },
            {
                title: 'Email',
                field: 'email',
                initialEditValue: '',
                editComponent: props => (
                    <TextField
                        defaultValue = {props.value || ''}
                        onChange = {e => props.onChange(e.target.value)}
                        error = {this.state.emailError.error }
                        helperText = {this.state.emailError.helperText}
                    />
                )
            },
            {
                title: 'Location',
                field: 'location',
                initialEditValue: '',
                editComponent: props => (
                    <TextField
                        defaultValue = {props.value || ''}
                        onChange = {e => props.onChange(e.target.value)}
                        error = {this.state.locationError.error}
                        helperText = {this.state.locationError.helperText}
                    />
                )
            },
            {
                title: 'Picture',
                field: 'picture',
                initialEditValue: '',
                editable: 'onAdd',
                render: item => <img src={item.picture} alt={item.picture} border="3" height="100" width="100" />,
                editComponent: props => (
                    <TextField
                        defaultValue = {props.value || ''}
                        onChange = {e => props.onChange(e.target.value)}
                        error = {this.state.pictureError.error}
                        helperText = {this.state.pictureError.helperText}
                    />
                )
            }
        ];
    };

    clearErrors() {

        this.setState({ nameError: { error: false, helperText: '' } });
        this.setState({ emailError: { error: false, helperText: '' } });
        this.setState({ locationError: { error: false, helperText: '' } });
        this.setState({ pictureError: { error: false, helperText: '' } });
    }

    checkValues(newData) {
        
        let flag = true;

        // Name validation
        if (!newData.name) {
            this.setState({ nameError: { error: true, helperText: 'Required' } });
            flag = false;
        } else if (newData.name.length > 0 && newData.name.length < 3) {
            this.setState({ nameError: { error: true, helperText: 'Minimum of 3 characters' } });
            flag = false;
        } else {
            this.setState({ nameError: { error: false, helperText: '' } });
        }
        
        // Email validation
        if (!newData.email) {
            this.setState({ emailError: { error: true, helperText: 'Required' } });
            flag = false;
        } else if (!EmailValidator.validate(newData.email)) {
            this.setState({ emailError: { error: true, helperText: 'Email address is badly formatted' } });
            flag = false;
        }  else if (this.state.emails.indexOf (newData.email) !== -1) {
            this.setState({ emailError: { error: true, helperText: 'This email address is already in use' } });
            flag = false;
        } else {
            this.setState({ emailError: { error: false, helperText: '' } });
        } 

        // Location validation
        if (!newData.location) {
            this.setState({ locationError: { error: true, helperText: 'Required' } });
            flag = false;
        } else {
            this.setState({ locationError: { error: false, helperText: '' } });
        }

        // Picture validation
        if (!newData.picture) {
            this.setState({ pictureError: { error: true, helperText: 'Required' } });
            flag = false;
        } else {
            this.setState({ pictureError: { error: false, helperText: '' } });
        }

        return flag;
    }

    componentDidMount() {

        this.clearErrors();

        const emails = [];
        [...this.props.users].forEach(user => emails.push(user.email));
        this.setState({ emails });
    }

    render() {
        return (
            <MaterialTable
                icons = {TableIcons}
                title = "Users Library"
                columns = {this.columns}
                data = {this.props.users}
                editable = {{
                    onRowAdd: newData =>
                        new Promise(async (resolve, reject) => {
                            const flag = this.checkValues(newData);
                            if (flag) {
                                this.props.users.push(newData);
                                await this.props.loading();
                                await this.props.updateUsers(this.props.users);
                                resolve();
                            } else {
                                reject();
                            }
                        }
                    ),
                    onRowUpdate: (newData, oldData) =>
                    new Promise(async (resolve, reject) => {
                        const flag = this.checkValues(newData);
                        if (flag) {
                            this.props.users[[oldData.id]] = newData;
                            await this.props.loading();
                            await this.props.updateUsers(this.props.users);
                            resolve();
                        } else {
                            reject();
                        }
                    }
                    ),
                    onRowDelete: oldData =>
                        new Promise(async (resolve, reject) => {
                            this.props.users[[oldData.id]] = { id: oldData.id, name: null, email: null, location: null, picture: null };
                            await this.props.loading();
                            await this.props.updateUsers(this.props.users);
                            resolve();
                        }
                    ),
                    onRowAddCancelled: () =>
                        this.clearErrors()
                    ,
                    onRowUpdateCancelled: () =>
                        this.clearErrors()
                }}
                options = {{
                    actionsColumnIndex: -1,
                    headerStyle: {
                        fontSize: '1rem'
                    },
                    rowStyle: {
                        fontSize: '1rem'
                    }
                }}
            />
        )
    };
}

export default connect(null, { loading, updateUsers })(UsersTable)
