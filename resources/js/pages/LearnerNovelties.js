import React, { Component } from 'react';
import { getAll, find } from '../containers/LearnerNovelties';
import Loader from '../components/Loader';
import DataTable from '../components/DataTable';
import { exportExcel } from '../containers/LearnerNovelties';

class LearnerNovelties extends Component {
    constructor(props) {
        super(props);
        this.state = {
            learnerNovelties: null,
            id: null,
        }
        this.exportNovelties = this.exportNovelties.bind(this);
    }

    async getLearnerNovelties () {
        this.setState({learnerNovelties: null});
        let data = await getAll();
        this.setState({learnerNovelties: data});
    }

    async handleDetail(e) {
        let id = $(e.target).data('id');
        let data = await find(id);
        $('#modal-detail').find('.modal-title').text('Detalle de la Novedad');
        $('#modal-detail').find('#learner_name').text(data.learner.name);
        if (data.learner.photo) {
            $('#learner_photo').attr('src', "/storage/" + data.learner.photo);
        }
        $('#modal-detail').find('#learner_document').text(`${data.learner.document_type} ${data.learner.document}`);
        $('#modal-detail').find('#learner_email').text(data.learner.email);
        $('#modal-detail').find('#learner_group').text(data.learner.group.code_tab);
        $('#modal-detail').find('#learner_formation_program').text(data.learner.group.formation_program.name);
        $('#modal-detail').find('#novelty_name').text(data.novelty_type.name);
        $('#modal-detail').find('#justification').text(data.justification);
        $('#modal-detail').find('#committee_date').text(data.committee);
        $('#modal-detail').find('#committee_record_number').text(data.committee);
        $('#modal-detail').find('#reply_date').text(data.reply_date);
        $('#modal-detail').modal('toggle');
    }

    async exportNovelties() {
        let res = await exportExcel();
        let blob = await res.blob();
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = `Novedades.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    componentDidMount() {
        this.getLearnerNovelties();
    }

    render() {
        if (!this.state.learnerNovelties) {
            return (
                <Loader />
            )
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Novedades Aprendices</h3>
                    </div>
                    <div className="col text-right">
                        <button type="button" className="btn btn-outline-primary" onClick={this.exportNovelties}><i className="far fa-file-excel"></i> Exportar</button>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <DataTable>
                            <thead>
                                <tr>
                                    <th>Documento</th>
                                    <th>Aprendiz</th>
                                    <th>Novedad</th>
                                    <th>Fecha Comité</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.learnerNovelties.map(learnerNovelty => (
                                    <tr key={learnerNovelty.id}>
                                        <td>{learnerNovelty.learner.document_type} {learnerNovelty.learner.document}</td>
                                        <td>{learnerNovelty.learner.name}</td>
                                        <td>{learnerNovelty.novelty_type.name}</td>
                                        <td>{learnerNovelty.committee.date}</td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button data-id={learnerNovelty.id} onClick={this.handleDetail} className="btn btn-sm btn-outline-primary">Detalle</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </DataTable>
                    </div>
                </div>
                {/* Detail */}
                <div className="modal fade" tabIndex="-1" data-backdrop="static" id="modal-detail">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal-title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-4">
                                        <div className="row">
                                            <div className="col mx-auto">
                                                <div className="card">
                                                    <img id="learner_photo" src="/img/no-photo.png" alt="learner-img" className="img-fluid" />
                                                    <div className="card-body">
                                                        <h5 className="text-primary mb-3 mt-1" id="learner_name"></h5>
                                                        <h6 id="learner_document"></h6>
                                                        <h6 id="learner_email"></h6>
                                                        <hr />
                                                        <span>Grupo: </span><span className="text-primary" id="learner_group"></span><br />
                                                        <span>Programa: </span><span className="text-primary" id="learner_formation_program"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#information" role="tab" aria-controls="home" aria-selected="true">Detalle</a>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="myTabContent">
                                            <div className="tab-pane fade show active" id="information" role="tabpanel" aria-labelledby="home-tab">
                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <h5 className="text-primary">Tipo de novedad</h5>
                                                        <h6 id="novelty_name"></h6>
                                                        <h5 className="mt-3 text-primary">Justificacion</h5>
                                                        <h6 id="justification"></h6>
                                                        <h5 className="mt-3 text-primary">Fecha del comité</h5>
                                                        <h6 id="committee_date"></h6>
                                                        <h5 className="mt-3 text-primary">Fecha de respuesta</h5>
                                                        <h6 id="reply_date"></h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default LearnerNovelties
