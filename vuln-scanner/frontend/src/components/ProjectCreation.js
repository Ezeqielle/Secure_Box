const ProjectCreation = () => (
    <div className="container-fluid">
        <div className="d-sm-flex justify-content-between align-items-center mb-4">
            <h3 className="text-dark mb-0">Project creation</h3>
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
        </div>
    </div>
)

export default ProjectCreation;