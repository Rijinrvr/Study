import React, { useEffect, useState } from "react";

function Todo() {
  const [data, setData] = useState([]);
  const [addedData, setAddedData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const handleAdd = (id) => {
    const selectedItem = data.find((item) => item.id === id);
    setAddedData([...addedData, selectedItem]);
    setData(data.filter((item) => item.id !== id));
  };
  const handleDelete = (id) => {
    const seletItemFromDelete = addedData.find((item) => item.id === id);
    setData([...data, seletItemFromDelete]);
    setAddedData(addedData.filter((item) => item.id !== id));
  };

  return (
    <>
      <div style={{ display: "flex", gap: "5px" }}>
        {data.map((item) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <button
              onClick={() => handleAdd(item.id)}
              style={{ backgroundColor: "green", marginRight: "10px" }}
            >
              Add
            </button>
          </div>
        ))}
      </div>

      <hr />

      <div style={{ display: "flex", gap: "5px" }}>
        {addedData.map((item) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <button
              onClick={() => handleDelete(item.id)}
              style={{ backgroundColor: "red" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Todo;
