
const AccountManagement = () => (
    <div className="container-fluid">
        <h3 className="text-dark mb-4">Manage accounts</h3>
        <div className="card shadow">
            <div className="card-header py-3">
                <p className="text-primary m-0 fw-bold">Employee Info</p>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6 text-nowrap">
                        <div id="dataTable_length" className="dataTables_length" aria-controls="dataTable"></div>
                    </div>
                    <div className="col-md-6">
                        <div className="text-md-end dataTables_filter" id="dataTable_filter"><label className="form-label"><input type="search" className="form-control form-control-sm" aria-controls="dataTable" placeholder="Search" /></label></div>
                    </div>
                </div>
                <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                    <table className="table my-0" id="dataTable">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Entity</th>
                                <th>Role</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30" src="assets/img/avatars/avatar1.jpeg" />Airi Satou</td>
                                <td>Accountant</td>
                                <td>
                                    <div className="dropdown"><button className="btn btn-success dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button">Admin</button>
                                        <div className="dropdown-menu"><a className="dropdown-item" href="#">First Item</a><a className="dropdown-item" href="#">Second Item</a><a className="dropdown-item" href="#">Third Item</a></div>
                                    </div>
                                </td>
                                <td className="text-center"><i className="fa fa-envelope" style={{ padding: "3px", color: "var(--bs-primary)" }}></i><i className="fa fa-remove" style={{ padding: "3px", color: "rgb(222,0,0)" }}></i></td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30" src="assets/img/avatars/avatar2.jpeg" />Angelica Ramos</td>
                                <td>Chief Executive Officer(CEO)</td>
                                <td>
                                    <div className="dropdown"><button className="btn btn-primary dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button">Reader</button>
                                        <div className="dropdown-menu"><a className="dropdown-item" href="#">First Item</a><a className="dropdown-item" href="#">Second Item</a><a className="dropdown-item" href="#">Third Item</a></div>
                                    </div>
                                </td>
                                <td className="text-center">47</td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30" src="assets/img/avatars/avatar3.jpeg" />Ashton Cox</td>
                                <td>Junior Technical Author</td>
                                <td>
                                    <div className="dropdown"><button className="btn btn-warning dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button">Analyser</button>
                                        <div className="dropdown-menu"><a className="dropdown-item" href="#">First Item</a><a className="dropdown-item" href="#">Second Item</a><a className="dropdown-item" href="#">Third Item</a></div>
                                    </div>
                                </td>
                                <td className="text-center">66</td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30" src="assets/img/avatars/avatar4.jpeg" />Bradley Greer</td>
                                <td>Software Engineer</td>
                                <td>London</td>
                                <td className="text-center">41</td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30" src="assets/img/avatars/avatar5.jpeg" />Brenden Wagner</td>
                                <td>Software Engineer</td>
                                <td>San Francisco</td>
                                <td className="text-center">28</td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30" src="assets/img/avatars/avatar1.jpeg" />Brielle Williamson</td>
                                <td>Integration Specialist</td>
                                <td>New York</td>
                                <td className="text-center">61</td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30" src="assets/img/avatars/avatar2.jpeg" />Bruno Nash<br /></td>
                                <td>Software Engineer</td>
                                <td>London</td>
                                <td className="text-center">38</td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30" src="assets/img/avatars/avatar3.jpeg" />Caesar Vance</td>
                                <td>Pre-Sales Support</td>
                                <td>New York</td>
                                <td className="text-center">21</td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30" src="assets/img/avatars/avatar4.jpeg" />Cara Stevens</td>
                                <td>Sales Assistant</td>
                                <td>New York</td>
                                <td className="text-center">46</td>
                            </tr>
                            <tr>
                                <td><img className="rounded-circle me-2" width="30" height="30" src="assets/img/avatars/avatar5.jpeg" />Cedric Kelly</td>
                                <td>Senior JavaScript Developer</td>
                                <td>Edinburgh</td>
                                <td className="text-center">22</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr></tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
)

export default AccountManagement;