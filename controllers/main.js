import StaffList from "../models/staff-list.js";
import Staff from "../models/staff.js";
import Validation from "../models/validation.js";

// create new object from class StaffList
const staffList = new StaffList();

const validation = new Validation();

export const getEleId = (id) => document.getElementById(id);

//Get Info Staff
const getInfoStaff = () => {
  const id = getEleId("tknv").value;
  const name = getEleId("name").value;
  const email = getEleId("email").value;
  const password = getEleId("password").value;
  const ngayLam = getEleId("datepicker").value;
  const tienLuong = getEleId("luongCB").value;
  const chucVu = getEleId("chucvu").value;
  const giolam = getEleId("gioLam").value;

  // check validation
  let isValid = true;

  // check tài khoản
  isValid &=
    validation.checkEmpty(id, "tbTKNV", "Vui lòng nhập tài khoản!") &&
    validation.checkID(
      id,
      "tbTKNV",
      "Vui lòng nhập từ 4 - 6 ký tự và không chứa ký tự đặc biệt"
    ) &&
    validation.checkIdExist(id, "tbTKNV", "Tài khoản đã có", staffList.arr);

  // check name
  isValid &=
    validation.checkEmpty(name, "tbTen", "Vui lòng nhập tên!") &&
    validation.checkName(name, "tbTen", "Vui lòng không nhập ký tự đặc biệt");

  // check email
  isValid &=
    validation.checkEmpty(email, "tbEmail", "Vui lòng nhập email!") &&
    validation.checkEmail(email, "tbEmail", "Không đúng định dạng email!");

  // check password
  isValid &=
    validation.checkEmpty(password, "tbMatKhau", "Vui lòng nhập mật khẩu!") &&
    validation.checkPassword(
      password,
      "tbMatKhau",
      "Vui lòng nhập ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt"
    );

  // check ngày làm
  isValid &=
    validation.checkEmpty(ngayLam, "tbNgay", "Vui lòng nhập ngày làm!") &&
    validation.checkdatePicker(
      ngayLam,
      "tbNgay",
      "Vui lòng nhập đúng định dạng mm/dd/yyyy"
    );

  // check tiền lương
  isValid &=
    validation.checkEmpty(
      tienLuong,
      "tbLuongCB",
      "Vui lòng nhập lương cơ bản!"
    ) &&
    validation.checkSalary(
      tienLuong,
      "tbLuongCB",
      "Vui lòng nhập lương từ 1.000.000 đến 20.000.000"
    );

  // check chức vụ
  isValid &= validation.checkSelect(
    "chucvu",
    "tbChucVu",
    "Vui lòng nhập chức vụ!"
  );

  // check giờ làm
  isValid &=
    validation.checkEmpty(giolam, "tbGiolam", "Vui lòng nhập giờ làm!") &&
    validation.checkGioLam(
      giolam,
      "tbGiolam",
      "Vui lòng nhập giờ làm từ 80 giờ đến 200 giờ"
    );

  if (!isValid) return null;

  const staff = new Staff(
    id,
    name,
    email,
    password,
    ngayLam,
    tienLuong,
    chucVu,
    giolam
  );

  staff.sumSalary();
  staff.loaiNhanVien();

  return staff;
};

//Add Staff
getEleId("btnThemNV").onclick = function () {
  const staff = getInfoStaff();

  if (!staff) return;

  //add staff to staffList
  staffList.addStaff(staff);

  console.log(staffList);

  //render staffList
  renderStaffList(staffList.arr);

  //set local storage
  setLocalStorage();

  // Close modal
  document.getElementsByClassName("close")[0].click();
};

//Render Staff
const renderStaffList = (data) => {
  let content = "";
  for (let i = 0; i < data.length; i++) {
    const staff = data[i];
    content += `
        <tr>
            <td>${staff.id}</td>
            <td>${staff.name}</td>
            <td>${staff.email}</td>
            <td>${staff.ngayLam}</td>
            <td>${staff.chucVu}</td>
            <td style="display: none">${staff.tienLuong}</td>    
            <td style="display: none">${staff.giolam}</td>        
            <td>${staff.tongLuong}</td>   
            <td>${staff.loaiNhanVien}</td>
            <td>
                  <button class="btn btn-info mb-2" data-toggle="modal" data-target="#myModal" onclick="handleEditStaff('${staff.id}')">Edit</button>
                  <button class="btn btn-danger" onclick="handleDeleteStaff('${staff.id}')" >Delete</button>
              </td>        
        </tr>
        `;
  }
  getEleId("tableDanhSach").innerHTML = content;
};

//Delete Staff
const handleDeleteStaff = (id) => {
  //Remove staff from staffList
  staffList.removeStaff(id);

  //render staffList
  renderStaffList(staffList.arr);

  //set local storage
  setLocalStorage();
};

// Khai báo handleDeleteFood là global function => window
window.handleDeleteStaff = handleDeleteStaff;

getEleId("btnThem").onclick = function () {
  getEleId("header-title").innerHTML = "Thêm Nhân Viên";
  getEleId("btnCapNhat").style.display = "none";
  getEleId("btnThemNV").style.display = "inline-block";

  //reset value form
  getEleId("staffForm").reset();

  // enable input foodID
  getEleId("tknv").removeAttribute("disabled");
};

getEleId("btnDong").onclick = function () {
  getEleId("tbTKNV").innerText = "";
  getEleId("tbTen").innerText = "";
  getEleId("tbEmail").innerText = "";
  getEleId("tbMatKhau").innerText = "";
  getEleId("tbNgay").innerText = "";
  getEleId("tbLuongCB").innerText = "";
  getEleId("tbChucVu").innerText = "";
  getEleId("tbGiolam").innerText = "";
};

let closeButton = document.getElementsByClassName("close");
for (let i = 0; i < closeButton.length; i++) {
  closeButton[i].addEventListener("click", function () {
    getEleId("tbTKNV").innerText = "";
    getEleId("tbTen").innerText = "";
    getEleId("tbEmail").innerText = "";
    getEleId("tbMatKhau").innerText = "";
    getEleId("tbNgay").innerText = "";
    getEleId("tbLuongCB").innerText = "";
    getEleId("tbChucVu").innerText = "";
    getEleId("tbGiolam").innerText = "";
  });
}

// Edit Staff
const handleEditStaff = (id) => {
  getEleId("header-title").innerHTML = "Cập Nhật Nhân Viên";
  getEleId("btnCapNhat").style.display = "inline-block";
  getEleId("btnThemNV").style.display = "none";

  const staff = staffList.editStaff(id);

  if (staff) {
    getEleId("tknv").value = staff.id;
    getEleId("tknv").setAttribute("disabled", true);
    getEleId("name").value = staff.name;
    getEleId("email").value = staff.email;
    getEleId("password").value = staff.password;
    getEleId("datepicker").value = staff.ngayLam;
    getEleId("luongCB").value = staff.tienLuong;
    getEleId("chucvu").value = staff.chucVu;
    getEleId("gioLam").value = staff.giolam;
  }
};

// Khai báo handleEditStaff là global function => window
window.handleEditStaff = handleEditStaff;

//Update Staff
getEleId("btnCapNhat").onclick = function () {
  // Get value from input
  const staff = getInfoStaff();

  // Update food to foodList
  staffList.updateStaff(staff);

  //render staffList
  renderStaffList(staffList.arr);

  //set local storage
  setLocalStorage();

  // Close modal
  document.getElementsByClassName("close")[0].click();
};

//Set Local Storage
const setLocalStorage = () => {
  const dataJSON = staffList.arr;
  //Convert dataJSON to string
  const dataString = JSON.stringify(dataJSON);
  //Save dataString to localStorage
  localStorage.setItem("STAFF_LIST", dataString);
};

//Get Local Storage
const getLocalStorage = () => {
  const dataString = localStorage.getItem("STAFF_LIST");
  // check dataString is null =>> return
  if (!dataString) return;

  // convert dataString to data JSON
  const dataJSON = JSON.parse(dataString);
  // update staffList.arr
  staffList.arr = dataJSON;
  // Render staff list
  renderStaffList(staffList.arr);
};
getLocalStorage();

// Search Staff
getEleId("searchName").addEventListener("keyup", function () {
  const keyword = getEleId("searchName").value;
  const staffsSearch = staffList.searchStaff(keyword);
  renderStaffList(staffsSearch);
});
