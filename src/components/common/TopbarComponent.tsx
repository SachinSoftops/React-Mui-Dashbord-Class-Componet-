import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

interface TopbarComponentProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

class TopbarComponent extends Component<TopbarComponentProps> {
  state = {
    active: false,
    userName: "",
  };

  navigate = useNavigate();

  removeToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginUser");
    localStorage.removeItem("products");
    window.location.reload();
  };

  render() {
    const { active, userName } = this.state;

    return (
      <div className="topbar-wrapper">
        <div className="account-wrapper">
          <div className="account-logo-wrapper">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5FY8JyIeQjpY00TFTpoupNLcw6Aoo3DHCTQ&usqp=CAU"
              alt="logo"
            />
          </div>
        </div>
        <div className="user-wrapper">
          <div className="filter_wrapper d-none d-sm-block">
            <div className="filet_left_content">
              <div className="input-group">Welcome To Our New Website</div>
            </div>
          </div>
          <ul className="head_right_cont">
            <li
              className={
                active
                  ? "list-items user_peofile show"
                  : "list-items user_peofile"
              }
            >
              <div
                className="media align-items-center dropdown-toggle "
                onClick={() => this.setState({ active: !active })}
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded={active ? "true" : "false"}
              >
                <div className="avtar_blc">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="Avtar"
                  />
                </div>
                <div className="media-body">
                  <span className="user_name">
                    <h6>{userName ? userName : "Tony S"}</h6>
                    <p className="">Frontend Developer</p>
                  </span>
                  <div
                    className={
                      active
                        ? "dropdown-menu dropdown-menu-right animate slideIn account_info show"
                        : "dropdown-menu dropdown-menu-right animate slideIn account_info"
                    }
                    aria-labelledby="navbarDropdown"
                  >
                    <span className="dropdown-item" onClick={this.removeToken}>
                      {" "}
                      <i className="flaticon-logout"></i> Logout
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default TopbarComponent;
