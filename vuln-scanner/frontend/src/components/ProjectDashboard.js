import { getFetch } from '../utils/functions';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { BoxArrowUpRight } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
import Session from 'react-session-api'

Session.config(true, 60)

const ProjectDashboard = () => {

    const SCAN_TYPES = ["Aggressive", "Normal"]

    const [projectName, setProjectName] = useState("Project Name");
    const [projectDate, setProjectDate] = useState("");
    const [userName, setUserName] = useState("");
    const [projectScans, setProjectScans] = useState([]);


    let { projectId } = useParams();

    const getProjectInfo = async () => {
        const projectInfo = await getFetch({ username: Session.get("username"), token: Session.get("token"), reportId: projectId }, "/getProjectInfo")
        const projectScans = await getFetch({ username: Session.get("username"), token: Session.get("token"), reportId: projectId }, "/getProjectScans")
        const userInfo = await getFetch({ reqUsername: Session.get("username"), reqToken: Session.get("token"), userId: projectInfo.data.userId }, "/getUserInfo")
        setProjectName(projectInfo.data.reportName)
        setProjectDate(projectInfo.data.reportDate)
        setProjectScans(projectScans.data.scans)
        setUserName(userInfo.data.user.user_name)
    }

    let navigate = useNavigate();

    useEffect(() => {

        if (Session.get("username") == undefined || Session.get("token") == undefined) {
            return navigate("/login");
        }

        getProjectInfo()

    }, []);


    return (
        <div className="container-fluid">
            <div className="d-sm-flex justify-content-between align-items-center mb-4">
                <h3 className="text-dark mb-0">{projectName}</h3><Link to={"/scancreation/" + projectId} className="btn btn-primary btn-sm d-none d-sm-inline-block" role="button" href="assets/add_asset.html"><i className="fas fa-plus fa-sm text-white-50"></i>&nbsp;New Scan</Link>
            </div>
            <div className="row">
                <div className="col">
                    <div className="card shadow mb-5">
                        <div className="card-header py-3">
                            <p className="text-primary m-0 fw-bold">Project informations&nbsp;</p>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Project Name&nbsp;&nbsp;</strong></label>
                                            <p>{projectName}</p>
                                            <p></p>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Creation date</strong></label>
                                            <p>{projectDate.toLocaleString('en-GB', { timeZone: 'UTC' }).split(".")[0]}</p>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Created by</strong></label>
                                            <p>{userName}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3"></div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7 col-xl-12">
                    <div className="card shadow mb-5">
                        <div className="card-header py-3">
                            <p className="text-primary m-0 fw-bold">All Scans</p>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12 col-lg-12 col-xl-12">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Type</th>
                                                    <th>Target</th>
                                                    <th>Edit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {projectScans.map((scan, i) => (
                                                    <tr key={i}>
                                                        <td>{scan.scan_name}</td>
                                                        <td>{SCAN_TYPES[scan.scan_type_id]}</td>
                                                        <td>{scan.scan_target}</td>
                                                        <td><Link to={"/scan/" + scan.scan_id}><BoxArrowUpRight /></Link></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <form>
                                        <div className="mb-3"></div>
                                        <div className="mb-3"></div>
                                        <div className="mb-3"></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDashboard;