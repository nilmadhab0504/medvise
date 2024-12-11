// app/add-user/page.tsx

'use client';

import { useState } from 'react';

const AddUserPage = () => {
  const [adminData, setAdminData] = useState({ name: '', email: '', password: '' });
  const [doctorData, setDoctorData] = useState({
    name: '',
    email: '',
    password: '',
    specialization: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleDoctorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const handleSubmitAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminData),
      });
      const data = await response.json();
      if (response.status === 201) {
        setSuccess('Admin added successfully');
        setAdminData({ name: '', email: '', password: '' });
      } else {
        setError(data.error || 'Error adding admin');
      }
    } catch (err) {
      setError('Error adding admin');
    }
  };

  const handleSubmitDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doctorData),
      });
      const data = await response.json();
      if (response.status === 201) {
        setSuccess('Doctor added successfully');
        setDoctorData({ name: '', email: '', password: '', specialization: '' });
      } else {
        setError(data.error || 'Error adding doctor');
      }
    } catch (err) {
      setError('Error adding doctor');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Add User</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}

      <form onSubmit={handleSubmitAdmin} className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Admin</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={adminData.name}
          onChange={handleAdminChange}
          required
          className="w-full p-2 border mb-4"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={adminData.email}
          onChange={handleAdminChange}
          required
          className="w-full p-2 border mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={adminData.password}
          onChange={handleAdminChange}
          required
          className="w-full p-2 border mb-4"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white">
          Add Admin
        </button>
      </form>

      <form onSubmit={handleSubmitDoctor}>
        <h2 className="text-xl font-semibold mb-4">Add Doctor</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={doctorData.name}
          onChange={handleDoctorChange}
          required
          className="w-full p-2 border mb-4"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={doctorData.email}
          onChange={handleDoctorChange}
          required
          className="w-full p-2 border mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={doctorData.password}
          onChange={handleDoctorChange}
          required
          className="w-full p-2 border mb-4"
        />
        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={doctorData.specialization}
          onChange={handleDoctorChange}
          required
          className="w-full p-2 border mb-4"
        />
        <button type="submit" className="w-full p-2 bg-green-500 text-white">
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
