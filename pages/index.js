import React, { useEffect, useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Menambahkan SweetAlert2 melalui CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
    script.onload = () => {
      Swal.fire({
        title: 'Loading...',
        html: 'Please wait a moment',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        allowOutsideClick: false,
        background: 'rgba(0, 0, 0, 0.9)',
        color: '#fff',
      }).then(() => {
        setIsLoading(false);
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup script setelah selesai
    };
  }, []);

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center vh-100"
      style={{
        background: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '20px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.6)',
        color: '#fff',
        padding: '2rem',
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
        transition: 'opacity 1s ease',
        opacity: isLoading ? 0 : 1,
        pointerEvents: isLoading ? 'none' : 'auto', // Mencegah interaksi saat loading
      }}
    >
      <h1>Welcome to API</h1>
      <p>This is the main page of our API service deployed on Netlify with Next.js.</p>
      <a
        href="/api/api-docs"
        className="btn btn-primary mt-3"
        style={{
          backgroundColor: '#007bff',
          border: 'none',
          borderRadius: '10px',
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          color: '#fff',
          textDecoration: 'none',
          boxShadow: '0 4px 10px rgba(0, 123, 255, 0.3)',
          transition: 'transform 0.3s ease, background-color 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.backgroundColor = '#0056b3';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.backgroundColor = '#007bff';
        }}
      >
        API Docs
      </a>
    </div>
  );
}
