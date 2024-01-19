'use client';

import ToursList from "../../components/ToursList";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Page() {
  const [toursList, setToursList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/Tour`);
        setToursList(response.data);
      } catch (error) {
        setError(error.response.data || "Failed to fetch tours");
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ToursList toursList={toursList} />
      )}
    </div>
  );
}

export default Page;
