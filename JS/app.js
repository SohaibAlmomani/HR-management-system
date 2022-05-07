"use strict";

let employeeArray = [];
let submit = document.querySelector("#btn");
let main = document.querySelector(".employeeList");
let employeeForm = document.querySelector(".employeeCard");

function Employee(Id, name, department, level, image) {
  this.employeeId = Id;
  this.employeeName = name;
  this.employeeDepartment = department;
  this.employeeLevel = level;
  this.employeeImage = image;
  employeeArray.push(this);
}

Employee.prototype.generateEmployeeId = function () {
  this.employeeId = Math.floor(Math.random() * 1000 + 1000);
};

Employee.prototype.salary = function () {
  if (this.level == "Senior") {
    return Math.floor(Math.random() * (2000 - 1500) + 1500);
  } else if (this.level == "Mid-Senior") {
    return Math.floor(Math.random() * (1500 - 1000) + 1000);
  } else if (this.level == "Junior") {
    return Math.floor(Math.random() * (1000 - 500) + 500);
  }
};

new Employee(1000, "Ghazi Samer", "Administration", "Senior", "../assets/2.jpeg");
new Employee(1001, "Lana Ali", "Finance", "Senior", "../assets/1.jpeg");
new Employee(1002, "Tamara Ayoub", "Marketing", "Senior", "../assets/5.jpeg");
new Employee(1003, "Safi Walid", "Administration", "Mid-Senior", "../assets/3.jpeg");
new Employee(1004, "Omar Zaid", "Development", "Senior", "../assets/4.jpeg");
new Employee(1005, "Rana Saleh", "Development", "Junior", "../assets/6.jpeg");
new Employee(1006, "Hadi Ahmad", "Finance", "Mid-Senior", "../assets/7.jpeg");

Employee.prototype.render = function () {
  console.log(this.employeeName);
  document.write(`<h3>ID : ${this.employeeId} ,Name : ${this.employeeName} <h3/>` < br > `Department : ${this.employeeDepartment}, Level : ${this.employeeLevel}`);
};

if (localStorage.getItem("data") == null) {
  localStorage.setItem("data", JSON.stringify(employeeArray));
}

const setLocalStorage = (ele) => {
  let setter = JSON.parse(localStorage.getItem("data"));
  setter.push(ele);
  localStorage.setItem("data", JSON.stringify(setter));
};

const arrayEmployeeFilter = [];

const getLocalStorageData = JSON.parse(localStorage.getItem("data"));
for (let index = 0; index < getLocalStorageData.length; index++) {
  let newEmployee = new Employee(getLocalStorageData[index].employeeId, getLocalStorageData[index].employeeName, getLocalStorageData[index].employeeDepartment, getLocalStorageData[index].employeeLevel, getLocalStorageData[index].employeeImage);
  arrayEmployeeFilter.push(newEmployee);
}


Employee.prototype.render = function () {
  let div = document.createElement("div");
  let childDiv = document.createElement("div");
  let employeeImage = document.createElement("img");
  let employeeId = document.createElement("h4");
  let employeeName = document.createElement("h4");
  let employeeDepartment = document.createElement("h3");
  let employeeLevel = document.createElement("h3");
  let employeeSalary = document.createElement("h2");
  employeeImage.setAttribute("src", this.employeeImage);
  employeeName.textContent = `Employee: ${this.employeeName}`;
  employeeId.textContent = `ID: ${this.employeeId}`;
  employeeDepartment.textContent = `Department: ${this.employeeDepartment}`;
  employeeLevel.textContent = `Level: ${this.employeeLevel}`;
  employeeSalary.textContent = `Salary: ${this.salary()}`;
  childDiv.appendChild(employeeId);
  childDiv.appendChild(employeeName);
  childDiv.appendChild(employeeLevel);
  childDiv.appendChild(employeeDepartment);
  childDiv.appendChild(employeeSalary);
  div.appendChild(employeeImage);
  div.appendChild(childDiv);
  div.classList.add("employeeCard");
  return div;
};

submit.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(employeeForm);
  let employeeName = event.target.form[0].value;
  let employeeDepartment = event.target.form[1].value;
  let employeeLevel = event.target.form[2].value;
  let employeeImage = event.target.form[3].value;
  let newEmployee = new Employee(0, employeeName, employeeDepartment, employeeLevel, employeeImage);
  newEmployee.generateEmployeeId();
  employeeArray.push(newEmployee);
  setLocalStorage(newEmployee);
  main.appendChild(newEmployee.render());
});

const initialRender = () => {
  console.log(employeeArray);
  employeeArray.map((employee) => {
    console.log(employeeArray);
    main.appendChild(employee.render());
  });
};

initialRender();


let filteredData = (event) => {
  main.innerHTML = "";
  arrayEmployeeFilter
    .filter((ele) => {
      return ele.employeeDepartment == event.target.value;
    })
    .forEach((ele) => {
      main.appendChild(ele.render());
    });

  event.target.value == "allDepartment"
    ? arrayEmployeeFilter.forEach((ele) => {
        main.appendChild(ele.render());
      })
    : "";
};
