import React, { Component } from 'react';
import { getAllCommittes, getAllStimulus } from '../containers/User';
import { getAll} from '../containers/LearnerNovelties';
import LineChart from '../components/LineChart';
import DoughnutChart from '../components/DoughnutChart';
import { Link } from "react-router-dom";
import DataTable from '../components/DataTable';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCommittes: [],
            allStimulus: [],
            allFormativeMeasures: [],
            formativemeasures: [],
            year: null,
            month: null,
            day: null,
            allVoluntaryRetirement: [],
            allAcademic: [],
            allDisciplinary: [],
            allAcademicDisciplinary: [],
            allRetirement: [],
        }
    }

    async getCommittes() {
        let data = await getAllCommittes();
        let academic = data.filter(sesion => sesion.infringement_type.name == "ACADEMICA");
        this.setState({ allAcademic: academic.length });
        let disciplinary = data.filter(sesion => sesion.infringement_type.name == "DISCIPLINARIA");
        this.setState({ allDisciplinary: disciplinary.length});
        let formativeMeasure = data.filter(session => session.responsibles.length > 0);
        this.setState({ allFormativeMeasures: formativeMeasure });

        // var f = new Date();
        // this.setState({ year: f.getFullYear() });
        // this.setState({ month: f.getMonth() +1 });
        // this.setState({ day: f.getDate() });
        // console.log(f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate());
        // this.setState({ dateToday: f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() });

        $('#tableFormativehome').DataTable({
            language:{
                url: 'https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
            },
            info: false,
        });
    }

    async getStimulus() {
        let data = await getAllStimulus();
        this.setState({ allStimulus: data });
    }

    async getLearnerNovelties () {
        let data = await getAll();
        let retirement = data.filter(noveltie => noveltie.novelty_type.name == "RETIRO");
        this.setState({allRetirement: retirement.length});
        let voluntaryretirement = data.filter(noveltie => noveltie.novelty_type.name == "RETIRO VOLUNTARIO");
        this.setState({allVoluntaryRetirement: voluntaryretirement.length});
    }

    componentDidMount() {
        this.getCommittes();
        this.getStimulus();
        this.getLearnerNovelties();
    }

    render() {
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h2>Dashboard</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-3 mt-3">
                        <div className="card">
                            <div className="card-body">
                                <h5>Total casos academicos</h5>
                                <p className="text-center">{this.state.allAcademic}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 mt-3">
                        <div className="card">
                            <div className="card-body">
                                <h5>Total casos disciplinarios</h5>
                                <p className="text-center">{this.state.allDisciplinary}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 mt-3">
                        <div className="card">
                            <div className="card-body">
                                <h5>Total retiros</h5>
                                <p className="text-center">{this.state.allRetirement}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 mt-3">
                        <div className="card">
                            <div className="card-body">
                                <h5>Total retiros voluntarios</h5>
                                <p className="text-center">{this.state.allVoluntaryRetirement}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row my-4">
                    <div className="col-12">
                        <table className="display table table-hover table-sm" id="tableFormativehome">
                            <thead>
                                <tr>
                                    <th>Fecha comité</th>
                                    <th>Aprendiz</th>
                                    <th className="hide">Medida formativa</th>
                                    <th className="hide">Responsable</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.allFormativeMeasures.length > 0 ? (
                                this.state.allFormativeMeasures.map(allFormativeMeasure => (
                                    <tr key={allFormativeMeasure.id}>
                                        <td>
                                            <Link to={"/app/committees/" + allFormativeMeasure.committee.id}>
                                                        {allFormativeMeasure.committee.date}
                                            </Link>
                                        </td>
                                        <td>{allFormativeMeasure.learner.name}</td>
                                        <td className="hide">{allFormativeMeasure.responsibles ? (
                                            allFormativeMeasure.responsibles.length <= 1 ? (
                                                allFormativeMeasure.responsibles.map(responsible => (
                                                    `${responsible.pivot.formative_measure.name}`
                                                ))
                                            ) : (
                                                    <p>
                                                        {allFormativeMeasure.responsibles[0].username}
                                                        <button
                                                        type="button"
                                                        onMouseOver={this.tooltip}
                                                        className="btn btn-link btn-sm"
                                                        data-toggle="tooltip"
                                                        data-placement="right"
                                                        title="Hay mas de una medida formativa"
                                                        >
                                                            <i className="fa fa-info-circle text-info" aria-hidden="true"></i>
                                                        </button>
                                                    </p>
                                                )      
                                        ) : (
                                            'No hay medida'
                                        )}
                                        </td>
                                        <td className="hide">{allFormativeMeasure.responsibles ? (
                                                allFormativeMeasure.responsibles.length <= 1 ? (
                                                    allFormativeMeasure.responsibles.map(responsible => (
                                                        `${responsible.username}`
                                                    ))
                                            ) : (
                                                    <>
                                                    <p>
                                                        {allFormativeMeasure.responsibles[0].username}
                                                    </p>
                                                    </>
                                                )
                                        ) : (
                                            'No hay Resposables'
                                        )}
                                        </td>
                                    </tr>
                                ))) : (
                                    <tr className="col">
                                        <td>No hay datos disponibles</td>
                    
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col-12 col-lg-6 mb-1">
                        <div className="card">
                            <div className="card-body">
                                <h5>Total de casos academicos por mes</h5>
                                <DoughnutChart
                                    label=""
                                />
                            </div>
                        </div>

                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <h5>Total de casos academicos por programa de formacion</h5>
                                <LineChart
                                    label={'Acedemicos'}
                                    color={'rgba(54, 162, 235, 0.2)'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }


}
export default Home;