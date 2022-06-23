const AccountEdit = () => (
  <div className="container-fluid">
    <h3 className="text-dark mb-4">Profile</h3>
    <div className="row mb-3">
      <div className="col-lg-8 col-xl-12">
        <div className="row mb-3 d-none">
          <div className="col">
            <div className="card textwhite bg-primary text-white shadow">
              <div className="card-body">
                <div className="row mb-2">
                  <div className="col">
                    <p className="m-0">Peformance</p>
                    <p className="m-0"><strong>65.2%</strong></p>
                  </div>
                  <div className="col-auto"><i className="fas fa-rocket fa-2x"></i></div>
                </div>
                <p className="text-white-50 small m-0"><i className="fas fa-arrow-up"></i>&nbsp;5% since last month</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card textwhite bg-success text-white shadow">
              <div className="card-body">
                <div className="row mb-2">
                  <div className="col">
                    <p className="m-0">Peformance</p>
                    <p className="m-0"><strong>65.2%</strong></p>
                  </div>
                  <div className="col-auto"><i className="fas fa-rocket fa-2x"></i></div>
                </div>
                <p className="text-white-50 small m-0"><i className="fas fa-arrow-up"></i>&nbsp;5% since last month</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 offset-lg-0">
            <div className="card shadow mb-3">
              <div className="card-header py-3">
                <p className="text-primary m-0 fw-bold">User Settings</p>
              </div>
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col">
                      <div className="mb-3"><label className="form-label" htmlFor="first_name"><strong>First Name</strong></label><input className="form-control" type="text" id="first_name" placeholder="John" name="first_name" /></div>
                    </div>
                    <div className="col">
                      <div className="mb-3"><label className="form-label" htmlFor="last_name"><strong>Last Name</strong></label><input className="form-control" type="text" id="last_name" placeholder="Doe" name="last_name" /></div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Email Address</strong></label><input className="form-control" type="email" id="email" placeholder="user@example.com" name="email" /></div>
                  </div>
                </form><button className="btn btn-primary btn-sm" type="submit">Save Settings</button>
              </div>
            </div>
            <div className="card shadow">
              <div className="card-header py-3">
                <p className="text-primary m-0 fw-bold">Account type</p>
              </div>
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col">
                      <div className="text-primary mb-3">
                        <div className="form-check"><input className="form-check-input" type="radio" id="formCheck-2" /><label className="form-check-label text-muted" htmlFor="formCheck-2">Administrator</label></div>
                        <div className="form-check"><input className="form-check-input" type="radio" id="formCheck-4" /><label className="form-check-label text-muted" htmlFor="formCheck-4">Reader</label></div>
                        <div className="form-check"><input className="form-check-input" type="radio" id="formCheck-3" /><label className="form-check-label text-muted" htmlFor="formCheck-3">Basic user</label></div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3"><button className="btn btn-primary btn-sm" type="submit">Save&nbsp;Settings</button></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-100"></div>
    </div>
    <div className="card shadow mb-5">
      <div className="card-header py-3">
        <p className="text-primary m-0 fw-bold">Assets</p>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-12 col-lg-12 col-xl-12">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Application</th>
                    <th>Host</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ width: "886px" }}>
                    <td>Cell 1</td>
                    <td>127.0.0.1</td>
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
                    <td>Cell 1</td>
                    <td>Cell 3</td>
                    <td className="text-primary d-xl-flex" style={{ textAlign: "right" }}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-external-link d-xl-flex" style={{ borderColor: "var(--bs-blue)", color: "var(--bs-blue)", fontSize: "22px" }}>
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5"></path>
                      <line x1="10" y1="14" x2="20" y2="4"></line>
                      <polyline points="15 4 20 4 20 9"></polyline>
                    </svg><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-trash d-xl-flex" style={{ borderColor: "var(--bs-blue)", color: "var(--bs-danger)", fontSize: "22px" }}>
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
)
export default AccountEdit;