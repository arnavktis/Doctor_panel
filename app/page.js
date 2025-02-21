'use client';

import DoctorPanel from "./DoctorPanel/page";
import React, { useState, useEffect } from "react";
import LandingPage from "./Landing/LandingPage/page";
import Dashboard1 from "./Landing/Dashboard1/page";
import Dashboard2 from "./Landing/Dashboard2/page";
import Dashboard3 from "./Landing/Dashboard3/page";
import Dashboard4 from "./Landing/Dashboard4/page";
import Dashboard5 from "./Landing/Dashboard5/page";
import Layout from "./layout";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import js-cookie

const Page = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Initial state is null to avoid flickering

  useEffect(()  => {
    // Ensure token is checked only after mounting
    const checkLoginStatus = async () => {
      const token = Cookies.get("token"); // Get token inside useEffect
      if (!token) {
        setIsLoggedIn(false);
        return;
      } 
      try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_HOST}/getUserId`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        
        setIsLoggedIn(true);
        setUserRole(userData.role);

        // If user is not a doctor, redirect to home
        if (userData.role !== 'doctor') {
          Cookies.remove('token'); // Optional: remove token
          router.push('/');
          alert('Access denied. Only doctors can access this panel.');
        }

      }catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoggedIn(false);
        Cookies.remove('token');
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, [router]); // Runs only when the router changes

  if (isLoggedIn === null) return null; // Prevent rendering until authentication is checked

  return (
    <>
      {isLoggedIn ? (
        <Layout>
          <DoctorPanel />
          {/* <FaceScan /> */}
        </Layout>
      ) : (
        <div style={styles.container}>
          <LandingPage />
          <Dashboard1 />
          <Dashboard2 />
          <Dashboard3 />
          <Dashboard4 />
          <Dashboard5 />
          {/* <PreFooter />
          <Footer /> */}
        </div>
      )}
    </>
  );
};

const styles = {
  container: {
    height: "100vh",
  },
};

export default Page;
