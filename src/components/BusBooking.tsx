// components/BusBooking.tsx
import { useState, useEffect } from "react";
import BookingModal from "@/components/BookingModal";
import Link from "next/link";

interface PassengerInfo {
  seatNumber: number;
  passengerName: string;
  phoneNumber: string;
  email: string;
}

interface BusData {
  totalSeats: number;
  bookedSeats: number[];
  availableSeats: number[];
}

type BookingStatus = "processing" | "success" | "error" | null;

export default function BusBookingSystem() {
  const [busData, setBusData] = useState<BusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passengerInfo, setPassengerInfo] = useState<
    Record<number, PassengerInfo>
  >({});

  useEffect(() => {
    fetchBusData();
  }, []);

  const fetchBusData = async () => {
    try {
      const response = await fetch("http://localhost:8000/bus-info");
      if (!response.ok) {
        throw new Error("Failed to fetch bus data");
      }
      const data = await response.json();
      setBusData(data);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  const toggleSeat = (seatNumber: number) => {
    setSelectedSeats((prevSelected) => {
      if (prevSelected.includes(seatNumber)) {
        return prevSelected.filter((seat) => seat !== seatNumber);
      } else {
        return [...prevSelected, seatNumber].sort((a, b) => a - b);
      }
    });
  };

  const handleOpenModal = () => {
    const initialPassengerInfo: Record<number, PassengerInfo> = {};
    selectedSeats.forEach((seat) => {
      initialPassengerInfo[seat] = {
        seatNumber: seat,
        passengerName: "",
        phoneNumber: "",
        email: "",
      };
    });
    setPassengerInfo(initialPassengerInfo);
    setIsModalOpen(true);
  };

  const handleSubmitBooking = async () => {
    setBookingStatus("processing");

    try {
      const bookingPromises = Object.values(passengerInfo).map((passenger) =>
        fetch("http://localhost:8000/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            seatNumber: passenger.seatNumber.toString(),
            passengerName: passenger.passengerName,
            phoneNumber: passenger.phoneNumber,
            email: passenger.email,
          }),
        })
      );

      const responses = await Promise.all(bookingPromises);
      const allSuccessful = responses.every((response) => response.ok);

      if (!allSuccessful) {
        throw new Error("One or more bookings failed");
      }

      if (busData) {
        setBusData((prevData) => {
          if (!prevData) return prevData;
          return {
            ...prevData,
            bookedSeats: [...prevData.bookedSeats, ...selectedSeats],
            availableSeats: prevData.availableSeats.filter(
              (seat) => !selectedSeats.includes(seat)
            ),
          };
        });
      }

      setBookingStatus("success");
      setSelectedSeats([]);
      setIsModalOpen(false);

      setTimeout(() => setBookingStatus(null), 3000);
    } catch (error) {
      setBookingStatus("error");
      console.error("Booking error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg font-medium text-blue-600">
          Loading seat information...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>Error: {error}</p>
        <button
          onClick={fetchBusData}
          className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!busData) {
    return null;
  }

  return (
    <div className="w-full bg-white p-10 text-gray-500">
      <Link href="/booking-info" className="flex justify-end">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">
          View Bookings
        </button>
      </Link>
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          Bus Booking System
        </h1>

        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 mb-6">
          {/* Driver Area */}
          <div className="relative w-20 h-14 bg-gray-300 rounded-md mx-auto mb-8 flex items-center justify-center">
            <span className="text-xs text-gray-700">Driver</span>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm">Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm">Selected</span>
            </div>
          </div>

          {/* Seats Container */}
          <div className="grid grid-cols-4 gap-4 justify-items-center mb-6">
            {Array.from({ length: busData.totalSeats }, (_, i) => i + 1).map(
              (seatNumber) => {
                const isBooked = busData.bookedSeats.includes(seatNumber);
                const isSelected = selectedSeats.includes(seatNumber);

                return (
                  <div
                    key={seatNumber}
                    onClick={() => !isBooked && toggleSeat(seatNumber)}
                    className={`
                  w-16 h-16 rounded-md flex items-center justify-center font-bold text-white
                  transition-all duration-200 
                  ${
                    isBooked
                      ? "bg-red-500 cursor-not-allowed"
                      : isSelected
                      ? "bg-blue-500 transform scale-105 shadow-md"
                      : "bg-green-500 hover:scale-105 hover:shadow-md cursor-pointer"
                  }
                `}
                  >
                    {seatNumber}
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* Booking Info */}
        <div className="bg-blue-50 p-4 rounded-md mb-4 text-gray-700">
          <p className="mb-1">
            Selected seats:
            <span className="font-semibold text-blue-600 ml-2">
              {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
            </span>
          </p>
          <p>
            Total selected:
            <span className="font-semibold ml-2">{selectedSeats.length}</span>
          </p>
        </div>

        {bookingStatus === "success" && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Successfully booked seats!
          </div>
        )}

        {bookingStatus === "error" && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Failed to book seats. Please try again.
          </div>
        )}

        <button
          onClick={handleOpenModal}
          disabled={
            selectedSeats.length === 0 || bookingStatus === "processing"
          }
          className={`
          w-full py-3 rounded-md font-medium text-white text-lg
          ${
            selectedSeats.length === 0 || bookingStatus === "processing"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }
        `}
        >
          {bookingStatus === "processing"
            ? "Processing..."
            : "Book Selected Seats"}
        </button>

        {/* Booking Modal */}
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedSeats={selectedSeats}
          passengerInfo={passengerInfo}
          setPassengerInfo={setPassengerInfo}
          onSubmit={handleSubmitBooking}
          isSubmitting={bookingStatus === "processing"}
        />
      </div>
    </div>
  );
}
