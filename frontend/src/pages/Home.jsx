import React, { useState, useEffect } from 'react';

function Home() {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem('loggedInUser') || '';
    const email = localStorage.getItem('email') || '';
    setUserDetails({ name, email });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem('loggedInUser', userDetails.name);
    localStorage.setItem('email', userDetails.email);
    setIsEditing(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome, {userDetails.name}</h1>

      {isEditing ? (
        <>
          <div>
            <label>Name: </label>
            <input name="name" value={userDetails.name} onChange={handleChange} />
          </div>
          <div>
            <label>Email: </label>
            <input name="email" value={userDetails.email} onChange={handleChange} />
          </div>
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <p><strong>Name:</strong> {userDetails.name}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );
}

export default Home;
