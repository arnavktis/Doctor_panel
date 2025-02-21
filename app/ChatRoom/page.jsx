"use client";

import React, { useEffect, useState, useRef, Suspense } from "react";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";

const ChatDoctorContent = () => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId"); 
  const userId = searchParams.get("userId");
  const userName = searchParams.get("uname");

  const [screenWidth, setScreenWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 768);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  const [page, setPage] = useState(0);
  const chatBodyRef = useRef(null);
  const token = Cookies.get("token");

  const fetchDoctorInfo = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_HOST}/getUserId`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      console.log(data)
      if (data.userId) {
        setDoctorId(data.userId);
      } else {
        console.error("Doctor ID not found");
      }
    } catch (error) {
      console.error("Error fetching doctor info:", error);
    }
  };

  useEffect(() => {
    fetchDoctorInfo();
  }, []);

  useEffect(() => {
    const newSocket = io(`${process.env.NEXT_PUBLIC_URL_HOST}`);
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (socket && doctorId && userId) {
      socket.emit("joinRoom", { userId, doctorId });

      socket.on("chatHistory", (history) => {
        setMessages(
          history.map((msg) => ({
            id: msg._id || `${msg.timestamp}-${Math.random()}`,
            text: msg.message,
            sender: msg.sentBy === doctorId,
            timestamp: msg.timestamp,
          }))
        );
      });

      socket.on("newMessage", (msg) => {
        setMessages((prev) => [
          ...prev,
          {
            id: msg._id || `${msg.timestamp}-${Math.random()}`,
            text: msg.message,
            sender: msg.sentBy === doctorId,
            timestamp: msg.timestamp,
          },
        ]);
      });

      return () => {
        socket.off("chatHistory");
        socket.off("newMessage");
      };
    }
  }, [doctorId]);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() && socket) {
      socket.emit("sendMessage", {
        userId,
        doctorId,
        message: newMessage.trim(),
        sentBy: doctorId,
      });
      setNewMessage("");
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    socket.emit("loadMessages", { doctorId, userId, roomId, page: nextPage });
  };

  console.log(`Doctor id is: ${doctorId}`)
  console.log(`User id is: ${userId}`)
  console.log(`Room id is: ${roomId}`)
  
  

  return (
    <div
      style={{
        backgroundColor: "#121212",
        height: "90.8vh",
        padding: "20px",
        marginLeft: screenWidth > 768 ? "250px" : "0",
        marginTop: "84px",
        color: "#c6ffb3",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "18px", marginBottom: "20px" }}>
        <div style={{ color: "#c6ffb3", cursor: "pointer" }}>← {userName}</div>
      </div>
      <div style={{ backgroundColor: "#1a1a1a", borderRadius: "15px", padding: "10px", overflowY: "auto", height: "70vh" }} ref={chatBodyRef}>
        <button onClick={handleLoadMore} style={{ marginBottom: "10px" }}>Load More</button>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: msg.sender ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            <div style={{ backgroundColor: msg.sender ? "#2e4934" : "#1a1a1a", borderRadius: "20px", padding: "10px 20px", color: "#fff", maxWidth: "60%" }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", backgroundColor: "#1a1a1a", padding: "10px", borderRadius: "20px", marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Type a message..."
          style={{ flex: 1, backgroundColor: "transparent", border: "none", color: "#fff", outline: "none", fontSize: "16px", paddingLeft: "10px" }}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <span style={{ fontSize: "24px", marginLeft: "10px", color: "#c6ffb3", cursor: "pointer" }} onClick={handleSendMessage}>
          ✈️
        </span>
      </div>
    </div>
  );
};

const ChatRoom = () => {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <ChatDoctorContent />
    </Suspense>
  );
};

export default ChatRoom;
