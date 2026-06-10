


import React, { useState } from "react";
import StudentRegistrationForm from "../components/StudentRegistrationForm";
import StudentTable from "../components/StudentTable";

const ManageStudentPage = () => {
const [studentList, setStudentList] = useState([]);
  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("loginStatus");
      localStorage.removeItem("token");
      window.location.replace("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white p-6 pt-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8  border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-4xl font-bold">Student Information System</h1>
          <p className="text-slate-400 mt-1">
            Manage student records efficiently
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-4 md:mt-0 bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-lg font-medium">
          Logout
        </button>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="xl:col-span-1">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-lg p-5">
            <StudentRegistrationForm setStudentList={setStudentList} />
          </div>
        </div>

        {/* Table Section */}
        <div className="xl:col-span-2">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-lg p-5">
            <StudentTable
              setStudentList={setStudentList}
              studentList={studentList}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageStudentPage;