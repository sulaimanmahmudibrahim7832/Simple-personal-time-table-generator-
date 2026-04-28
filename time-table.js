//console.log("hello worlds ");
const addButton = document.querySelector('.add-button');
const courseName = document.querySelector(".courseName");
const courseCode = document.querySelector(".courseCode");
const day = document.querySelector(".selectDay");
const fromTime = document.querySelector(".fromTime");
const toTime = document.querySelector(".toTime");
const tBody = document.querySelector('.display-row');
const Wdiv = document.querySelector(".warning-area");
const stdName = document.querySelector(".name");
const stdPicture = document.querySelector(".std-picture");
const date = document.querySelector('.date');
const stdDepartment = document.querySelector(".department");
const stdFaculty = document.querySelector(".faculty");
const stdInstitution = document.querySelector('.institution');
const printbtn = document.querySelector('.print');
const reportData = document.querySelector('.report-table');
const studentDs = document.querySelector('.student-details');
const finishWdiv = document.querySelector('.finish-warning');
const finishBtn = document.querySelector('.finish');
const modifyBtn = document.querySelector('.modify');
const editView = document.querySelector('.edit-view');
const printView = document.querySelector('.printed-view');

const courses = [
  /*{
  courseName: "Mathematical methods ",
  courseCode: "MTH101",
  day: "Monday",
  fromTime: "10:00AM",
  toTime:"12:00PM"
},
  {
   courseName: "Mechanics ",
 courseCode: "PHY101",
 day: "Monday",
 fromTime: "12:00AM",
 toTime:"1:00PM"
}*/
];
const saved = localStorage.getItem("courses");

//console.log(finishWdiv);
//console.log(reportData);
let preview;
stdPicture.addEventListener('change', () => {
  const file = stdPicture.files[0];
  const img = document.querySelector('.preview');
  if (!file) {
    return;
  }
  let tempURL = URL.createObjectURL(file);
  img.src = tempURL;
  preview = tempURL;
  //console.log(preview);
});
printbtn.addEventListener('click', () => {
  window.print();
});
//console.log(stdName, date, stdDepartment, stdFaculty, stdInstitution);
//console.log(editView, printView);
let isClick = "no";
printView.style.display = "none";


finishBtn.addEventListener('click', () => {
  //console.log(courses.length);
  const studentDetails = {
    name: stdName.value,
    stdPicture: preview,
    date: date.value,
    department: stdDepartment.value,
    faculty: stdFaculty.value,
    instution: stdInstitution.value
  }
  let isFound = studentDetails.name !== '' && studentDetails.date !== '' && studentDetails.
    instution !== '' && studentDetails.department !== '' && studentDetails.
      faculty !== '' && courses.length > 0 && preview !== undefined;
  if(isFound) {
    studentDs.innerHTML =
      `
    <div class="time-table-info">
<h1>   personal time table </h1>
<p class="user-date">Date: ${studentDetails.date}</p>
<div class="user-account">
<div class="user-profile">
<img class="user-image" src="${studentDetails.stdPicture}">
<p> <i>${studentDetails.name}</i></p>
</div>
<div class="user-profile-data">
  <h4> Institution:${studentDetails.instution} </h4>
  <h4>Department: ${studentDetails.department} </h4>
  <h4>Faculty: ${studentDetails.faculty}</h4>
</div>
</div>


  `;
    const report = {
      studentInfo: studentDetails,
      timeTableInfo: courses
    }
    let tableHTML = '';
    report.timeTableInfo.forEach((course) => {
      tableHTML += `
    <tr>
      <td>${course.courseName}</td>
      <td> ${course.courseCode}</td>
      <td>${course.day} </td>
      <td>${course.fromTime} to ${course.toTime}</td>
    </tr>
    `;
    });
    reportData.innerHTML = tableHTML;
    isClick = "yes";
    if (isClick === "yes") {
      editView.style.display = 'none';
      printView.style.display = "flex";
    }
    else {
      editView.style.display = "flex";
      printView.style.display = "none";
    }
  }
  else {
  finishWdiv.innerHTML = `please fill up the students-details  and atleast one course to continue   `;
    if (!isFound) {
      finishWdiv.style.display = 'block';
setTimeout(() => {
  finishWdiv.style.display = "none";
},3000) 
    }
    else {
      finishWdiv.style.display = "block";
    }
  }

});

modifyBtn.addEventListener('click', ()=> {
    
  isClick = "no";
   if (isClick === "yes") {
   editView.style.display = 'none';
  printView.style.display = "inline-block";
 }
 else {
   editView.style.display = "inline-block";
   printView.style.display = "none";
 }
});

function getUserData() {
  let details = {
  courseName: courseName.value,
  courseCode: courseCode.value,
  day: day.value,
  fromTime: fromTime.value,
  toTime: toTime.value
}
  courses.push(details);
  localStorage.setItem("courses", JSON.stringify(courses));
  return courses
}
function clearUserData() {
  courseName.value = '';
  courseCode.value = '';
  day.value = 'select day',
    fromTime.value = '';
  toTime.value = '';
}
function generateTable() {
    let html = '';
   courses.forEach((row, index) => {
   
 html += `
 <tr data-index="${index}">
 <td>${row.courseName}</td>
 <td> ${row.courseCode}</td>
 <td>${row.day}</td>
 <td>${row.fromTime} to ${row.toTime}</td>
 <td>
  <button class="delete-btn" >delete</button>
  </td>
 </tr>
 


 `;
   });
  return html 
}
function validData() {
  let isValidate = false;
  if (courseName.value !== '' && courseCode.value !== '' && day.value !== "select day" && fromTime.value  !== '' && toTime.value !== '') {
    isValidate = true;
  } else {
    isValidate = false;
  }
  return isValidate;
}
function renderTable() {
  let html = generateTable();
   document.querySelector('.display-row').innerHTML = html; 
}
function deleteTable() {
  tBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const row = e.target.closest('tr');
    let index = Number(row.dataset.index);
    courses.splice(index, 1);
    localStorage.setItem("courses", JSON.stringify(courses));
    renderTable();
  }
});
}
deleteTable();
addButton.addEventListener('click', () => {  
  let isValidate = validData();
  if (isValidate) {
    getUserData();  
    clearUserData();
    renderTable();
    
  } else {
     if (!isValidate) {
       Wdiv.style.display = "block";
       Wdiv.innerHTML = 'Please fill the all inputs to continue ';
       setTimeout(() => {
         Wdiv.style.display = "none";
       },3000)
     }
     else {
       Wdiv.style.display = "block";
     }
  }
  
  
});
if (saved) {
  courses.push(...JSON.parse(saved));
  renderTable();
}
