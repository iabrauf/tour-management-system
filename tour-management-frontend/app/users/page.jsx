"use client";

import Users from "../../components/Users";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAdmin } from "../utils/Auth";


function page() {
  const router = useRouter();
  useEffect(() => {
    // Redirect to login if user is not admin
    if (!isAdmin()) {
      router.push('/tours');
    }
  }, []);

  return <Users />;
}

export default page;
