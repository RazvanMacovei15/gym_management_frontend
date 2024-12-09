import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import { useEffect } from "react";
import axios from "axios";


export default function AddTaskModal({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    category: "",
    // title: "",
    description: "",
    deadline: "",
    priority: "",
    subcategory: "",
    gyms: [],
    users: [],
  });

  const [users, setUsers] = useState([]);
  const getUsers = async() =>{
    const response = await axios.get("http://maco-coding.go.ro:8010/api/users/managers");
    return setUsers(response.data);
  } 

  const [gyms, setGyms] = useState([]);
  const getGyms = async() =>{
    const response = await axios.get("http://maco-coding.go.ro:8010/gyms/all");
    return setGyms(response.data);
  } 

  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://maco-coding.go.ro:8010/api/enum/category");
      console.log("Fetched Categories:", response.data); // Log to verify data
      setCategories(response.data); // Update state with categories
    } catch (error) {
      console.error("Failed to fetch categories:", error); // Log any errors
    }
  };

  const [subcategories, setSubcategories] = useState([]);
  const fetchSubcategories = async () => {
    try {
      const response = await axios.get("http://maco-coding.go.ro:8010/api/enum/subcategory");
      console.log("Fetched Subcategories:", response.data); // Log to verify data
      setSubcategories(response.data); // Update state with categories
    } catch (error) {
      console.error("Failed to fetch Subcategories:", error); // Log any errors
    }
  };

  // Handle input change for non-multiselect fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Multi-select dropdown handlers
  const handleSelectUsers = (selectedList) => {
    setFormData({ ...formData, users: selectedList });
  };

  const handleSelectGyms = (selectedList) => {
    setFormData({ ...formData, gyms: selectedList });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Extract only names for multi-select fields
    const selectedUsers = formData.users.map((user) => user.name);
    const selectedGyms = formData.gyms.map((gym) => gym.name);

    // Pass formatted data to parent component
    onSubmit({ ...formData, users: selectedUsers, gyms: selectedGyms });

    console.log("Form Data:", formData);
    console.log("Selected Users:", selectedUsers);
    console.log("Selected Gyms:", selectedGyms);
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
    getUsers();
    getGyms();

  }, []);


  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Close modal when clicking outside the content
    >
      <div
        className="bg-white rounded-lg p-8 w-11/12 max-w-lg shadow-lg transform transition-all"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Categories */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Select Category</option>
                {categories.map((cat, index) => (
                <option key={index} value={cat}>
                    {cat}
                </option>
                ))}
            </select>
          </div>
          
          {/* Subcategories */}
            <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                Subcategory
                </label>
                <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                required
                >
                <option value="">Select Subcategory</option>
                    {subcategories.map((subcat, index) => (
                    <option key={index} value={subcat}>
                        {subcat}
                    </option>
                    ))}
                </select>
            </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={"formData.title"}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
              placeholder="Enter task title..."
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
              placeholder="Enter task description..."
              required
            ></textarea>
          </div>

          {/* Users */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Users
            </label>
            <Multiselect
              options={users}
              selectedValues={formData.users}
              onSelect={handleSelectUsers}
              onRemove={handleSelectUsers}
              displayValue="name"
              placeholder="Select Users"
              className="w-full border rounded-lg shadow-sm"
              style={{}}
            />
          </div>

          {/* Gyms */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Gyms
            </label>
            <Multiselect
              options={gyms}
              selectedValues={formData.gyms}
              onSelect={handleSelectGyms}
              onRemove={handleSelectGyms}
              displayValue="name"
              placeholder="Select Gyms"
              className="w-full border rounded-lg shadow-sm"
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
            >
              <option value="">Select Priority</option>
              <option value="Urgent">Urgent</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"

            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-4 rounded-lg w-full hover:shadow-xl transform hover:scale-105 transition duration-300"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
