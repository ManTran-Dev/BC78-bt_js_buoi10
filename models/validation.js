import { getEleId } from "./../controllers/main.js";

class Validation {
  checkEmpty(value, divId, mess) {
    if (value === "") {
      getEleId(divId).innerHTML = mess;
      getEleId(divId).style.display = "block";
      return false;
    }
    getEleId(divId).style.display = "none";
    getEleId(divId).innerHTML = "";
    return true;
  }

  checkSelect(idSelect, divId, mess) {
    if (getEleId(idSelect).selectedIndex === 0) {
      getEleId(divId).innerHTML = mess;
      getEleId(divId).style.display = "block";
      return false;
    }
    getEleId(divId).style.display = "none";
    getEleId(divId).innerHTML = "";
    return true;
  }

  checkCharacterString(value, divId, mess) {
    const letter = "^[A-Za-z]+$";
    if (value.match(letter)) {
      getEleId(divId).style.display = "none";
      getEleId(divId).innerHTML = "";
      return true;
    }
    getEleId(divId).innerHTML = mess;
    getEleId(divId).style.display = "block";
    return false;
  }

  checkID(value, divId, mess) {
    const letter = /^\w{4,6}$/;
    if (value.match(letter)) {
      getEleId(divId).style.display = "none";
      getEleId(divId).innerHTML = "";
      return true;
    }
    getEleId(divId).innerHTML = mess;
    getEleId(divId).style.display = "block";
    return false;
  }

  checkName(value, divId, mess) {
    const letter = /^[A-Za-zÀ-Ỹà-ỹ\s]+$/;
    if (value.match(letter)) {
      getEleId(divId).style.display = "none";
      getEleId(divId).innerHTML = "";
      return true;
    }
    getEleId(divId).innerHTML = mess;
    getEleId(divId).style.display = "block";
    return false;
  }

  checkEmail(value, divId, mess) {
    const letter = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
    if (value.match(letter)) {
      getEleId(divId).style.display = "none";
      getEleId(divId).innerHTML = "";
      return true;
    }
    getEleId(divId).innerHTML = mess;
    getEleId(divId).style.display = "block";
    return false;
  }

  checkPassword(value, divId, mess) {
    const letter =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/-]).{6,10}$/;
    if (value.match(letter)) {
      getEleId(divId).style.display = "none";
      getEleId(divId).innerHTML = "";
      return true;
    }
    getEleId(divId).innerHTML = mess;
    getEleId(divId).style.display = "block";
    return false;
  }

  checkdatePicker(value, divId, mess) {
    const letter = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (value.match(letter)) {
      getEleId(divId).style.display = "none";
      getEleId(divId).innerHTML = "";
      return true;
    }
    getEleId(divId).innerHTML = mess;
    getEleId(divId).style.display = "block";
    return false;
  }

  checkSalary(value, divId, mess) {
    const letter = /^([1-9]\d{6}|[1]\d{7}|20000000)$/;
    if (value.match(letter)) {
      getEleId(divId).style.display = "none";
      getEleId(divId).innerHTML = "";
      return true;
    }
    getEleId(divId).innerHTML = mess;
    getEleId(divId).style.display = "block";
    return false;
  }
  checkGioLam(value, divId, mess) {
    const letter = /^([8-9][0-9]|1[0-9]{2}|200)$/;
    if (value.match(letter)) {
      getEleId(divId).style.display = "none";
      getEleId(divId).innerHTML = "";
      return true;
    }
    getEleId(divId).innerHTML = mess;
    getEleId(divId).style.display = "block";
    return false;
  }

  checkIdExist(value, divId, mess, listStaff) {
    let isExist = false;
    for (let i = 0; i < listStaff.length; i++) {
      const staff = listStaff[i];
      if (staff.id === value) {
        isExist = true;
        break;
      }
    }
    if (isExist) {
      // id tồn tại => không hợp lệ
      getEleId(divId).innerHTML = mess;
      getEleId(divId).style.display = "block";
      return false;
    }
    getEleId(divId).style.display = "none";
    getEleId(divId).innerHTML = "";
    return true;
  }
}

export default Validation;
