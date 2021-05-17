import { useEffect, useState } from "react";

// This component is used to display posts, comments and todos
function Test() {
  const [resourceType, setResourceType] = useState("posts");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/" + resourceType)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setItems(res);
      });
  }, [resourceType]);

  return (
    <div className="d-flex m-3">
      <div className="d-flex m-2 flex-column">
        <button onClick={() => setResourceType("posts")}>Posts</button>
        <button onClick={() => setResourceType("comments")}>Comments</button>
        <button onClick={() => setResourceType("todos")}>Todos</button>
      </div>
    </div>
  );
}

export default Test;
