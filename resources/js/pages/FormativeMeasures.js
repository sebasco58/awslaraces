import React, { Component } from 'react';
import { get, store, find, update, destroy, rules } from '../containers/FormativeMeasures';
import { formValid, validate, setRules } from '../containers/Validator';
import Loader from '../components/Loader';
import VerifyPermissions from '../components/VerifyPermission';
import DataTable from '../components/DataTable';

class FormativeMeasures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formativeMeasures: null,
            edit: false,
            id: null,
            rules: rules
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    async getFormativeMeasures() {
        this.setState({ formativeMeasures: null });
        let data = await get();
        this.setState({ formativeMeasures: data });
    }

    handleInput(e) {
        let { name, value } = e.target;
        let newRules = validate(name, value, rules)
        this.setState({ rules: newRules });
    }

    async handleEdit(e) {
        let id = $(e.target).data('id');
        setRules(rules, false);
        this.setState({ id, edit: true, message: null });
        let data = await find(id);
        $('.modal').find('.modal-title').text('Editar medida formativa');
        $('.modal').find('#name').val(data.name);
        $('.modal').modal('toggle');
    }
    
    handleModal() {
        setRules(rules);
        $('#form').trigger('reset');
        this.setState({ message: '', edit: false });
        $('.modal').find('.modal-title').text('Agregar medida formativa');
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
                            this.getFormativeMeasures();
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
                            await this.getFormativeMeasures();
                        }, 100);
                        toastr.success('', data.message, {
                            closeButton: true
                        });
                    }else{
                        this.setState({ message: data.errors.name })
                    }
                })
            } else {
                store(e.target).then(data => {
                    if (data.success) {
                        $('.modal').modal('toggle');
                        setTimeout(async () => {
                            await this.getFormativeMeasures();
                        }, 100);
                        toastr.success('', data.message, {
                            closeButton: true
                        });
                    }else{
                        this.setState({ message: data.errors.name })
                    }
                });
            }
        } else {
            this.setState({ message: 'Por favor completa el formulario' })
        }
    }

    componentDidMount() {
        this.getFormativeMeasures();
    }

    render() {
        const { rules } = this.state;
        if (!this.state.formativeMeasures) {
            return (
                <Loader />
            )
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Medida formativa</h3>
                        <VerifyPermissions permission="create_formative_measure">
                            <a href="#" onClick={this.handleModal}><i className="fa fa-plus" aria-hidden="true"></i> Agregar nueva medida formativa</a>
                        </VerifyPermissions>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <DataTable>
                            <thead>
                                <tr>
                                    <th >Nombre</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.formativeMeasures.map((formativeMeasure ) => (
                                <tr key={formativeMeasure.id}>
                                    <td >{formativeMeasure.name}</td>
                                    <td>
                                        <div className="btn-group" role="formativeMeasure" aria-label="Basic example">
                                            <VerifyPermissions permission="edit_formative_measure">
                                                <button data-id={formativeMeasure.id} onClick={this.handleEdit} className="btn btn-sm btn-outline-primary"><i  data-id={formativeMeasure.id} className="far fa-edit d-sm-block d-md-none"></i><span data-id={formativeMeasure.id} className="d-none d-md-inline">Editar</span></button>
                                            </VerifyPermissions>

                                            <VerifyPermissions permission="delete_formative_measure">
                                                <button data-id={formativeMeasure.id} onClick={this.handleDelete} className="btn btn-sm btn-outline-danger"><i data-id={formativeMeasure.id} className="far fa-trash-alt d-sm-block d-md-none"></i><span data-id={formativeMeasure.id} className="d-none d-md-inline">Eliminar</span></button>
                                            </VerifyPermissions>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </DataTable>
                    </div>
                </div>

                <div className="modal fade" tabIndex="-1" data-backdrop="static">
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
                                            <span><i className="fa fa-info-circle" aria-hidden="true"></i> {this.state.message}</span>
                                        </div>
                                    ) : (
                                            <div className=""></div>
                                        )}
                                    <div className="form-group">
                                        <label htmlFor="">Nombre <span className="text-danger">*</span></label>
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
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button type="submit" form="form" className="btn btn-primary">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default FormativeMeasures;
