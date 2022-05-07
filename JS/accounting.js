"use strict";

let allEmployees = [];

let tableEl = document.getElementById("accountingTable");
function Employee(id, name, department, level, image, salary) {
  this.employeeId = id;
  this.employeeName = name;
  this.employeeDepartment = department;
  this.employeeLevel = level;
  this.employeeImage = image;
  this.employeeSalary = salary;
  allEmployees.push(this);
  createTableData(department, Number.parseFloat(salary));
}

const tableData = {};

function createTableData(department, salary) {
  if (!tableData[department]) {
    tableData[department] = {
      employeeCount: 1,
      salaryTotal: salary,
      salaryAvg: salary,
    };
  } else {
    let employeeCount = tableData[department].employeeCount;
    let salaryTotal = tableData[department].salaryTotal;
    tableData[department].employeeCount = employeeCount + 1;
    tableData[department].salaryTotal = salaryTotal + salary;
    tableData[department].salaryAvg = tableData[department].salaryTotal / (employeeCount + 1);
  }
}

Employee.prototype.renderTable = function () {
  let employeeCount = 0;
  let employeeSalary = 0;

  for (const [employeeDepartment, values] of Object.entries(tableData)) {
    let tableRaw = document.createElement("tr");
    tableEl.appendChild(tableRaw);

    let empName = document.createElement("td");
    empName.textContent = employeeDepartment;
    tableRaw.appendChild(empName);

    let numOfEmployee = document.createElement("td");
    numOfEmployee.textContent = values.employeeCount;
    tableRaw.appendChild(numOfEmployee);

    let salaryAvg = document.createElement("td");
    salaryAvg.textContent = values.salaryTotal;
    tableRaw.appendChild(salaryAvg);

    let salaryTotal = document.createElement("td");
    salaryTotal.textContent = values.salaryAvg;
    tableRaw.appendChild(salaryTotal);

    employeeCount += values.employeeCount;
    employeeSalary += values.salaryTotal;
  }

  let total = document.createElement("td");
  total.textContent = "Total";
  total.classList = "total";
  tableEl.appendChild(total);

  let mainSalary = document.createElement("td");
  mainSalary.textContent = employeeCount;
  mainSalary.classList = "total";
  tableEl.appendChild(mainSalary);

  let totalSalary = document.createElement("td");
  totalSalary.textContent = employeeSalary;
  totalSalary.classList = "total";
  tableEl.appendChild(totalSalary);

  let avgSalary = document.createElement("td");
  avgSalary.textContent = employeeSalary / employeeCount;
  avgSalary.classList = "total";
  tableEl.appendChild(avgSalary);
};

new Employee(1000, "Ghazi Samer", "Administration", "Senior", "../assets/2.jpeg");
new Employee(1001, "Lana Ali", "Finance", "Senior", "../assets/1.jpeg");
new Employee(1002, "Tamara Ayoub", "Marketing", "Senior", "../assets/5.jpeg");
new Employee(1003, "Safi Walid", "Administration", "Mid-Senior", "../assets/3.jpeg");
new Employee(1004, "Omar Zaid", "Development", "Senior", "../assets/4.jpeg");
new Employee(1005, "Rana Saleh", "Development", "Junior", "../assets/6.jpeg");
new Employee(1006, "Hadi Ahmad", "Finance", "Mid-Senior", "../assets/7.jpeg");

function getData() {
  let reData = localStorage.getItem("employeeItem");
  let dataArray = JSON.parse(reData);

  if (dataArray != null) {
    for (let i = 0; i < dataArray.length; i++) {
      new Employee(dataArray[i].id, dataArray[i].name, dataArray[i].department, dataArray[i].level, dataArray[i].image, dataArray[i].salary);
    }
  }
  allEmployees[0].renderTable();
}
getData();