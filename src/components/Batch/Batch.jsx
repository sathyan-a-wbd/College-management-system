import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

const Batch = ({ courses, setBatches, batches }) => {
  //States
  const [batchName, setBatchName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleAddBatch = (e) => {
    e.preventDefault();
    if (!batchName.trim()) {
      setError("Batch name cannot be empty");
      return;
    }
    if (!selectedCourse) {
      setError("Please select course");
      return;
    }
    if (!startTime || !endTime) {
      setError("Please select Time duration");
      return;
    }
    if (startTime >= endTime) {
      setError("Start time must be before End time");
      return;
    }
    const newBatch = {
      id: Date.now(),
      name: batchName,
      courseID: selectedCourse,
      sTime: startTime,
      eTime: endTime,
    };
    setBatches([...batches, newBatch]);
    setEndTime("");
    setStartTime("");
    setBatchName("");
    setSelectedCourse("");
    setError("");
    setSuccess("Batch added successfully");
    setTimeout(() => setSuccess(""), 2000);
  };

  const handledelete = (id) => {
    setBatches((batches) => batches.filter((b) => b.id !== id));
  };
  return (
    <main className="w-full flex items-center justify-center flex-col">
      <div className="w-[90%] md:w-2/4 sm:w-[80%] mt-5 flex items-center justify-center flex-col gap-3">
        <h1 className="text-3xl font-semibold">Batch Management</h1>
        <form
          onSubmit={handleAddBatch}
          className="flex gap-3 flex-col w-full card py-5 px-6  "
        >
          <div className="input-feild">
            <input
              value={batchName}
              className="w-full border-2 rounded-sm border-[#4f46e5] outline-none  px-3 py-3"
              type="text"
              placeholder="Enter batch name"
              onChange={(e) => setBatchName(e.target.value)}
            />
          </div>

          <div className="input-feild">
            <select
              className="w-full border-2 rounded-sm border-[#4f46e5] outline-none  px-3 py-3"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option className="px-5" value="">
                Select course
              </option>
              {courses.map((crs) => (
                <option key={crs.id} value={crs.id}>
                  {crs.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div className="input-feild flex flex-col">
              Start Time :
              <input
                className="w-full border-2 rounded-sm border-[#4f46e5] outline-none  px-3 py-3"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="input-feild flex flex-col">
              End Time :
              <input
                className="w-full border-2 rounded-sm border-[#4f46e5] outline-none  px-3 py-3"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            style={{ borderRadius: "3px" }}
            className="w-full mt-2 bg-[#4f46e5] px-3 py-3 text-white text-xl font-bold rounded-sm"
          >
            Add Batch
          </button>
          {error ? (
            <>
              <p className="text-xs mt-1 px-1 text-[#dc2626]">
                {error && error}
              </p>
            </>
          ) : (
            <></>
          )}
          {success ? (
            <>
              <p className="text-xs mt-1 px-1 text-[#16a34a]">
                {success && success}
              </p>
            </>
          ) : (
            <></>
          )}
        </form>
      </div>

      <h2 className="text-3xl font-bold mt-4">Batch List</h2>
      {batches.length === 0 ? (
        <>
          <p>No result found !</p>
        </>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 px-4 w-full">
          {batches.map((btch) => {
            const course = courses.find((c) => c.id === Number(btch.courseID));
            return (
              <div
                key={btch.id}
                className="card px-3 flex flex-col gap-3 py-3 w-full "
              >
                <label className="text-2xl" key={btch.id}>
                  {btch.name}
                </label>
                <div className="flex flex-col">
                  <span className=" py-1 bg-[#4f46e5] px-1.5 text-white  text-lg rounded-sm">
                    {course?.name}
                  </span>
                  <span className="h-[1px] w-full bg-gray-300"></span>
                  <span className="text-sm">
                    {btch.sTime}-{btch.eTime}
                  </span>

                  <MdDelete
                    className="cursor-pointer text-gray-500"
                    onClick={() => handledelete(btch.id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Batch;
