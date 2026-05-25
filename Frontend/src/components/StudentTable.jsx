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
      const response = await axiosInstance.delete(`/student/remove/${studentId}`);
      console.log("delete response", response.data);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>profile photo</th>
            <th>name</th>
            <th>course</th>
            <th>contact</th>
            <th>active status</th>
            <th>registed on</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(studentList) &&
            studentList.map((student, idx) => (
              <tr key={idx}>
                <td>
                  <img
                    className="size-12 rounded-lg"
                    src={student?.image}
                    alt="name"
                  />
                </td>
                <td>{student?.name}</td>
                <td>{student?.course}</td>
                <td>{student?.contact}</td>
                <td>
                  {student?.isActive ? (
                    <span className="rounded-full text-center bg-green-600 text-white px-3">
                      active
                    </span>
                  ) : (
                    "deactive"
                  )}
                </td>
                <td>{student?.createdAt}</td>
                <td>
                  <div>
                    <button
                      onClick={() =>{
                        console.log(student.name, " ", student?._id)
                        deleteStudentDetailsAPI(student?._id)
                      }
                      }
                    >
                      delete
                    </button>
                    <button>update</button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
