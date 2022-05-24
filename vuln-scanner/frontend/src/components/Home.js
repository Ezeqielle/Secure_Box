function Home() {
    return (
        <div id="content">
          <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
            <div className="container-fluid">
              <button
                className="btn btn-link d-md-none rounded-circle me-3"
                id="sidebarToggleTop"
                type="button"
              >
                <i className="fas fa-bars"></i>
              </button>
              <form className="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                  <input
                    className="bg-light form-control border-0 small"
                    type="text"
                    placeholder="Search for ..."
                  />
                  <button className="btn btn-primary py-0" type="button">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
              <ul className="navbar-nav flex-nowrap ms-auto">
                <li className="nav-item dropdown d-sm-none no-arrow">
                  <a
                    className="dropdown-toggle nav-link"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    href="./src"
                  >
                    <i className="fas fa-search"></i>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-end p-3 animated--grow-in"
                    aria-labelledby="searchDropdown"
                  >
                    <form className="me-auto navbar-search w-100">
                      <div className="input-group">
                        <input
                          className="bg-light form-control border-0 small"
                          type="text"
                          placeholder="Search for ..."
                        />
                        <div className="input-group-append">
                          <button className="btn btn-primary py-0" type="button">
                            <i className="fas fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </li>
                <li className="nav-item dropdown no-arrow mx-1">
                  <div className="nav-item dropdown no-arrow">
                    <a
                      className="dropdown-toggle nav-link"
                      aria-expanded="false"
                      data-bs-toggle="dropdown"
                      href="./src"
                    >
                      <span className="badge bg-danger badge-counter">3+</span>
                      <i className="fas fa-bell fa-fw"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                      <h6 className="dropdown-header">alerts center</h6>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="./src"
                      >
                        <div className="me-3">
                          <div className="bg-primary icon-circle">
                            <i className="fas fa-file-alt text-white"></i>
                          </div>
                        </div>
                        <div>
                          <span className="small text-gray-500">
                            December 12, 2019
                          </span>
                          <p>A new monthly report is ready to download!</p>
                        </div>
                      </a>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="./src"
                      >
                        <div className="me-3">
                          <div className="bg-success icon-circle">
                            <i className="fas fa-donate text-white"></i>
                          </div>
                        </div>
                        <div>
                          <span className="small text-gray-500">
                            December 7, 2019
                          </span>
                          <p>$290.29 has been deposited into your account!</p>
                        </div>
                      </a>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="./src"
                      >
                        <div className="me-3">
                          <div className="bg-warning icon-circle">
                            <i className="fas fa-exclamation-triangle text-white"></i>
                          </div>
                        </div>
                        <div>
                          <span className="small text-gray-500">
                            December 2, 2019
                          </span>
                          <p>
                            Spending Alert: We've noticed unusually high
                            spending for your account.
                          </p>
                        </div>
                      </a>
                      <a
                        className="dropdown-item text-center small text-gray-500"
                        href="./src"
                      >
                        Show All Alerts
                      </a>
                    </div>
                  </div>
                </li>
                <li className="nav-item dropdown no-arrow mx-1">
                  <div
                    className="shadow dropdown-list dropdown-menu dropdown-menu-end"
                    aria-labelledby="alertsDropdown"
                  ></div>
                </li>
                <div className="d-none d-sm-block topbar-divider"></div>
                <li className="nav-item dropdown no-arrow">
                  <div className="nav-item dropdown no-arrow">
                    <a
                      className="dropdown-toggle nav-link"
                      aria-expanded="false"
                      data-bs-toggle="dropdown"
                      href="./src"
                    >
                      <span className="d-none d-lg-inline me-2 text-gray-600 small">
                        e@mail.com
                      </span>
                    </a>
                    <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                      <a className="dropdown-item" href="./src">
                        <i className="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>
                        &nbsp;Profile
                      </a>
                      <a className="dropdown-item" href="./src">
                        <i className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"></i>
                        &nbsp;Settings
                      </a>
                      <a className="dropdown-item" href="./src">
                        <i className="fas fa-list fa-sm fa-fw me-2 text-gray-400"></i>
                        &nbsp;Activity log
                      </a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="./src">
                        <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>
                        &nbsp;Logout
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          <div className="container-fluid">
            <div className="d-sm-flex justify-content-between align-items-center mb-4">
              <h3 className="text-dark mb-0">Dashboard</h3>
            </div>
            <div className="row">
              <div className="col-md-6 col-xl-3 mb-4">
                <div className="card shadow border-start-primary py-2">
                  <div className="card-body">
                    <div className="row align-items-center no-gutters">
                      <div className="col me-2">
                        <div className="text-uppercase text-primary fw-bold text-xs mb-1">
                          <span>Host</span>
                        </div>
                        <div className="text-dark fw-bold h5 mb-0">
                          <span>35</span>
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-rss fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-3 mb-4">
                <div className="card shadow border-start-success py-2">
                  <div className="card-body">
                    <div className="row align-items-center no-gutters">
                      <div className="col me-2">
                        <div className="text-uppercase text-success fw-bold text-xs mb-1">
                          <span style={{ color: "var(--bs-blue)" }}>SCANS</span>
                        </div>
                        <div className="text-dark fw-bold h5 mb-0">
                          <span>12</span>
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-desktop fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-3 mb-4">
                <div className="card shadow border-start-info py-2">
                  <div className="card-body">
                    <div className="row align-items-center no-gutters">
                      <div className="col me-2">
                        <div className="text-uppercase text-info fw-bold text-xs mb-1">
                          <span style={{ color: "var(--bs-green)" }}>
                            Vulnerabilities
                          </span>
                        </div>
                        <div className="row g-0 align-items-center">
                          <div className="col-auto">
                            <div className="text-dark fw-bold h5 mb-0 me-3">
                              <span>50</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-3 mb-4">
                <div className="card shadow border-start-warning py-2">
                  <div className="card-body">
                    <div className="row align-items-center no-gutters">
                      <div className="col me-2">
                        <div className="text-uppercase text-warning fw-bold text-xs mb-1">
                          <span style={{ color: "var(--bs-red)" }}>
                            high vulnerabilities
                          </span>
                          <div className="row g-0 align-items-center">
                            <div className="col-auto">
                              <div className="text-dark fw-bold h5 mb-0 me-3">
                                <span>50</span>
                              </div>
                            </div>
                            <div
                              className="col"
                              style={{ color: "var(--bs-pink)" }}
                            >
                              <div
                                className="progress progress-sm"
                                style={{
                                  color: "var(--bs-red)",
                                  borderColor: "var(--bs-red)",
                                }}
                              >
                                <div
                                  className="progress-bar bg-danger"
                                  aria-valuenow="50"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                  style={{ width: "50%" }}
                                >
                                  <span className="visually-hidden">50%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-exclamation-triangle fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-7 col-xl-8">
                <div className="card shadow mb-4">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h6 className="text-primary fw-bold m-0">Completed scans</h6>
                    <div className="dropdown no-arrow">
                      <button
                        className="btn btn-link btn-sm dropdown-toggle"
                        aria-expanded="false"
                        data-bs-toggle="dropdown"
                        type="button"
                      >
                        <i className="fas fa-ellipsis-v text-gray-400"></i>
                      </button>
                      <div className="dropdown-menu shadow dropdown-menu-end animated--fade-in">
                        <p className="text-center dropdown-header">
                          dropdown header:
                        </p>
                        <a className="dropdown-item" href="./src">
                          &nbsp;Action
                        </a>
                        <a className="dropdown-item" href="./src">
                          &nbsp;Another action
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="./src">
                          &nbsp;Something else here
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Scan</th>
                          <th>Host</th>
                          <th>Type</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>first scan</td>
                          <td>127.0.0.1</td>
                          <td>agressive</td>
                          <td>24/03/2021</td>
                          <td>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon icon-tabler icon-tabler-external-link"
                              data-bs-toggle="tooltip"
                              data-bss-tooltip=""
                              data-bs-placement="bottom"
                              style={{
                                color: "var(--bs-blue)",
                                fontSize: "20px",
                              }}
                              title="Details"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              ></path>
                              <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5"></path>
                              <line x1="10" y1="14" x2="20" y2="4"></line>
                              <polyline points="15 4 20 4 20 9"></polyline>
                            </svg>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-xl-4">
                <div className="card shadow mb-4">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h6 className="text-primary fw-bold m-0">
                      Vulnerabilitie repartition
                    </h6>
                    <div className="dropdown no-arrow">
                      <button
                        className="btn btn-link btn-sm dropdown-toggle"
                        aria-expanded="false"
                        data-bs-toggle="dropdown"
                        type="button"
                      >
                        <i className="fas fa-ellipsis-v text-gray-400"></i>
                      </button>
                      <div className="dropdown-menu shadow dropdown-menu-end animated--fade-in">
                        <p className="text-center dropdown-header">
                          dropdown header:
                        </p>
                        <a className="dropdown-item" href="./src">
                          &nbsp;Action
                        </a>
                        <a className="dropdown-item" href="./src">
                          &nbsp;Another action
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="./src">
                          &nbsp;Something else here
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="chart-area">
                      <canvas data-bss-chart='{"type":"doughnut","data":{"labels":["Critical","High","Medium","Low"],"datasets":[{"label":"","backgroundColor":["rgb(37,37,37)","#e74a3b","#fd7e14","#f6c23e","#36b9cc"],"borderColor":["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"],"data":["2","5","50","30","15"]}]},"options":{"maintainAspectRatio":false,"legend":{"display":false,"labels":{"fontStyle":"normal"}},"title":{"fontStyle":"normal","display":false,"text":""}}}'></canvas>
                    </div>
                    <div className="text-center small mt-4">
                      <span className="me-2">
                        <i
                          className="fas fa-circle"
                          style={{ color: "#252525" }}
                        ></i>
                        &nbsp;Critical
                      </span>
                      <span className="me-2">
                        <i
                          className="fas fa-circle"
                          style={{ color: "var(--bs-red)" }}
                        ></i>
                        &nbsp;High
                      </span>
                      <span className="me-2">
                        <i
                          className="fas fa-circle"
                          style={{ color: "var(--bs-orange)" }}
                        ></i>
                        &nbsp;Medium
                      </span>
                      <span className="me-2">
                        <i
                          className="fas fa-circle"
                          style={{ color: "var(--bs-yellow)" }}
                        ></i>
                        &nbsp;Low
                      </span>
                      <span className="me-2">
                        <i className="fas fa-circle text-info"></i>&nbsp;Info
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Home;