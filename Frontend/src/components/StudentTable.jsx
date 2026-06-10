import React, { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

const StudentTable = ({ studentList, setStudentList }) => {
  async function fetchAllStudentDetailsAPI() {
    try {
      const response = await axiosInstance.get("/student");
      setStudentList(response.data.data);
      alert(response.data.message);
    } catch (error) {
      setStudentList([]);
      alert("failed to fetch student details");
    }
  }

  useEffect(() => {
    fetchAllStudentDetailsAPI();
  }, []);


  

  async function deleteStudentDetailsAPI(studentId) {
    try {
     const response =  await axiosInstance.delete(`/student/remove/${studentId}`);
      const isConfirmed = confirm(
        "Are you sure you want to delete this student?",
      );

      if (!isConfirmed) return;
        //  alert(response.data.message);


      setStudentList(prev => prev.filter(student => student._id !== studentId));
    } catch (error) {
      alert(error.message);
     }
  }

  
           
return (
  <div>
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Student Records</h2>
        <p className="text-slate-400 text-sm">
          Total Students: {studentList?.length || 0}
        </p>
      </div>
    </div>

    {/* Table Container */}
    <div className="overflow-x-auto rounded-2xl border border-slate-800 flex items-center justify-center">
      <table className="w-full text-left">
        <thead className="bg-slate-950">
          <tr className="border-b border-slate-800 ">
            <th className="p-4 text-slate-300 text-center">Photo</th>
            <th className="p-4 text-slate-300 text-center">Name</th>
            <th className="p-4 text-slate-300 text-center ">Course</th>
            <th className="p-4 text-slate-300 text-center">Contact</th>
            <th className="p-4 text-slate-300 text-center">Status</th>
            <th className="p-4 text-slate-300 text-center">Registered</th>
            <th className="p-4 text-slate-300 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {studentList?.length > 0 ?
            studentList.map(student => (
              <tr
                key={student._id}
                className="border-b border-slate-800 hover:bg-slate-900 transition text-center">
                <td className="p-4 ">
                  <div className="flex justify-center items-center">
                    <img
                      src={student?.image}
                      alt={student?.name}
                      className="w-12 h-12 rounded-full object-cover border border-slate-700"
                    />{" "}
                  </div>
                </td>

                <td className="p-4 font-medium text-white">{student?.name}</td>

                <td className="p-4 text-slate-300 capitalize">
                  {student?.course}
                </td>

                <td className="p-4 text-slate-300">{student?.contact}</td>

                <td className="p-4">
                  {student?.isActive ?
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs">
                      Active
                    </span>
                  : <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs">
                      Inactive
                    </span>
                  }
                </td>

                <td className="p-4 text-slate-400">
                  {student?.createdAt ?
                    new Date(student.createdAt).toLocaleDateString()
                  : "-"}
                </td>

                <td className="p-4">
                  <div className="flex gap-3 items-center justify-center">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm">
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        console.log("Student:", student);
                        console.log("ID:", student?._id);

                        deleteStudentDetailsAPI(student?._id);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          : <tr>
              <td colSpan="7" className="text-center py-10 text-slate-500">
                No Students Found
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  </div>
);
};

export default StudentTable;
