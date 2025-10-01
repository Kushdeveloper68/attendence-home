import React, { useState, useEffect } from "react";
import "../styles/generateqr.css";
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { useApi, generateqrApi } from "../apis/API";

const GenerateQR = () => {
  const api = useApi();
  const navigator = useNavigate();
  const [parsedUser, setParsedUser] = useState({});
  const [showQR, setShowQR] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [qrImage, setQrImage] = useState(""); // <-- store QR from backend
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const user = localStorage.getItem("student") || localStorage.getItem("teacher");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user && !token) navigator("/");
    const role = JSON.parse(user)?.role;
    setParsedUser(JSON.parse(user));
    if (role !== "teacher") {
      navigator("/");
    }
  }, [user, token]);

  // Generate QR and get image from backend
  const handleGenerateQR = async () => {
    setLoading(true);
    setErrorMsg("");
    setQrImage("");
    try {
      const response = await generateqrApi({ branch, semester, subject });
      if (response.success) {
        setQrImage(response.qrImage);
        setShowQR(true);
      } else {
        setErrorMsg(response.message || "Failed to generate QR code.");
      }
    } catch (error) {
      setErrorMsg("Error generating QR code.");
    }
    setLoading(false);
  };

  // Download QR image
  const handleDownload = () => {
    if (!qrImage) return;
    const link = document.createElement("a");
    link.href = qrImage;
    link.download = "attendance-qr.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Share QR image (Web Share API)
  const handleShare = async () => {
    if (!qrImage) return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Attendance QR Code",
          text: "Scan this QR code to mark attendance.",
          url: qrImage
        });
      } else {
        alert("Sharing is not supported on this device/browser.");
      }
    } catch (err) {
      alert("Error sharing QR code.");
    }
  };

  return (
    <div className="bg-[var(--light-gray-50)] flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[var(--navy-800)] mb-10">
            Generate Attendance QR
          </h2>
          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="branch">
                  Branch
                </label>
                <select
                  id="branch"
                  name="branch"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="form-select appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--teal-500)] focus:border-[var(--teal-500)] transition"
                >
                  <option value="">Select Branch</option>
                  <option>Computer Engineering</option>
                  <option>Mechanical Engineering</option>
                  <option>Electrical Engineering</option>
                  <option>Minning Engineering</option>
                  <option>Civil Engineering</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="semester">
                  Semester
                </label>
                <select
                  id="semester"
                  name="semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="form-select appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--teal-500)] focus:border-[var(--teal-500)] transition"
                >
                  <option value="">Select Semester</option>
                  {[...Array(8)].map((_, i) => (
                    <option key={i}>{i + 1}st</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="subject">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Enter Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--teal-500)] focus:border-[var(--teal-500)] transition"
                />
              </div>
            </div>
            <div className="text-center">
              <button
                onClick={handleGenerateQR}
                className="btn-generateqr-primary font-bold py-4 px-10 text-lg rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all"
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate QR Code"}
              </button>
              {errorMsg && (
                <div className="mt-4 text-red-600 font-semibold">{errorMsg}</div>
              )}
            </div>
          </div>
          {/* QR Card */}
          {showQR && qrImage && (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center animate-fade-in">
              <img
                alt="QR Code"
                className="mx-auto mb-6 rounded-lg ring-4 ring-[var(--light-gray-200)] p-2 bg-white"
                src={qrImage}
              />
              <h3 className="text-2xl font-bold text-[var(--navy-800)] mb-2">
                Your QR Code is Ready!
              </h3>
              <p className="text-gray-600 mb-8">
                Scan this code to mark attendance.
              </p>
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={handleDownload}
                  className="btn-generateqr-secondary flex items-center gap-2 font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                  <span className="material-symbols-outlined">download</span>
                  Download
                </button>
                <button
                  onClick={handleShare}
                  className="bg-gray-200 text-gray-800 flex items-center gap-2 font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-300 transform hover:-translate-y-0.5 transition-all"
                >
                  <span className="material-symbols-outlined">share</span>
                  Share
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      {/* Modal (optional, for preview/download) */}
      {showModal && qrImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => e.target.classList.contains("fixed") && setShowModal(false)}
        >
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center relative transform transition-all scale-100">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-2xl font-bold text-[var(--navy-800)] mb-4">
              QR Code Preview
            </h3>
            <img
              alt="QR Code Preview"
              className="mx-auto mb-6 rounded-lg"
              src={qrImage}
            />
            <button
              className="btn-generateqr-primary font-bold py-3 px-8 text-base rounded-lg shadow-md hover:shadow-xl transition-all"
              onClick={handleDownload}
            >
              Confirm Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateQR;