import React, { useEffect, useState } from 'react';
import './App.css';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export default function App() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async (): Promise<void> => {
    setLoading(true);

    try {
      const response = await fetch(
        'https://dummyjson.com/products',
      );

      const json: ProductResponse = await response.json();

      setData(json.products);
    } catch (error: unknown) {
      console.error(
        'Error fetching data:',
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  // Search / Filter
  const filterData: Product[] = data.filter(item =>
    item.title
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  // Pagination
  const pageData: Product[] = filterData.slice(
    (page - 1) * 10,
    page * 10,
  );

  const totalPages: number = Math.ceil(
    filterData.length / 10,
  );

  return (
    <div className="container">
      <input
        type="text"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        placeholder="Search..."
        className="input"
      />

      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <>
          <div className="product-grid">
            {pageData.map(item => (
              <div
                className="card"
                key={item.id}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="image"
                />

                <h3>{item.title}</h3>

                <p>${item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>

          {pageData.length === 0 && (
            <p className="no-data">
              No products found.
            </p>
          )}

          <p className="page">
            Page {page} of {totalPages || 1}
          </p>

          <div className="button-container">
            <button
              disabled={page === 1}
              onClick={() =>
                setPage(prev => prev - 1)
              }
            >
              PREV
            </button>

            <button
              disabled={
                page * 10 >= filterData.length
              }
              onClick={() =>
                setPage(prev => prev + 1)
              }
            >
              NEXT
            </button>
          </div>
        </>
      )}
    </div>
  );
}