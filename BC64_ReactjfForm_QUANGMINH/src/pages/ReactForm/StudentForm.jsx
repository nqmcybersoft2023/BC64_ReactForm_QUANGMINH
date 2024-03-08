
import React, { Component } from 'react';

export default class StudentForm extends Component {
  state = {
    value: {
      id: '',
      tenSv: '',
      email: '',
      phoneNumber: '',
    },
    errValue: {
      // id: '',
      // tenSv: '',  
      // email: '',
      // phoneNumber: '',
    },
    isSubmit: false,

    prevStudentEditId: '',
  };

  // Trong StudentForm:
  handleChangeInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const dataType = e.target.getAttribute('data-type');

    const newValue = { ...this.state.value };
    newValue[name] = value;

    console.log(newValue);

    let newErrValue = { ...this.state.errValue };
    let message = '';


    
    if (value === '') {
      message = `${name} không được để trống !`;
    } else if (dataType) {
      switch (dataType) {
        case 'number':
          {
            if (!/^\d+$/.test(value)) {
              message = '* Trường này chỉ chấp nhận số.';
            } else {
              let numberValue = parseInt(value);
              if (numberValue >= 1000) {
                message = '* Trường này phải nhỏ hơn 1000';
              }
            }
          }
          break;
        case 'phoneNumber':
          {
            if (!/^[0-9]{10}$/.test(value)) {
              message = '* Trường này phải có đúng 10 số';
            }
          }
          break;
        case 'email':
          {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
              message = '* Định dạng email không hợp lệ';
            }
          }
          break;
        case 'string':
          {
            if (!/^[A-Za-z\sáàảãạâấầẩẫậăắằẳẵặéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]+$/.test(value)) {
              message = '* Trường này chỉ chứa chữ và khoảng trắng';
            }
          }
          break;
        default:
          break;
      }
    }
    newErrValue[name] = message;


    let valid = true;
    for (let key in newErrValue) {
      if (newErrValue[key] !== '') {
        valid = false;
        break;
      }
    }


    for (let key in newValue) {
      if (newValue[key] === '') {
        valid = false;
        break;
      }
    }

    this.setState({
      value: newValue,
      errValue: newErrValue,
      isSubmit: valid,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.isSubmit) {
      let { handleAddStudent } = this.props;
      console.log(this.state.value);
      handleAddStudent(this.state.value);
    }
  };

  static getDerivedStateFromProps(props, currentState) {
    // Chỉ cập nhật state từ props khi cần thiết
    if (props.studentEdit.id !== currentState.prevStudentEditId) {
      return {
        value: { ...props.studentEdit },
        prevStudentEditId: props.studentEdit.id,
      };
    }
    return null;
  }


  render() {
    let { id, tenSv, email, phoneNumber } = this.state.value;
    console.log(this.state.value);
    return (
      <div className="container mt-5">
        <h2>Form Nhập Thông Tin Sinh Viên</h2>
        <form onSubmit={this.handleSubmit} className="border rounded-2 p-4">
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="studentId" className="form-label">
                  Mã SV
                </label>
                <input
                  data-type="number"
                  type="text"
                  className="form-control"
                  name="id"
                  id="studentId" // Thay đổi id
                  placeholder="Nhập MSSV"
                  value={id}
                  onInput={this.handleChangeInput}
                  autoFocus
                />
                <p style={{ height: '30px' }} className="text-danger">
                  {this.state.errValue.id}
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="studentName" className="form-label">
                  Tên Sinh Viên
                </label>
                <input
                  type="text"
                  data-type="string"
                  className="form-control"
                  name="tenSv"
                  value={tenSv}
                  placeholder="Nhập tên sinh viên"
                  onInput={this.handleChangeInput}
                />
                <p style={{ height: '30px' }} className="text-danger">
                  {this.state.errValue.tenSv}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="studentEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  placeholder="Nhập Email"
                  onInput={this.handleChangeInput}
                />
                <p style={{ height: '30px' }} className="text-danger">
                  {this.state.errValue.email}
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="studentPhone" className="form-label">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  data-type="phoneNumber"
                  className="form-control"
                  name="phoneNumber"
                  value={phoneNumber}
                  placeholder="Nhập SĐT"
                  onInput={this.handleChangeInput}
                />
                <p style={{ height: '30px' }} className="text-danger">
                  {this.state.errValue.phoneNumber}
                </p>
              </div>
            </div>
          </div>
          <button
            disabled={!this.state.isSubmit}
            type="submit"
            className="btn btn-primary  mx-5"
          >
            Thêm Sinh Viên
          </button>
          <button
            disabled={!this.state.isSubmit}
            type="button"
            className="btn btn-primary"
            onClick={() => {
              this.props.handleUpdateStudent(this.state.value);
            }}
          >
            Cập nhật thông tin sinh viên
          </button>
        </form>
      </div>
    );
  }
}

