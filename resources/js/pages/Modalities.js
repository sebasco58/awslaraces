import React, { Component } from 'react';
import { get, rules, store, find, update, destroy, storeMass } from '../containers/Modalities';
import Loader from '../components/Loader';
import { formValid, validate, setRules } from '../containers/Validator';
import VerifyPermissions from '../components/VerifyPermission';
import DataTable from '../components/DataTable';

class Modalities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalities: null,
            rules: rules,
            id: null,
            edit: false,
            message: null,
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    async getModalities() {
        this.setState({ modalities: null });
        let data = await get();
        this.setState({ modalities: data });
    }

    handleUpdate() {
        this.setState({modalities: null});
        storeMass().then(data => {
            this.getModalities();
        })
    }

    handleInput(e) {
        const { name, value } = e.target;
        let newRules = validate(name, value, rules);
        this.setState({ rules: newRules });
    }

    handleEdit(e) {
        let id = $(e.target).data('id');
        this.setState({ id, edit: true, message: null });
        find(id).then(data => {
            rules.name.isInvalid = false;
            $('#name').val(data.name);
            $('#elective_months').val(data.elective_months);
            $('#practice_months').val(data.practice_months);
            $('.modal').find('.modal-title').text('Editar modalidad');
            $('.modal').modal('toggle');
        })
    }

    handleModal() {
        $('#form').trigger('reset');
        setRules(rules);
        this.setState({ message: 'Te recomendamos actualizar antes de agregar uno nuevo', edit: false });
        $('.modal').find('.modal-title').text('Agregar modalidad');
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
                            this.getModalities();
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
                        await this.getModalities();
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
                            await this.getModalities();
                        }, 100);
                        toastr.success('', data.message, {
                            closeButton: true
                        });
                    }else{
                        this.setState({message: data.errors.name})
                    }
                });
            }
        } else {
            this.setState({ message: 'Por favor completa el formulario' })
        }
    }

    componentDidMount() {
        this.getModalities();
    }

    render() {
        const { rules } = this.state;
        if (!this.state.modalities) {
            return (
                <Loader />
            )
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Modalidades</h3>
                        <VerifyPermissions permission="create_modality">
                            <a href="#" onClick={this.handleModal}><i className="fa fa-plus" aria-hidden="true"></i> Agregar <span className="d-none d-md-inline ">nueva modalidad</span></a>
                        </VerifyPermissions>
                        <VerifyPermissions permission="update_modality">
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
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.modalities.map((modality, i) => (
                                <tr key={i}>
                                    <td>{modality.name}</td>
                                    <td>
                                        <div className="btn-group" role="modality" aria-label="Basic example">
                                            <VerifyPermissions permission="edit_modality">
                                                <button data-id={modality.id} onClick={this.handleEdit} className="btn btn-sm btn-outline-primary"><i  data-id={modality.id} className="far fa-edit d-sm-block d-md-none"></i><span data-id={modality.id} className="d-none d-md-inline">Editar</span></button>
                                            </VerifyPermissions>

                                            <VerifyPermissions permission="delete_modality">
                                                <button data-id={modality.id} onClick={this.handleDelete} className="btn btn-sm btn-outline-danger"><i data-id={modality.id} className="far fa-trash-alt d-sm-block d-md-none"></i><span data-id={modality.id} className="d-none d-md-inline">Eliminar</span></button>
                                            </VerifyPermissions>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </DataTable>
                    </div>
                </div>

                <div className="modal fade" tabIndex="-1" role="dialog" data-backdrop="static">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.handleSubmit} id="form">
                                    {this.state.message ? (
                                        <div className="alert alert-info" role="alert">
                                            <span><i className="fa fa-info-circle" aria-hidden="true"></i> {this.state.message}</span>
                                        </div>
                                    ) : (
                                            <div className=""></div>
                                        )}
                                    <div className="form-group">
                                        <label htmlFor="name">Nombre<span className="text-danger"> *</span></label>
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
        )
    }
}

export default Modalities;
