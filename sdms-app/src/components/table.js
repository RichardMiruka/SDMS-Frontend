import React, { useState, useEffect } from 'react';

const MyTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Assuming your API endpoint returns an array of objects
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(apiData => setData(apiData))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array to run the effect only once on component mount

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(item => (
            <tr key={item.id}>
              <td>{item.property1}</td>
              <td>{item.property2}</td>
              <td>{item.property3}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div>
        {data.length > itemsPerPage && (
          <ul>
            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
              <li key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyTable;