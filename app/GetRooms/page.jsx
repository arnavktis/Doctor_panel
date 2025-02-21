"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const style = {
  container: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#1a1a1a",
    padding: "20px",
  },
  card: {
    backgroundColor: "#1c1c1c",
    color: "#fff",
    padding: "10px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    width: "100%",
  },
  roomTitle: {
    color: "#EBEBEB",
    fontFamily: "Outfit",
    fontSize: "24px",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#435940",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "8px",
  },
};

const RoomCard = ({ room, onJoin }) => (
  <div style={style.card}>
    <h2 style={style.roomTitle}>{room.user_name}</h2>

    <button style={style.button} onClick={() => onJoin(room._id)}>
      Join Room
    </button>
  </div>
);

const GetRooms = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  

  const fetchRooms = async () => {
    const token = Cookies.get("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_HOST}/rooms`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data)
      if (data) {
        setRooms(data);
      } else {
        console.error("No rooms available right now.");
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleJoinRoom = (roomId, userId, un) => {
    router.push(`/ChatRoom?roomId=${roomId}&userId=${userId}&uname=${un}`);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#1a1a1a",
        minHeight: "150vh",
        height: "auto",
        marginLeft: isMobile ? "0px" : "250px",
        marginTop: isMobile ? "0px" : "84px",
      }}
    >
      <h2
        style={{
          color: "#EBEBEB",
          fontFamily: "Outfit",
          fontSize: "39px",
          fontWeight: 700,
          marginLeft: "20px",
          marginTop: "20px",
        }}
      >
        Join a Chat Room
      </h2>
      <div style={style.container}>
        {rooms.map((room, index) => (
            <RoomCard room={room} key={index} onJoin={() => handleJoinRoom(room._id, room.userId, room.user_name)} />

        ))}
      </div>
    </div>
  );
};

export default GetRooms;
