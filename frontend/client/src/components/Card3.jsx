import React, { useEffect, useState } from 'react';

const Card3 = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/card3');
        if (!res.ok) {
          throw new Error('Failed to fetch data.');
        }
        const result = await res.json();
        setData(result.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (itemId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/card3/delete/${itemId}`, {
        method: 'GET',
      });

      if (!res.ok) {
        throw new Error(`Failed to delete item. Server responded with status ${res.status}`);
      }

      // Update state to reflect the deletion
      setData((prevData) => prevData.filter((item) => item._id !== itemId));
    } catch (err) {
      console.error(err); // Log the error for debugging
      setError(err.message);
    }
  };

  return (
    <div className='card3'>
      <h2>Task List</h2>

      {error && <p className='error-message'>Error: {error.message}</p>}

      <ul>
        {data.map((item) => (
          <li key={item._id} className='list'>
            <div className='item-details'>
              <p>{`Username: ${item.username}`}</p>
              <p>{`Address: ${item.address}`}</p>
              <p>{`Contact: ${item.contact}`}</p>
              <p>{`Service: ${item.service}`}</p>
            </div>
            <button onClick={() => handleDelete(item._id)} className='btn-delete'>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Card3;
