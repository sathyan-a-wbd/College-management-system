import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

function Subject({ subjects, setSubjects }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //Adding Subject
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) {
      setError("Subject cannot be empty");
      return;
    } else {
      setError("");
      setSuccess("");
    }
    const exists = subjects.some(
      (sub) => sub.name.toLowerCase() === input.trim().toLocaleLowerCase(),
    );
    if (exists) {
      setError("Duplicate Subject");
    } else {
      setSubjects([...subjects, { id: Date.now(), name: input.trim() }]);
      setError("");
      setInput("");
      setSuccess("Subject Added");
      setTimeout(() => setSuccess(""), 2000);
    }
  };

  //Delete Handling
  const handleDelete = (id) => {
    setSubjects(subjects.filter((sub) => sub.id !== id));
    setSuccess("Subject deleted");
    setTimeout(() => setSuccess(""), 2000);
  };
  return (
    <main className="w-full ">
      <div className="flex flex-col gap-10 items-center justify-center mt-8">
        {/* Adding Sunjects */}
        <div className="flex flex-col w-full gap-5 items-center justify-center">
          <h1 className="text-3xl font-semibold">Subject-Management</h1>
          <div className="md:w-2/4 w-[90%] sm:w-[90%]">
            <form
              onSubmit={handleSubmit}
              className={`w-full flex border-2 rounded-sm ${error ? "border-[#dc2626]" : " border-[#4338ca]"}`}
            >
              <input
                onChange={(e) => setInput(e.target.value)}
                type="text"
                value={input}
                className="flex flex-1 outline-none border-none pl-3 pr-2 py-2"
                placeholder={`Add subject`}
              />
              <button
                className={`${error ? "bg-[#dc2626]" : "bg-[#4f46e5]"} text-white px-3 cursor-pointer`}
              >
                Add
              </button>
            </form>
            {/* Error handling */}
            <p className="text-xs mt-1 px-1 text-[#dc2626]">
              {(error && error) || ""}
            </p>
            <p className="text-xs mt-1 px-1 text-[#16a34a]">
              {(success && success) || ""}
            </p>
          </div>
        </div>
        {/* Viewing Students */}
        <div className="md:w-2/4 w-[90%] sm:w-[90%] mt-3">
          <h3>Subject List</h3>
          {subjects.length !== 0 ? (
            <table className="table table-hover w-1/2">
              <thead className="thead-light">
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Subject name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((sub, index) => (
                  <tr key={sub.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{sub.name}</td>
                    <td>
                      <button
                        style={{ fontSize: "13px", borderRadius: "3px" }}
                        className="text-white py-1 px-1 rounded-lg bg-[#dc2626] gap-1 flex items-center justify-center"
                        onClick={() => handleDelete(sub.id)}
                      >
                        Delete
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="px-1">No result found</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default Subject;
