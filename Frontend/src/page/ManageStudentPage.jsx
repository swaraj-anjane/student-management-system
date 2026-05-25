import React, { useState } from "react";
import StudentRegistrationForm from "../components/StudentRegistrationForm"
import StudentTable from "../components/StudentTable";

const ManageStudentPage = () => {
  const [studentList, setStudentList] = useState();


const handleLogout =()=>{
  if(confirm("are you are to logout")){

  }
  localStorage.removeItem("loginStatus")
  localStorage.removeItem("token")
  window.location.replace("/login")
}

  return (
    <div>
      <div className="flex items-center justify-center gap-3">
        <h1>Manage Students (SIS)</h1>
        <button onClick={handleLogout} className="bg-red-600 text-white rounded-md px-4 py-1">logout</button>
      </div>

      <div className="flex w-full gap-2">
        <StudentRegistrationForm setStudentList={setStudentList} />
        <div className="flex-1">
          {/* //table to show all students */}
          <StudentTable
            setStudentList={setStudentList}
            studentList={studentList}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageStudentPage;
