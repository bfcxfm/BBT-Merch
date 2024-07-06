// In BBT-Merch/src/components/EditUserForm.jsx
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateUserDetails } from '../api/users';

export default function EditUserForm({ token, userId, initialUserData, onClose }) {
  const [userData, setUserData] = useState(initialUserData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserDetails(token, userId, userData);
      onClose(); // Close the form/modal after successful update
    } catch (error) {
      console.error('Failed to update user details', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="name"
        value={userData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <Input
        name="email"
        value={userData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {/* Add other fields as necessary */}
      <Button type="submit">Update User</Button>
    </form>
  );
}