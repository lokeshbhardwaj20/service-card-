import React, { useState } from 'react';

const Card2 = () => {
  const initialFormData = { username: '', contact: '', address: '', service: '' };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/card2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data.success) {
        console.error(data.message);
        // Handle error if needed
      } else {
        // Reset the form after successful submission
        setFormData(initialFormData);
      }
    } catch (error) {
      console.error(error);
      // Handle network or unexpected errors
    }
  };

  return (
    <div className='card2'>
      <h3>Add Task</h3>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Username'
          name='username'
          id='username'
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type='tel'
          placeholder='Contact'
          name='contact'
          id='contact'
          value={formData.contact}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Address'
          name='address'
          id='address'
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Service'
          name='service'
          id='service'
          value={formData.service}
          onChange={handleChange}
        />
        <button type='submit' className='addBtn'>
          Add Service
        </button>
      </form>
    </div>
  );
};

export default Card2;
