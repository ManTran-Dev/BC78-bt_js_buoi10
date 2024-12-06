class Staff {
  constructor(
    _id,
    _name,
    _email,
    _password,
    _ngayLam,
    _tienLuong,
    _chucVu,
    _giolam
  ) {
    this.id = _id;
    this.name = _name;
    this.email = _email;
    this.password = _password;
    this.ngayLam = _ngayLam;
    this.tienLuong = _tienLuong;
    this.chucVu = _chucVu;
    this.giolam = _giolam;
    this.tongLuong = 0;
  }

  sumSalary() {
    if (this.chucVu == "Sếp") {
      return (this.tongLuong = this.tienLuong * 3);
    } else if (this.chucVu == "Trưởng phòng") {
      return (this.tongLuong = this.tienLuong * 2);
    } else if (this.chucVu == "Nhân viên") {
      return (this.tongLuong = this.tienLuong);
    } else {
      this.tongLuong = 0;
    }
  }

  loaiNhanVien() {
    if (this.giolam >= 192) {
      this.loaiNhanVien = "Nhân viên xuất sắc";
    } else if (this.giolam >= 176) {
      this.loaiNhanVien = "Nhân viên giỏi";
    } else if (this.giolam >= 160) {
      this.loaiNhanVien = "Nhân viên khá";
    } else {
      this.loaiNhanVien = "Nhân viên trung bình";
    }
  }
}

export default Staff;
