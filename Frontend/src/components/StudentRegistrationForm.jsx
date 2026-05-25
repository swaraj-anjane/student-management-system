import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../services/axiosInstance";

const courses = [
  "frontend",
  "backend",
  "devops",
  "mern stack",
  "digital marketing",
];

export default function StudentRegistrationForm({ setStudentList }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  async function registerStudent(studentData) {
    try {

          const formData = new FormData();
        formData.append("name", studentData.name);
    formData.append("course", studentData.course);
    formData.append("contact", studentData.contact);
    formData.append("studentImage", studentData.studentImage[0]);
        console.log("Registering student:", studentData);

    const response = await axiosInstance.post("/student", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
      console.log(response.data);
      reset();
      setStudentList(prev => [...prev, studentData]);
      alert(response.data.messsage);
    } catch (error) {
      alert("Error registering student:", error);
    }
  }

  return (
    <div className="max-w-md flex-1 mx-auto mt-10 p-6 bg-black shadow-lg rounded-2xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Student Registration
      </h2>

      <form onSubmit={handleSubmit(registerStudent)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 text-sm font-medium">Name</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Minimum 3 characters required",
              },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Course */}
        <div>
          <label className="block mb-1 text-sm font-medium">Course</label>
          <select
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("course", {
              required: "Course is required",
            })}>
            <option value="">Select course</option>
            {courses.map(course => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
          {errors.course && (
            <p className="text-red-500 text-sm mt-1">{errors.course.message}</p>
          )}
        </div>

        {/* Contact */}
        <div>
          <label className="block mb-1 text-sm font-medium">Contact</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter contact number"
            {...register("contact", {
              required: "Contact is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter valid 10 digit number",
              },
            })}
          />
          {errors.contact && (
            <p className="text-red-500 text-sm mt-1">
              {errors.contact.message}
            </p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Image URL (optional)
          </label>
          <input
            type="file"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter image URL"
            {...register("studentImage", {
              pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
                message: "Enter valid image URL",
              },
            })}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50">
          {isSubmitting ? "Submitting..." : "Register"}
        </button>
      </form>
    </div>
  );
}
