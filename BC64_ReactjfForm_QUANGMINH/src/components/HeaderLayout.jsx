// import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
// import clsx from 'clsx';

// export default class HeaderLayout extends Component {
//   state = {
//     searchValue: '' // Thêm state để lưu trữ giá trị của input search
//   };

//   handleSearchChange = (e) => {
//     this.setState({ searchValue: e.target.value });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     const fieldName = e.target.querySelector('input').name;
//     const fieldValue = this.state.searchValue;
  
//     // Thực hiện việc tìm kiếm dựa trên giá trị của `name` và giá trị của input
//     console.log(`Searching by ${fieldName}: ${fieldValue}`);
//   };
  
//   render() {
//     return (
//       <div>
//         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//           <div className="container-fluid">
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#navbarSupportedContent"
//               aria-controls="navbarSupportedContent"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
//               <span className="navbar-toggler-icon" />
//             </button>
//             <div
//               className="collapse navbar-collapse"
//               id="navbarSupportedContent"
//             >
//               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                 <li className="nav-item">
//                   <NavLink
//                     className="nav-link "
//                     activeClassName="active"
//                     exact
//                     to="/bt-form"
//                     style={{ fontSize: '25px', fontWeight: 'bold', color: 'white' }}
//                   >
//                     Thông tin sinh viên
//                   </NavLink>
//                 </li>
//               </ul>
//               <form className="d-flex" 
//               onSubmit={this.handleSubmit}  >
//                 <input
//                   className="form-control me-2"
//                   type="search"
//                   placeholder="Search"
//                   aria-label="Search"
//                   value={this.state.searchValue}
//                   onChange={this.handleSearchChange}
//                 />
//                 <button className="btn btn-outline-success" type="submit">
//                   Search
//                 </button>
//               </form>
//             </div>
//           </div>
//         </nav>
//       </div>
//     );
//   }
// }
 
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class HeaderLayout extends Component {
  state = {
    searchValue: '', // Trạng thái lưu giữ giá trị của ô tìm kiếm
  };

  // Xử lý thay đổi giá trị của ô tìm kiếm
  handleSearchChange = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  // Xử lý khi người dùng gửi yêu cầu tìm kiếm
  handleSubmit = (e) => {
    e.preventDefault();
    const { searchValue } = this.state;
    this.props.handleSearch(searchValue); // Gọi hàm tìm kiếm từ props
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    exact
                    to="/bt-form"
                    style={{ fontSize: '25px', fontWeight: 'bold', color: 'white' }}
                  >
                    Thông tin sinh viên
                  </NavLink>
                </li>
              </ul>
               
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
