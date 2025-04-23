const handleChange = (seatNumber, field, value) => {
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
      passengerInfo[seat].passengerName.trim() !== "" &&
      passengerInfo[seat].phoneNumber.trim() !== "" &&
      passengerInfo[seat].email.trim() !== ""
  );
};

<div className="space-y-2">
  <label className="block text-gray-700 text-sm font-medium">
    Passenger Name
  </label>
  <input
    type="text"
    value={passengerInfo[seat]?.passengerName || ""}
    onChange={(e) => handleChange(seat, 'passengerName', e.target.value)}
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
    onChange={(e) => handleChange(seat, 'phoneNumber', e.target.value)}
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
    onChange={(e) => handleChange(seat, 'email', e.target.value)}
    placeholder="Enter passenger email"
    className="w-full px-3 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />
</div> 