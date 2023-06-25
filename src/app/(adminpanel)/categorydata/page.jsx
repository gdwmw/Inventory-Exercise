"use client";
import { useState, useEffect } from "react";
import axios from "axios";

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
      const response = await axios.get("http://localhost:5002/categorydata", {
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
    return userData.filter((item) =>
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div className="mb-4 flex h-12 items-center">
          <p className="whitespace-nowrap text-4xl font-bold text-white">
            CATEGORY DATA
          </p>
          <div className="mx-3 min-h-[40px] min-w-[2px] bg-white"></div>
          <input
            type="text"
            placeholder="Search by Category"
            className="w-96 rounded-lg border p-2 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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
                onClick={() => sortData("category")}
              >
                Category
                {sortColumn === "category" && (
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
                <td className="px-4 py-2 text-center">{item.category}</td>
                <td className="px-4 py-2 text-center">
                  <button className="mr-2 rounded bg-[#7367f0] px-2 py-1 text-white">
                    Edit
                  </button>
                  <button className="rounded bg-red-400 px-2 py-1 text-white">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-center">
          <button
            className={`mr-2 rounded px-4 py-2 ${
              currentPage === 1
                ? "cursor-not-allowed bg-gray-300"
                : "bg-[#7367f0] text-white"
            }`}
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="mx-2 rounded bg-gray-200 px-4 py-2">
            {currentPage} - {totalPages}
          </span>
          <button
            className={`ml-2 rounded px-4 py-2 ${
              currentPage === totalPages
                ? "cursor-not-allowed bg-gray-300"
                : "bg-[#7367f0] text-white"
            }`}
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
