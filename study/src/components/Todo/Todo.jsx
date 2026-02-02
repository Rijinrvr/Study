import React, { useEffect, useState } from "react";
import "./Todo.css";

function Todo() {
  const [data, setData] = useState([]);
  const [addedData, setAddedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setData(json.slice(0, 4)); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
        setLoading(false);
      });
  }, []);

  const handleAdd = (id) => {
    const selectedItem = data.find((item) => item.id === id);
    setAddedData([...addedData, selectedItem]);
    setData(data.filter((item) => item.id !== id));
  };

  const handleDelete = (id) => {
    const selectedItemFromDelete = addedData.find((item) => item.id === id);
    setData([...data, selectedItemFromDelete]);
    setAddedData(addedData.filter((item) => item.id !== id));
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading todos...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="main-title">Todo Manager</h1>

      <div className="section">
        <h2 className="section-title">Available Todos ({data.length})</h2>
        {data.length === 0 ? (
          <p className="empty-state">
            No available todos. All items have been added!
          </p>
        ) : (
          <div className="grid">
            {data.map((item) => (
              <div key={item.id} className="card">
                <div className="card-content">
                  <h3 className="card-title">{item.title}</h3>
                  <span className="badge">
                    {item.completed ? "Completed" : "Pending"}
                  </span>
                </div>
                <button
                  onClick={() => handleAdd(item.id)}
                  className="add-button"
                >
                  + Add to My List
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="divider"></div>

      <div className="section">
        <h2 className="section-title">My Todo List ({addedData.length})</h2>
        {addedData.length === 0 ? (
          <p className="empty-state">
            Your todo list is empty. Add some items from above!
          </p>
        ) : (
          <div className="grid">
            {addedData.map((item) => (
              <div key={item.id} className="card card-added">
                <div className="card-content">
                  <h3 className="card-title">{item.title}</h3>
                  <span className="badge">
                    {item.completed ? "Completed" : "Pending"}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="delete-button"
                >
                  ✕ Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Todo;
