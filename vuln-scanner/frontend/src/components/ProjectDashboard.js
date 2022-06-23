const ProjectDashboard = () => (
    <div className="container-fluid">
        <div className="d-sm-flex justify-content-between align-items-center mb-4">
            <h3 className="text-dark mb-0">Project name</h3><a className="btn btn-primary btn-sm d-none d-sm-inline-block" role="button" href="assets/add_asset.html"><i className="fas fa-plus fa-sm text-white-50"></i>&nbsp;Add asset</a>
        </div>
        <div className="row">
            <div className="col-lg-7 col-xl-12">
                <div className="card shadow mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h6 className="text-primary fw-bold m-0">Project configuration</h6>
                        <div className="dropdown no-arrow"><button className="btn btn-link btn-sm dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button"><i className="fas fa-ellipsis-v text-gray-400"></i></button>
                            <div className="dropdown-menu shadow dropdown-menu-end animated--fade-in">
                                <p className="text-center dropdown-header">dropdown header:</p><a className="dropdown-item" href="#">&nbsp;Action</a><a className="dropdown-item" href="#">&nbsp;Another action</a>
                                <div className="dropdown-divider"></div><a className="dropdown-item" href="#">&nbsp;Something else here</a>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="alert alert-danger" role="alert"><span><strong>Attention you have not filled in the form correctly.</strong><br /></span>
                            <ul style={{ margin: 0 }}>
                                <li>email format not valid</li>
                            </ul>
                        </div>
                        <form>
                            <div className="row">
                                <div className="col">
                                    <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Name</strong><br /></label><input className="form-control" type="text" id="username-1" placeholder="Project name" name="projectname" /></div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Share with the following users (separate with ; )</strong><br /></label><input className="form-control" type="text" id="username" placeholder="user.name" name="username" /></div>
                                </div>
                                <div className="col-xl-12 offset-xl-0"><a className="btn btn-primary" role="button">Save Project</a></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-lg-7 col-xl-12">
                <div className="card shadow mb-5">
                    <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold">All assets</p>
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
                                                <th>Address</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr style={{ width: "886px" }}>
                                                <td>Net</td>
                                                <td>Network</td>
                                                <td>127.0.0.1/24</td>
                                                <td className="text-primary d-xl-flex" style={{ textAlign: "right" }}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-external-link d-xl-flex" style={{ borderColor: "var(--bs-blue)", color: "var(--bs-blue)", fontSize: "22px" }}>
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5"></path>
                                                    <line x1="10" y1="14" x2="20" y2="4"></line>
                                                    <polyline points="15 4 20 4 20 9"></polyline>
                                                </svg><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-trash d-xl-flex" style={{ borderColor: "var(--bs-blue)", color: "var(--bs-red)", fontSize: "22px" }}>
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <line x1="4" y1="7" x2="20" y2="7"></line>
                                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                                    </svg></td>
                                            </tr>
                                            <tr>
                                                <td>Site</td>
                                                <td>IP</td>
                                                <td>127.0.0.1</td>
                                                <td className="text-primary d-xl-flex" style={{ textAlign: "right" }}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-external-link d-xl-flex" style={{ borderColor: "var(--bs-blue)", color: "var(--bs-blue)", fontSize: "22px" }}>
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5"></path>
                                                    <line x1="10" y1="14" x2="20" y2="4"></line>
                                                    <polyline points="15 4 20 4 20 9"></polyline>
                                                </svg><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-trash d-xl-flex" style={{ borderColor: "var(--bs-blue", color: "var(--bs-danger)", fontSize: "22px" }}>
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <line x1="4" y1="7" x2="20" y2="7"></line>
                                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                                    </svg></td>
                                            </tr>
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

export default ProjectDashboard;