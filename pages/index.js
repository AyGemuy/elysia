import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FaSearch, FaArrowLeft, FaArrowRight, FaPlay } from 'react-icons/fa';
import fs from 'fs/promises';
import path from 'path';

const getFnParamNames = (fn) => {
  const fnStr = fn.toString().replace(/\s+/g, ' ');
  const arrowMatch =
    fnStr.match(/^(async\s*)?[^(]*\(([^)]*)\)\s*=>/) ||
    fnStr.match(/^\s*\w+\s*(async\s*)?\(?([^)]*)\)?\s*=>/);
  if (arrowMatch) return arrowMatch[2].split(',').map((param) => param.trim()).filter(Boolean);
  const functionMatch = fnStr.match(/function\s*(async\s*)?\w*\s*\(([^)]*)\)/);
  if (functionMatch) return functionMatch[2].split(',').map((param) => param.trim()).filter(Boolean);
  const boundFunctionMatch = fnStr.match(/bound\s*function\s*\(([^)]*)\)/);
  if (boundFunctionMatch) return boundFunctionMatch[1].split(',').map((param) => param.trim()).filter(Boolean);
  const anonymousMatch = fnStr.match(/^\(([^)]*)\)\s*=>/);
  return anonymousMatch ? anonymousMatch[1].split(',').map((param) => param.trim()).filter(Boolean) : [];
};

export async function getStaticProps() {
  const apiDirectory = path.join(process.cwd(), 'pages/api');

  const getAllFiles = async (dirPath, prefix = '') => {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    let files = [];
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const relativePath = path.join(prefix, entry.name);
      if (entry.isDirectory()) {
        const subFiles = await getAllFiles(fullPath, relativePath);
        files = [...files, ...subFiles];
      } else if (entry.isFile() && entry.name.endsWith('.js')) {
        files.push(relativePath);
      }
    }
    return files;
  };

  const files = await getAllFiles(apiDirectory);

  const endpoints = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(apiDirectory, file);
      const mod = await import(filePath);
      const handler = mod.default;
      const queryParams = handler ? getFnParamNames(handler) : [];
      const name = file.replace('.js', '');
      const tag = name
        .split('/')
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join(' / ');

      return {
        tag,
        query: queryParams.length > 0 ? queryParams.join(', ') : 'No Query',
        action: `/api/${name.replace(/\\/g, '/')}`,
      };
    })
  );

  return {
    props: {
      endpoints,
    },
  };
}

const Home = ({ endpoints }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const itemsPerPage = 5;

  const filteredEndpoints = endpoints.filter((endpoint) =>
    endpoint.tag.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredEndpoints.length / itemsPerPage);

  const currentItems = filteredEndpoints.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleRun = async (url) => {
    try {
      Swal.fire({
        title: 'Loading...',
        html: 'Fetching data from the API...',
        didOpen: () => Swal.showLoading(),
        allowOutsideClick: false,
      });

      const response = await fetch(url);
      const data = await response.json();

      Swal.fire({
        icon: 'success',
        title: 'API Response',
        html: `<pre>${JSON.stringify(data, null, 2)}</pre>`,
        customClass: {
          popup: 'swal-wide',
        },
        confirmButtonText: 'Close',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Failed to fetch data: ${error.message}`,
      });
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center min-vh-100"
      style={{
        backdropFilter: 'blur(10px)',
        background: 'linear-gradient(135deg, #1f4037, #99f2c8)',
        color: '#ffffff',
        fontFamily: '"Inter", sans-serif',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s ease-in-out',
      }}
    >
      <h1
        className="text-center my-4"
        style={{
          fontSize: '2.8rem',
          fontWeight: '700',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        }}
      >
        API Endpoints
      </h1>

      {/* Search Bar */}
      <div className="mb-4 d-flex align-items-center">
        <FaSearch size={18} className="me-2" />
        <input
          type="text"
          placeholder="Search endpoint..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
          style={{
            width: '300px',
            borderRadius: '10px',
            padding: '0.8rem',
            fontSize: '1.1rem',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        />
      </div>

      {/* Table */}
      <div
        className="table-responsive rounded shadow"
        style={{
          maxHeight: '300px',
          overflowY: 'auto',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(5px)',
          animation: 'fadeIn 0.8s ease',
        }}
      >
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Tag</th>
              <th>Query</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((endpoint, idx) => (
              <tr key={idx}>
                <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                <td>{endpoint.tag}</td>
                <td>{endpoint.query}</td>
                <td>
                  <button
                    onClick={() => handleRun(endpoint.action)}
                    className="btn btn-success btn-sm d-flex align-items-center justify-content-center"
                    style={{
                      borderRadius: '5px',
                      padding: '0.5rem 0.8rem',
                      fontSize: '0.9rem',
                    }}
                  >
                    <FaPlay size={14} className="me-1" />
                    Run
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between mt-4" style={{ width: '300px' }}>
        <button
          className="btn btn-outline-light d-flex align-items-center"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            opacity: currentPage === 1 ? '0.5' : '1',
          }}
        >
          <FaArrowLeft size={18} className="me-2" />
          Previous
        </button>
        <button
          className="btn btn-outline-light d-flex align-items-center"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            opacity: currentPage === totalPages ? '0.5' : '1',
          }}
        >
          Next
          <FaArrowRight size={18} className="ms-2" />
        </button>
      </div>
    </div>
  );
};

export default Home;
