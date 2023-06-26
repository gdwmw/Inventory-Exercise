"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import AddData from "./action/AddData";
import Edit from "./action/Edit";
import Delete from "./action/Delete";

const ITEMS_PER_PAGE = 10;

export default function UserData() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5001/userdata", {
        headers: { "Cache-Control": "no-cache" },
      });
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sortData = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filterData = () => {
    if (!searchTerm) {
      return userData;
    }
    return userData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getCurrentData = () => {
    const sortedData = [...filterData()].sort((a, b) => {
      const valA = a[sortColumn];
      const valB = b[sortColumn];
      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filterData().length / ITEMS_PER_PAGE);

  return (
    <main className="h-screen w-screen bg-[#25293c] py-6 pl-[340px] pr-5">
      <div className="h-full w-full overflow-scroll">
        {/* HEADER */}
        <div className="mb-4 flex h-12 items-center">
          {/* TITLE */}
          <p className="select-none whitespace-nowrap text-4xl font-bold text-white">
            USER DATA
          </p>
          {/* TITLE */}

          {/* LINE */}
          <div className="mx-3 min-h-[40px] min-w-[2px] bg-white"></div>
          {/* LINE */}

          {/* SEACRH BAR */}
          <input
            type="text"
            placeholder="Search by Name or Email"
            className="w-96 rounded-lg border p-2 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* SEACRH BAR */}

          <AddData />
        </div>
        {/* HEADER */}

        {/* TABLE */}
        <table className="w-full table-fixed rounded-lg bg-white shadow-lg">
          <thead className="border-b-4 border-[#25293c]">
            <tr>
              <th
                className="cursor-pointer px-4 py-2"
                onClick={() => sortData("id")}
              >
                No
                {sortColumn === "id" && (
                  <span className="ml-1">
                    {sortDirection === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th
                className="cursor-pointer px-4 py-2"
                onClick={() => sortData("name")}
              >
                Full Name
                {sortColumn === "name" && (
                  <span className="ml-1">
                    {sortDirection === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th
                className="w-[250px] cursor-pointer px-4 py-2"
                onClick={() => sortData("email")}
              >
                Email
                {sortColumn === "email" && (
                  <span className="ml-1">
                    {sortDirection === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th className="px-4 py-2">Password</th>
              <th
                className="cursor-pointer px-4 py-2"
                onClick={() => sortData("role")}
              >
                Role
                {sortColumn === "role" && (
                  <span className="ml-1">
                    {sortDirection === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentData().map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-2 text-center">{item.id}</td>
                <td className="px-4 py-2 text-center">{item.name}</td>
                <td className="px-4 py-2 text-center">{item.email}</td>
                <td className="px-4 py-2 text-center">{item.password}</td>
                <td className="px-4 py-2 text-center">{item.role}</td>
                <td className="px-4 py-2 text-center">
                  <Edit item={item} />
                  <Delete item={item} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* TABLE */}

        {/* PAGINATION */}
        <div className="mt-4 flex justify-center">
          {/* PREVIOUS BUTTON */}
          <button
            className={`mr-2 select-none rounded px-4 py-2 ${
              currentPage === 1
                ? "cursor-not-allowed bg-gray-300"
                : "bg-[#7367f0] text-white hover:bg-[#7367f0]/80"
            }`}
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {/* PREVIOUS BUTTON */}

          {/* PAGE NUMBER */}
          <span className="mx-2 select-none rounded bg-gray-200 px-4 py-2">
            {currentPage} - {totalPages}
          </span>
          {/* PAGE NUMBER */}

          {/* NEXT BUTTON */}
          <button
            className={`ml-2 select-none rounded px-4 py-2 ${
              currentPage === totalPages
                ? "cursor-not-allowed bg-gray-300"
                : "bg-[#7367f0] text-white hover:bg-[#7367f0]/80"
            }`}
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          {/* NEXT BUTTON */}
        </div>
        {/* PAGINATION */}
      </div>
    </main>
  );
}
