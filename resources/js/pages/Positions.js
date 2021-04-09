import React, { Component } from 'react';
import { get, store, find, update, destroy, rules, storeMass } from '../containers/Positions';
import { validate, formValid, setRules } from '../containers/Validator';
import Loader from '../components/Loader';
import VerifyPermissions from '../components/VerifyPermission';
import DataTable from '../components/DataTable';

class Positions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            positions: null,
            edit: false,
            id: null,
            message: null,
            rules,
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    async getPositions() {
        this.setState({ positions: null  });
        let data = await get();
        this.setState({ positions: data });
    }

    handleUpdate() {
        this.setState({ positions: null });
        storeMass().then(data => {
            if(data.success){
                this.getPositions();
            }
        })
    }

    handleInput(e) {
        let { name, value } = e.target;
        let newRules = validate(name, value, rules)
        this.setState({ rules: newRules });
    }

    async handleEdit(e) {
        let id = $(e.target).data('id');
        this.setState({ edit: true, id });
        setRules(rules,false);
        let data = await find(id);
        $('.modal').find('.modal-title').text('Editar cargo');
        $('.modal').find('#name').val(data.name);
        $('.modal').find('#type').val(data.type);
        $('.modal').modal('toggle');
    }

    handleModal() {
        $('#form').trigger('reset');
        setRules(rules);
        this.setState({ message: 'Te recomendamos actualizar antes de agregar' , edit: false});
        $('.modal').find('.modal-title').text('Agregar cargo');
        $('.modal').modal('toggle');
    }

    handleDelete(e) {
        let id = $(e.target).data('id');
        swal.fire({
            title: '¿Estas seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `Si, eliminar`,
            cancelButtonText: `Cancelar`,
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                    destroy(id).then(data => {
                        if(data.success == false){
                            toastr.error('', data.message, {
                                closeButton: true
                            });
                        }if (data.success == true) {
                            this.getPositions();
                            toastr.success('', data.message, {
                                closeButton: true
                            });
                        }
                    })
            }
        })
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (formValid(rules)) {
            if (this.state.edit) {
                let data = await update(e.target, this.state.id);
                if (data.success) {
                    $('.modal').modal('toggle');
                    setTimeout(async () => {
                        await this.getPositions();
                    }, 100);
                    toastr.success('', data.message, {
                        closeButton: true
                    });
                }else{
                    this.setState({message: data.errors.name})
                }
            } else {
                store(e.target).then(data => {
                    if (data.success) {
                        $('.modal').modal('toggle');
                        setTimeout(async () => {
                            await this.getPositions();
                        }, 100);
                        toastr.success('', data.message, {
                            closeButton: true
                        });
                    }else{
                        this.setState({message: data.errors.name})
                    }
                });
            }
        }else{
            this.setState({message:'Por favor completa el formulario'});
        }

    }

    componentDidMount() {
        this.getPositions();
    }

    render() {
        const { rules } = this.state;
        if (!this.state.positions) {
            return (
                <Loader />
            )
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Cargos</h3>
                        <VerifyPermissions permission="create_position">
                            <a href="#" onClick={this.handleModal}><i className="fa fa-plus" aria-hidden="true"></i> Agregar <span className="d-none d-md-inline ">nuevo cargo</span></a>
                        </VerifyPermissions>
                        <VerifyPermissions permission="update_position">
                            <a href="#" onClick={this.handleUpdate} className=""><i className="fa fa-download ml-1" aria-hidden="true"></i> Actualizar </a>
                        </VerifyPermissions>

                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <DataTable>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th className="hide">Tipo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.positions.map((position) => (
                                <tr key={position.id}>
                                    <td >{position.name}</td>
                                    <td className="hide">{position.type}</td>
                                    <td>
                                        <div className="btn-group" role="position" aria-label="Basic example">
                                            <VerifyPermissions permission="edit_position">
                                                <button data-id={position.id} onClick={this.handleEdit} className="btn btn-sm btn-outline-primary"><i  data-id={position.id} className="far fa-edit d-sm-block d-md-none"></i><span data-id={position.id} className="d-none d-md-inline">Editar</span></button>
                                            </VerifyPermissions>

                                            <VerifyPermissions permission="delete_position">
                                                <button data-id={position.id} onClick={this.handleDelete} className="btn btn-sm btn-outline-danger"><i data-id={position.id} className="far fa-trash-alt d-sm-block d-md-none"></i><span data-id={position.id} className="d-none d-md-inline">Eliminar</span></button>
                                            </VerifyPermissions>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </DataTable>
                    </div>
                </div>

                <div className="modal fade" data-backdrop="static" tabIndex="-1" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="form" onSubmit={this.handleSubmit}>
                                        {this.state.message ? (

                                        <div className="alert alert-info" role="alert">
                                            <span><i className="fa fa-info-circle" aria-hidden="true"></i>{this.state.message}</span>
                                        </div>
                                        ):(
                                            <div></div>
                                        )}
                                    <div className="form-group">
                                        <label htmlFor="">Nombre<span className="text-danger"> *</span></label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className={rules.name.isInvalid && rules.name.message != '' ? 'form-control is-invalid' : 'form-control'}
                                            onInput={this.handleInput}
                                        />
                                        <div className="invalid-feedback">
                                            {rules.name.isInvalid && rules.name.message != '' ? rules.name.message : ''}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Tipo<span className="text-danger"> *</span></label>
                                        <input
                                            type="text"
                                            name="type"
                                            id="type"
                                            className={rules.type.isInvalid && rules.type.message != '' ? 'form-control is-invalid' : 'form-control'}
                                            onInput={this.handleInput}
                                        />
                                        <div className="invalid-feedback">
                                            {rules.type.isInvalid && rules.type.message != '' ? rules.type.message : ''}
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="submit" form="form" className="btn btn-primary">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Positions;
