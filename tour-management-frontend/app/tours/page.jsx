import ToursList from "../../components/ToursList";
import React from "react";

function page() {
  const toursList = [
    {
      id: 1,
      name: "Naran Kagan",
      departureFrom: "Kathmandu",
      dateStartFrom: "2021-09-01",
      dateEndFrom: "2021-09-10",
      price: 13000,
    },
    {
      id: 2,
      name: "Naran Kagan",
      departureFrom: "Kathmandu",
      dateStartFrom: "2021-09-01",
      dateEndFrom: "2021-09-10",
      price: 13000,
    },
    {
      id: 3,
      name: "Naran Kagan",
      departureFrom: "Kathmandu",
      dateStartFrom: "2021-09-01",
      dateEndFrom: "2021-09-10",
      price: 13000,
    },
    {
      id: 4,
      name: "Naran Kagan",
      departureFrom: "Kathmandu",
      dateStartFrom: "2021-09-01",
      dateEndFrom: "2021-09-10",
      price: 13000,
    },
    {
      id: 5,
      name: "Naran Kagan",
      departureFrom: "Kathmandu",
      dateStartFrom: "2021-09-01",
      dateEndFrom: "2021-09-10",
      price: 13000,
    },
    {
      id: 6,
      name: "Naran Kagan",
      departureFrom: "Kathmandu",
      dateStartFrom: "2021-09-01",
      dateEndFrom: "2021-09-10",
      price: 13000,
    },
    {
      id: 7,
      name: "Naran Kagan",
      departureFrom: "Kathmandu",
      dateStartFrom: "2021-09-01",
      dateEndFrom: "2021-09-10",
      price: 13000,
    },
  ]
  return (
    <ToursList toursList={toursList} />
  );
}

export default page;
