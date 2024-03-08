 
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import StudentForm from './StudentForm';

export default class ReactForm extends Component {
  state = {
    arrStudent: [
      {
        id: '1',
        tenSv: 'minh',
        email: 'qminh19@gmail.com',
        phoneNumber: '0859940300',
      },
      {
        id: '2',
        tenSv: 'quang',
        email: 'hseminhnguyen@gmail.com',
        phoneNumber: '0868980579',
      },
    ],
    studentEdit: {
      id: '',
      tenSv: '',
      email: '',
      phoneNumber: '',
    },
    searchKeyword: '', // Thêm trạng thái cho từ khóa tìm kiếm
  };

  handleAddStudent = (stuClick) => {
    const arrUpdate = [...this.state.arrStudent, stuClick];
    this.setState({
      arrStudent: arrUpdate,
    });

    // Reset form sau khi thêm sinh viên
    this.handleResetForm();
  };

  handleDeleteStudent = (idStudent) => {
    const newArrStu = this.state.arrStudent.filter(
      (student) => student.id !== idStudent
    );
    this.setState({
      arrStudent: newArrStu,
    });
  };

  handleEditStudent = (stuClick) => {
    this.setState({
      studentEdit: stuClick,
    });
  };

  handleUpdateStudent = (studentUpdate) => {
    const updatedArrStudent = this.state.arrStudent.map((student) =>
      student.id === studentUpdate.id ? studentUpdate : student
    );
    this.setState({
      arrStudent: updatedArrStudent,
      studentEdit: {}, // Cập nhật trạng thái studentEdit
    });
    // Reset form sau khi thêm sinh viên
    this.handleResetForm();
  };

  handleResetForm = () => {
    // Khởi tạo một đối tượng mới để reset form
    const resetValues = {
      id: '',
      tenSv: '',
      email: '',
      phoneNumber: '',
    };

    // Cập nhật state của studentEdit với giá trị mới
    this.setState({
      studentEdit: resetValues,
    });
  };

  handleSearchChange = (event) => {
    this.setState({
      searchKeyword: event.target.value,
    });
  };

  render() {
    const filteredStudents = this.state.arrStudent.filter((student) =>
      student.tenSv.toLowerCase().includes(this.state.searchKeyword.toLowerCase())
    );

    return (
      <div>

        <StudentForm
          handleUpdateStudent={this.handleUpdateStudent}
          studentEdit={this.state.studentEdit}
          handleAddStudent={this.handleAddStudent}
          handleResetForm={this.handleResetForm}
        />

        <table className="table container mt-4 border ">
          <thead>
            <tr className="table-dark">
              <th>Mã SV</th>
              <th>Tên Sinh Viên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Action</th>




              <input
                className="form-control me-2 table-light"
                type="text"
                placeholder="tìm kiếm..."
                value={this.state.searchKeyword}
                onChange={this.handleSearchChange}
              />
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.tenSv}</td>
                <td>{student.email}</td>
                <td>{student.phoneNumber}</td>
                <td>
                  <button
                    onClick={() => {
                      this.handleEditStudent(student);
                    }}
                    className="btn btn-primary mx-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      this.handleDeleteStudent(student.id);
                    }}
                    className="btn btn-success"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="5">Không tìm thấy sinh viên nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
