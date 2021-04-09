import React, { Component } from 'react';
import DataTable from '../components/DataTable';
import { get, store, find, update, destroy, rules } from '../containers/CommitteeParameters';
import Loader from '../components/Loader';
import { formValid, validate, setRules } from '../containers/Validator';
import Ckeditor from '../components/Ckeditor';
import { findActive } from '../containers/ActTemplate';
import VerifyPermissions from '../components/VerifyPermission';

class CommitteeParameters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            committeeParameters: null,
            rules,
            edit: false,
            activeActTemplates: null,
            ckdata: "",
            message: null,
            id: null
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    async getCommitteeParameters() {
        this.setState({ committeeParameters: null })
        let data = await get();
        this.setState({ committeeParameters: data })
    }
    async getActTemplatesActive() {
        let data = await findActive();
        this.setState({ activeActTemplates: data });
    }

    tooltip(e) {
        $(e.target).tooltip();
    }

    handleModal() {
        $('#form').trigger('reset');
        setRules(rules);
        this.setState({ ckdata: "", message: null, edit: false });
        $('.modal').find('.modal-title').text('Crear parámetro de acta');
        $('.modal').modal('toggle');
    }

    async handleEdit(e) {
        let id = $(e.target).data('id');
        let data = await find(id);
        this.setState({ ckdata: data.content ? data.content : '', id, edit: true, message: null });
        setRules(rules, false);
        find(id).then(data => {
            $('#name').val(data.name);
            $('#act_template_id').val(data.act_template_id);
            $('#slug').val(data.slug)
            $('.modal').find('.modal-title').text('Editar parámetro de acta');
            $('.modal').modal('toggle');
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
                        await this.getCommitteeParameters();
                    }, 100);
                    toastr.success('', data.message, {
                        closeButton: true
                    });
                } else {
                    this.setState({ message: data.errors.name })
                }
            } else {
                let data = await store(e.target);
                if (data.success) {
                    $('.modal').modal('toggle');
                    setTimeout(async () => {
                        await this.getCommitteeParameters();
                    }, 100);
                    toastr.success('', data.message, {
                        closeButton: true
                    });
                } else {
                    this.setState({ message: data.errors.name || data.errors.content })
                }
            }
        } else {
            this.setState({ message: 'Por favor completa el formulario' })
        }
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
                            this.getCommitteeParameters();
                            toastr.success('', data.message, {
                                closeButton: true
                            });
                        }
                    })
            }
        })
    }

    handleInput(e) {
        let { name, value } = e.target;
        let newRules = validate(name, value, rules)
        this.setState({ rules: newRules });
        if (name == 'name') {
            let str = value.trim();
            str = str.toLowerCase();
            str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            let slug = str.replace(/ /g, '_');
            $('#slug').val('${' + slug + '}');
            if (slug.length >= 8) {
                rules.slug.isInvalid = false;
            } else {
                rules.slug.isInvalid = true;
            }
        }
    }

    componentDidMount() {
        this.getCommitteeParameters();
        this.getActTemplatesActive();
    }

    render() {
        let { rules } = this.state;
        if (!this.state.committeeParameters || !this.state.activeActTemplates) {
            return <Loader />
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Parámetros de acta</h3>
                        <VerifyPermissions permission="create_committee_parameter">
                            <a href="#" onClick={this.handleModal}><i className="fa fa-plus" aria-hidden="true"></i> Agregar nuevo parámetro</a>
                        </VerifyPermissions>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <DataTable>
                            <thead>
                                <tr>
                                    <th className="hide">Nombre</th>
                                    <th>Plantilla</th>
                                    <th className="hide">Version</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {this.state.committeeParameters.map((committeeParameter, i) => (
                                        <tr key={i}>
                                            <td className="hide">{committeeParameter.name}</td>
                                            <td>{committeeParameter.act_template.act_type}</td>
                                            <td className="hide">{committeeParameter.act_template.version}</td>
                                            <td>
                                                <div className="btn-group" role="committeeParameter" aria-label="Basic example">
                                                    <VerifyPermissions permission="edit_committee_parameter">
                                                        <button data-id={committeeParameter.id} onClick={this.handleEdit} className="btn btn-sm btn-outline-primary"><i  data-id={committeeParameter.id} className="far fa-edit d-sm-block d-md-none"></i><span data-id={committeeParameter.id} className="d-none d-md-inline">Editar</span></button>
                                                    </VerifyPermissions>
                                                    <VerifyPermissions permission="delete_committee_parameter">
                                                        <button data-id={committeeParameter.id} onClick={this.handleDelete} className="btn btn-sm btn-outline-danger"><i data-id={committeeParameter.id} className="far fa-trash-alt d-sm-block d-md-none"></i><span data-id={committeeParameter.id} className="d-none d-md-inline">Eliminar</span></button>
                                                    </VerifyPermissions>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </DataTable>
                    </div>
                </div>

                <div className="modal fade" id="modal" tabIndex="-1" role="dialog" data-backdrop="static">
                    <div className="modal-dialog modal-lg">
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
                                        <label htmlFor="">Nombre <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            maxLength="80"
                                            className={rules.name.isInvalid && rules.name.message != '' ? 'form-control is-invalid' : 'form-control'}
                                            onInput={this.handleInput}
                                            autoComplete="off"
                                        />
                                        <div className="invalid-feedback">
                                            {rules.name.isInvalid && rules.name.message != '' ? rules.name.message : ''}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row">
                                            <div className="col">
                                                <label htmlFor="slug">Slug<span className="text-danger"> *</span>
                                                    <button
                                                        type="button"
                                                        onMouseOver={this.tooltip}
                                                        className="btn btn-link btn-sm"
                                                        data-toggle="tooltip"
                                                        data-placement="right"
                                                        title="Cadena de texto que debe estar en la plantilla"
                                                    >
                                                        <i className="fa fa-info-circle text-info" aria-hidden="true"></i>
                                                    </button>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="slug"
                                                    id="slug"
                                                    className={rules.slug.isInvalid && rules.slug.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                    onInput={this.handleInput}
                                                />
                                                <div className="invalid-feedback">
                                                    {rules.slug.isInvalid && rules.slug.message != '' ? rules.slug.message : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="act_template_id">Plantilla <span className="text-danger">*</span></label>
                                        {this.state.activeActTemplates.length > 0 ? (
                                            <React.Fragment>
                                                <select
                                                    name="act_template_id"
                                                    id="act_template_id"
                                                    className={rules.act_template_id.isInvalid && rules.act_template_id.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                    onInput={this.handleInput}
                                                >
                                                    <option value="">Seleccion uno</option>
                                                    {this.state.activeActTemplates.map(activeActTemplate => (
                                                        <option key={activeActTemplate.id} value={activeActTemplate.id}>{activeActTemplate.act_type} (V{activeActTemplate.version})</option>
                                                    ))}
                                                </select>
                                                <div className="invalid-feedback">
                                                    {rules.act_template_id.isInvalid && rules.act_template_id.message != '' ? rules.act_template_id.message : ''}
                                                </div>
                                            </React.Fragment>
                                        ) : (
                                                <h6 className="text-muted"><i>No hay actas activas registradas</i></h6>
                                            )}
                                    </div>

                                    <div className="form-group">
                                        <div className="form-row">
                                            <div className="col">
                                                <label htmlFor="">Contenido
                                                </label>
                                                <Ckeditor
                                                    name="content"
                                                    id="content"
                                                    d={this.state.ckdata}
                                                    options={['heading', 'bold', 'italic', 'blockQuote', 'bulletedList', 'numberedList', 'undo', 'redo']}
                                                />
                                            </div>
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
export default CommitteeParameters;
