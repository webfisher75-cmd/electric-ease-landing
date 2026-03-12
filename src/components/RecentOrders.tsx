import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";

const NAMES = [
  "Rahul", "Amit", "Priya", "Suresh", "Neha", "Vikram", "Ananya", "Ravi",
  "Divya", "Sanjay", "Pooja", "Karan", "Meera", "Arjun", "Sunita", "Deepak",
  "Kavita", "Mohit", "Anjali", "Rajesh", "Sneha", "Arun", "Rekha", "Gaurav",
  "Nisha", "Manoj", "Seema", "Rohit", "Poonam", "Vijay",
];

const LOCATIONS = [
  "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Pune", "Jaipur",
  "Lucknow", "Ahmedabad", "Kolkata", "Surat", "Nagpur", "Patna", "Bhopal",
  "Indore", "Chandigarh", "Vadodara", "Coimbatore", "Kochi", "Visakhapatnam",
  "Agra", "Varanasi", "Meerut", "Ludhiana", "Nashik", "Rajkot", "Madurai",
  "Mysore", "Jodhpur", "Ranchi",
];

function getRandomEntry() {
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
  const minutes = Math.floor(Math.random() * 25) + 1; // 1 to 25 min ago
  return { name, location, minutes };
}

export function RecentOrders() {
  const [order, setOrder] = useState(getRandomEntry());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    const intervalId = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setOrder(getRandomEntry());
        setIsVisible(true);
      }, 500);
    }, 7000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white border border-gray-200 rounded-xl shadow-xl p-3 z-40 transition-all duration-500 ease-in-out transform flex items-center gap-3 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
        <ShoppingBag className="w-4 h-4 text-green-600" />
      </div>
      <div className="flex flex-col">
        <p className="text-sm text-gray-800 font-semibold leading-tight">
          {order.name} from {order.location}
        </p>
        <p className="text-xs text-gray-500">
          ordered Greenchef JAWA •{" "}
          <span className="text-green-600 font-medium">{order.minutes} min ago</span>
        </p>
      </div>
      <div className="ml-auto flex-shrink-0">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      </div>
    </div>
  );
}
