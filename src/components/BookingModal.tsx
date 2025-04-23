// components/BookingModal.tsx
interface PassengerInfo {
  passengerName: string;
  phoneNumber: string;
  email: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSeats: number[];
  passengerInfo: Record<number, PassengerInfo>;
  setPassengerInfo: React.Dispatch<
    React.SetStateAction<Record<number, PassengerInfo>>
  >;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function BookingModal({
  isOpen,
  onClose,
  selectedSeats,
  passengerInfo,
  setPassengerInfo,
  onSubmit,
  isSubmitting,
}: BookingModalProps) {
  if (!isOpen) return null;

  const handleChange = (
    seatNumber: number,
    field: keyof PassengerInfo,
    value: string
  ) => {
    setPassengerInfo((prev) => ({
      ...prev,
      [seatNumber]: {
        ...prev[seatNumber],
        [field]: value,
      },
    }));
  };

  const isFormValid = () => {
    return selectedSeats.every(
      (seat) =>
        passengerInfo[seat] &&
        passengerInfo[seat].passengerName?.trim() !== "" &&
        passengerInfo[seat].phoneNumber?.trim() !== "" &&
        passengerInfo[seat].email?.trim() !== ""
    );
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Passenger Information
            </h2>
            <button
              onClick={onClose}
              className="text-gray-700 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <p className="text-gray-600 mb-4">
            Please enter passenger details for each selected seat.
          </p>

          <div className="space-y-4 mb-6">
            {selectedSeats.map((seat) => (
              <div key={seat} className="border rounded-md p-4 bg-gray-50">
                <div className="font-medium text-gray-700 mb-2">
                  Seat {seat}
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-700 text-sm font-medium">
                    Passenger Name
                  </label>
                  <input
                    type="text"
                    value={passengerInfo[seat]?.passengerName || ""}
                    onChange={(e) =>
                      handleChange(seat, "passengerName", e.target.value)
                    }
                    placeholder="Enter passenger name"
                    className="w-full px-3 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-700 text-sm font-medium">
                    Passenger Phone Number
                  </label>
                  <input
                    type="tel"
                    value={passengerInfo[seat]?.phoneNumber || ""}
                    onChange={(e) =>
                      handleChange(seat, "phoneNumber", e.target.value)
                    }
                    placeholder="Enter passenger phone number"
                    className="w-full px-3 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-700 text-sm font-medium">
                    Passenger Email
                  </label>
                  <input
                    type="email"
                    value={passengerInfo[seat]?.email || ""}
                    onChange={(e) =>
                      handleChange(seat, "email", e.target.value)
                    }
                    placeholder="Enter passenger email"
                    className="w-full px-3 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={!isFormValid() || isSubmitting}
              className={`
                  px-4 py-2 rounded-md text-white
                  ${
                    !isFormValid() || isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }
                `}
            >
              {isSubmitting ? "Submitting..." : "Confirm Booking"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
