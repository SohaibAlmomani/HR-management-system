"use strict";

let employeeArray = [];

function Employee(Id, name, department, level, image, salary) {
  this.employeeId = Id;
  this.employeeName = name;
  this.employeeDepartment = department;
  this.employeeLevel = level;
  this.employeeImage = `../assets/${Id}.jpg`;
  this.employeeSalary = salary;
  employeeArray.push(this);
}

Employee.prototype.salary = function () {
  if (this.level == "Senior") {
    return Math.floor(Math.random() * (2000 - 1500) + 1500);
  } else if (this.level == "Mid-Senior") {
    return Math.floor(Math.random() * (1500 - 1000) + 1000);
  } else if (this.level == "Junior") {
    return Math.floor(Math.random() * (1000 - 500) + 500);
  }
};

Employee.prototype.render = function () {
  console.log(this.employeeName);
  document.write(`<h1>The Id ${this.d} and the name is ${this.employeeName}<h/>`);
};

new Employee(1000, "Ghazi Samer", "Administration", "Senior", "../assets/2.jpeg");
new Employee(1001, "Lana Ali", "Finance", "Senior", "../assets/1.jpeg");
new Employee(1002, "Tamara Ayoub", "Marketing", "Senior", "../assets/5.jpeg");
new Employee(1003, "Safi Walid", "Administration", "Mid-Senior", "../assets/3.jpeg");
new Employee(1004, "Omar Zaid", "Development", "Senior", "../assets/4.jpeg");
new Employee(1005, "Rana Saleh", "Development", "Junior", "../assets/6.jpeg");
new Employee(1006, "Hadi Ahmad", "Finance", "Mid-Senior", "../assets/7.jpeg");


const idGenerate = (employee) => {
  let idArray = employee.map((ele) => ele.d);
  do {
    for (let i = 0; i < idArray.length; i++) {
      if (idArray[i] < 1000 || idArray[i] > 9999) {
        employee[i].d = Math.floor(Math.random() * (9999 - 1000) + 1000);
      }
    }
  } while (idArray == [...new Set(idArray)]);
};

