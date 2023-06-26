"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import AddData from "./action/adddata/AddData";
import Edit from "./action/edit/Edit";
import Delete from "./action/delete/Delete";

const ITEMS_PER_PAGE = 10;

export default function StockData() {
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
      const response = await axios.get("http://localhost:5003/stockdata", {
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
        item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        {/* HEADER */}
        <div className="mb-4 flex h-12 items-center">
          {/* TITLE */}
          <p className="select-none whitespace-nowrap text-4xl font-bold text-white">
            STOCK DATA
          </p>
          {/* TITLE */}

          {/* LINE */}
          <div className="mx-3 min-h-[40px] min-w-[2px] bg-white"></div>
          {/* LINE */}

          {/* SEACRH BAR */}
          <input
            type="text"
            placeholder="Search by Product or Category"
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
                onClick={() => sortData("product")}
              >
                Product
                {sortColumn === "product" && (
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
              <th
                className="cursor-pointer px-4 py-2"
                onClick={() => sortData("stock")}
              >
                Stock
                {sortColumn === "stock" && (
                  <span className="ml-1">
                    {sortDirection === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th
                className="cursor-pointer px-4 py-2"
                onClick={() => sortData("price")}
              >
                Price
                {sortColumn === "price" && (
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
                <td className="px-4 py-2 text-center">{item.product}</td>
                <td className="px-4 py-2 text-center">{item.category}</td>
                <td className="px-4 py-2 text-center">{item.stock}</td>
                <td className="px-4 py-2 text-center">{item.price}</td>
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
