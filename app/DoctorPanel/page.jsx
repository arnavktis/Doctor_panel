import React from "react";
import Image from "next/image";

const meetings = [
  {
    name: "Yash Babbar",
    date: "22.02.2025",
    message:
      "What a delightful and magical chapter it is! It indeed transports readers to the wizarding world...",
  },
];

const criticalCases = [
  {
    name: "mr. arnav khanna",
    description:
      "Severe, painful acne with deep cysts and signs of infection, which could lead to perman...",
  },
];

const styles = {
  container: {
    overflow: "hidden",
    marginTop: "77px",
    marginLeft: "250px",
    minHeight: "100vh",
    backgroundColor: "#1C1C1C",
    padding: "24px",
    color: "white",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
  },
  panel: {
    backgroundColor: "#2A2A2A",
    borderRadius: "16px",
    padding: "24px",
    animation: "slideUp 0.5s ease-out forwards",
  },
  panelTitle: {
    color: "#CEDF9F",
    fontSize: "1.25rem",
    marginBottom: "32px",
  },
  barChart: {
    display: "flex",
    alignItems: "flex-end",
    gap: "16px",
  },
  bar: {
    width: "64px",
    borderRadius: "8px",
  },
  grayBar: {
    height: "128px",
    backgroundColor: "#4A4A4A",
  },
  greenBar: {
    height: "192px",
    backgroundColor: "#CEDF9F",
  },
  monthLabel: {
    display: "flex",
    gap: "16px",
    marginTop: "8px",
    fontSize: "0.875rem",
  },
  growthRate: {
    fontSize: "2.25rem",
    fontWeight: "bold",
    marginTop: "16px",
  },
  criticalCase: {
    marginBottom: "16px",
  },
  caseName: {
    color: "#9CA3AF",
    fontSize: "0.875rem",
  },
  caseDescription: {
    fontSize: "0.875rem",
    marginTop: "4px",
  },
  dotContainer: {
    display: "flex",
    gap: "8px",
    marginTop: "16px",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
  },
  activeDot: {
    backgroundColor: "#CEDF9F",
  },
  inactiveDot: {
    backgroundColor: "#4A4A4A",
  },
  aiOption: {
    padding: "16px",
    backgroundColor: "#3A3A3A",
    borderRadius: "8px",
    marginBottom: "16px",
    fontSize: "0.875rem",
  },
  aiOptionWithArrow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeline: {
    position: "relative",
    paddingLeft: "24px",
  },
  timelineLine: {
    position: "absolute",
    left: "8px",
    top: 0,
    bottom: 0,
    width: "1px",
    backgroundColor: "#4A4A4A",
  },
  meetingItem: {
    position: "relative",
    marginBottom: "24px",
  },
  timelineDot: {
    position: "absolute",
    left: "-24px",
    top: "8px",
    width: "16px",
    height: "16px",
    backgroundColor: "#2A2A2A",
    border: "2px solid #CEDF9F",
    borderRadius: "50%",
  },
  meetingHeader: {
    fontSize: "0.875rem",
  },
  meetingName: {
    color: "#9CA3AF",
  },
  meetingDate: {
    color: "#CEDF9F",
  },
  meetingMessage: {
    marginTop: "4px",
    color: "#D1D5DB",
  },
  earnings: {
    marginTop: "32px",
  },
  earningsAmount: {
    fontSize: "2.25rem",
    fontWeight: "bold",
  },
  earningsDate: {
    fontSize: "0.875rem",
    color: "#9CA3AF",
    marginTop: "8px",
  },
  approvalContainer: {
    display: "flex",
    gap: "16px",
    marginTop: "32px",
  },
  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontWeight: 500,
  },
  patientDetail: {
    fontSize: "0.875rem",
    color: "#9CA3AF",
  },
  chevronRight: {
    width: "20px",
    height: "20px",
    color: "#CEDF9F",
  },
};

const ChevronRight = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const DoctorPanel = () => {
  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        {/* Patients This Month */}
        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>patients this month</h2>
          <div style={styles.barChart}>
            <div style={{ ...styles.bar, ...styles.grayBar }}></div>
            <div style={{ ...styles.bar, ...styles.greenBar }}></div>
          </div>
          <div style={styles.monthLabel}>
            <span style={{ width: "64px", textAlign: "center" }}>jan</span>
            <span style={{ width: "64px", textAlign: "center" }}>feb</span>
          </div>
          <div style={styles.growthRate}>+25%</div>
        </div>

        {/* Critical Cases */}
        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>critical cases</h2>
          {criticalCases.map((ccase, index) => (
            <div key={index} style={styles.criticalCase}>
              <h3 style={styles.caseName}>{ccase.name}</h3>
              <p style={styles.caseDescription}>{ccase.description}</p>
            </div>
          ))}
          <div style={styles.dotContainer}>
            <div style={{ ...styles.dot, ...styles.activeDot }}></div>
            <div style={{ ...styles.dot, ...styles.inactiveDot }}></div>
            <div style={{ ...styles.dot, ...styles.inactiveDot }}></div>
            <div style={{ ...styles.dot, ...styles.inactiveDot }}></div>
          </div>
        </div>

        {/* AI Analysis */}
        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>AI analysis</h2>
          <div style={{ marginTop: "32px" }}>
            <div style={styles.aiOption}>calculate your money earning...</div>
            <div style={styles.aiOption}>update your schedule...</div>
            <div style={styles.aiOption}>approve an appointment...</div>
            <div style={styles.aiOption}>schedule an appointment...</div>
            <div style={{ ...styles.aiOption, ...styles.aiOptionWithArrow }}>
              <span>how can I assist you?</span>
              <ChevronRight />
            </div>
          </div>
        </div>

        {/* Meetings */}
        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>meeting</h2>
          <div style={styles.timeline}>
            <div style={styles.timelineLine}></div>
            {meetings.map((meeting, index) => (
              <div key={index} style={styles.meetingItem}>
                <div style={styles.timelineDot}></div>
                <div style={styles.meetingHeader}>
                  <span style={styles.meetingName}>{meeting.name}</span> •
                  <span style={styles.meetingDate}>{meeting.date}</span>
                </div>
                <p style={styles.meetingMessage}>{meeting.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Total Earning */}
        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>total earning</h2>
          <div style={styles.earnings}>
            <span style={styles.earningsAmount}>₹1,39,892</span>
            <p style={styles.earningsDate}>since 2025</p>
          </div>
        </div>

        {/* Waiting for Approval */}
        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>waiting for approval</h2>
          <div style={styles.approvalContainer}>
            <Image
              src="/icons kit/drbabbar.png"
              alt="Patient"
              width={48}
              height={48}
              style={styles.avatar}
            />
            <div style={styles.patientInfo}>
              <h3 style={styles.patientName}>mr. yash babbar</h3>
              <p style={styles.patientDetail}>appointment: 21.02.2025</p>
              <p style={styles.patientDetail}>problem: acne, breakouts</p>
              <p style={styles.patientDetail}>wrinkles & aging</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPanel;
