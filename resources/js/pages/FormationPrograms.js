import React, { Component } from 'react';
import { get, rules, store, find, update, destroy, storeMass } from '../containers/FormationPrograms';
import {get as getFormationProgramTypes} from '../containers/FormationProgramTypes';
import Loader from '../components/Loader';
import VerifyPermissions from '../components/VerifyPermission';
import { formValid, validate, setRules } from '../containers/Validator';
import DataTable from '../components/DataTable';

class FormationPrograms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formationPrograms: null,
            formationProgramTypes: null,
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

    async getFormationPrograms() {
        this.setState({ formationPrograms: null });
        let data = await get();
        this.setState({ formationPrograms: data });
    }

    async getFormationProgramTypes() {
        let data = await getFormationProgramTypes();
        this.setState({formationProgramTypes: data})
    }

    handleUpdate() {
        this.setState({formationPrograms: null});
        storeMass().then(data => {
            if(data.success){
                this.getFormationPrograms();
            }else{
                this.getFormationPrograms();
                toastr.error('', data.message, {
                    closeButton: true
                });
            }
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
        setRules(rules, false);
        find(id).then(data => {
            $('#name').val(data.name);
            $('#code').val(data.code);
            $('#formation_program_type_id').val(data.formation_program_type_id);
            $('.modal').find('.modal-title').text('Editar programa de formacion');
            $('.modal').modal('toggle');
        })
    }

    handleModal() {
        $('#form').trigger('reset');
        setRules(rules);
        this.setState({ message: 'Te recomendamos actualizar antes de agregar uno nuevo', edit: false });
        $('.modal').find('.modal-title').text('Agregar programa de formacion');
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
                            this.getFormationPrograms();
                            toastr.success('', data.message, {
                                closeButton: true
                            });
                        }
                    })
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        if (formValid(rules)) {
            if (this.state.edit) {
                update(e.target, this.state.id).then(data => {
                    if (data.success) {
                        $('.modal').modal('toggle');
                        setTimeout(async () => {
                            await this.getFormationPrograms();
                        }, 100);
                        toastr.success('', data.message, {
                            closeButton: true
                        });
                    }else{
                        this.setState({message: data.errors.code || data.errors.name});
                    }
                })
            } else {
                store(e.target).then(data => {
                    if (data.success) {
                        $('.modal').modal('toggle');
                        setTimeout(async () => {
                            await this.getFormationPrograms();
                        }, 100);
                        toastr.success('', data.message, {
                            closeButton: true
                        });
                    }else{
                        this.setState({message: data.errors.code || data.errors.name});
                    }
                });
            }
        } else {
            this.setState({ message: 'Por favor completa el formulario' })
        }
    }

    componentDidMount() {
        this.getFormationPrograms();
        this.getFormationProgramTypes();
    }

    render() {
        const { rules } = this.state;
        if (!this.state.formationPrograms || !this.state.formationProgramTypes) {
            return (
                <Loader />
            )
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Programas</h3>
                        <VerifyPermissions permission="create_formation_program">
                            <a href="#" onClick={this.handleModal}><i className="fa fa-plus" aria-hidden="true"></i> Agregar <span className="d-none d-md-inline ">nuevo programa de formacion</span></a>
                        </VerifyPermissions>
                        <VerifyPermissions permission="update_formation_program">
                            <a href="#" onClick={this.handleUpdate} className=""><i className="fa fa-download ml-1" aria-hidden="true"></i> Actualizar </a>
                        </VerifyPermissions>

                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <DataTable>
                            <thead>
                                <tr>
                                    <th className="hide">Nombre</th>
                                    <th>Codigo</th>
                                    <th className="hide">Tipo de programa</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.formationPrograms.map((formationProgram) => (
                                <tr key={formationProgram.id}>
                                    <td className="hide">{formationProgram.name.split('-')[1] ? formationProgram.name.split('-')[1] : formationProgram.name}</td>
                                    <td>{formationProgram.code}</td>
                                    <td className="hide">{formationProgram.formation_program_type.name}</td>
                                    <td>
                                        <div className="btn-group" role="formationProgram" aria-label="Basic example">
                                            <VerifyPermissions permission="edit_formation_program">
                                                <button data-id={formationProgram.id} onClick={this.handleEdit} className="btn btn-sm btn-outline-primary"><i  data-id={formationProgram.id} className="far fa-edit d-sm-block d-md-none"></i><span data-id={formationProgram.id} className="d-none d-md-inline">Editar</span></button>
                                            </VerifyPermissions>

                                            <VerifyPermissions permission="delete_formation_program">
                                                <button data-id={formationProgram.id} onClick={this.handleDelete} className="btn btn-sm btn-outline-danger"><i data-id={formationProgram.id} className="far fa-trash-alt d-sm-block d-md-none"></i><span data-id={formationProgram.id} className="d-none d-md-inline">Eliminar</span></button>
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
                                        <label htmlFor="code">Codigo <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            name="code"
                                            id="code"
                                            className={rules.code.isInvalid && rules.code.message != '' ? 'form-control is-invalid' : 'form-control'}
                                            onInput={this.handleInput}
                                        />
                                        <div className="invalid-feedback">
                                            {rules.code.isInvalid && rules.code.message != '' ? rules.code.message : ''}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Nombre <span className="text-danger">*</span></label>
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
                                        <label htmlFor="formation_program_type_id">Tipo de programa <span className="text-danger">*</span></label>
                                        <select
                                            name="formation_program_type_id"
                                            id="formation_program_type_id"
                                            className={rules.formation_program_type_id.isInvalid && rules.formation_program_type_id.message != ''?'form-control is-invalid':'form-control'}
                                            onInput={this.handleInput}
                                        >
                                            <option value="">Seleccion uno</option>
                                            {this.state.formationProgramTypes.length>0?(
                                                this.state.formationProgramTypes.map(formationProgramType => (
                                                    <option key={formationProgramType.id} value={formationProgramType.id}>{formationProgramType.name}</option>
                                                ))
                                            ):(
                                                <option value="">No hay tipos de programas</option>
                                            )}
                                        </select>
                                        <div className="invalid-feedback">
                                            {rules.formation_program_type_id.isInvalid && rules.formation_program_type_id.message != '' ? rules.formation_program_type_id.message : ''}
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

export default FormationPrograms;
