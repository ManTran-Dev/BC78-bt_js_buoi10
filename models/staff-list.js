class StaffList {
  constructor() {
    this.arr = [];
  }

  addStaff(staff) {
    this.arr.push(staff);
  }

  findIndexStaff(id) {
    let index = -1;
    for (let i = 0; i < this.arr.length; i++) {
      const staff = this.arr[i];
      if (staff.id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  removeStaff(id) {
    // Tìm vị trí của staff cần xóa
    const index = this.findIndexStaff(id);
    // Xóa staff khỏi mảng
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
    return null;
  }

  editStaff(id) {
    // Tìm vị trí của staff cần sửa
    const index = this.findIndexStaff(id);
    // Lấy food từ vị trí tìm thấy trong mảng
    if (index !== -1) {
      // Trả về staff
      return this.arr[index];
    }

    return null;
  }

  updateStaff(staff) {
    // Tìm vị trí của staff cần update
    const index = this.findIndexStaff(staff.id);
    if (index !== -1) {
      this.arr[index] = staff;
    }
  }

  searchStaff(keyword) {
    let result = [];
    for (let i = 0; i < this.arr.length; i++) {
      const staff = this.arr[i];
      // chuyển keyword và food.name về chữ thường
      const keywordLowerCase = keyword.toLowerCase();
      const staffChucVuLowerCase = staff.loaiNhanVien.toLowerCase();

      if (staffChucVuLowerCase.indexOf(keywordLowerCase) !== -1) {
        result.push(staff);
      }
    }
    return result;
  }
}

export default StaffList;
