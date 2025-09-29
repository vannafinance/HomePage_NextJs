"use client";

import React, {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  useCallback,
} from "react";
import TiltImage from "@/components/Interactive";
import Notification from "@/components/notification";
import { supabase } from "@/lib/supabase";

// Define User type for authenticated user
interface User {
  id: string;
  email?: string;
  aud?: string;
  role?: string;
  email_confirmed_at?: string;
  phone?: string;
  confirmed_at?: string;
  last_sign_in_at?: string;
}

// Define EligibilityResult type
interface EligibilityResult {
  groupId: string;
  groupName: string;
  conditionsMet: boolean;
  eligibleRewards: Array<{
    expression: string;
    eligible: boolean;
    rewardType: string;
    rewardCount: number;
  }>;
}

interface WaitlistFormData {
  evm_address: string;
  email: string;
  discord: string;
  x_handle: string;
  telegram_handle: string;
}

interface NotificationType {
  id: number;
  type: "success" | "error" | "info";
  message: string;
}

interface EligibilityResponse {
  questId: string;
  userAddress: string;
  isCompleted: boolean;
  isEligible: boolean;
  isQuestActive: boolean;
  eligibilityDetails: EligibilityResult[];
  questName: string;
  questStatus: string;
}

export default function JoinWaitlist() {
  const [authenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [formData, setFormData] = useState<WaitlistFormData>({
    evm_address: "",
    email: "",
    discord: "",
    x_handle: "",
    telegram_handle: "",
  });
  const [checkEvm, setCheckEvm] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popUpJoinwaitlist, setJoinwaitlistpop] = useState(false);
  const [popUpJoinwaitlistmessage, setJoinwaitlistMessage] = useState("");

  // Notification helpers
  const addNotification = (type: NotificationType["type"], message: string) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);
  };
  const removeNotification = (id: number) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  // Authenticate user via API route
  const authenticateUser = useCallback(async () => {
    try {
      const response = await fetch("/api/auth");
      const data = await response.json();
      if (data.status === 200 && data.message) {
        setUser(data.message);
        setIsAuthenticated(true);
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown authentication error";
      addNotification("error", `Authentication error: ${errorMessage}`);
    }
  }, []);

  useEffect(() => {
    authenticateUser();
  }, [authenticateUser]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check Galxe quest completion via API route
    const questId = "GCaUtt8sek"; // Replace with actual quest ID
    try {
      addNotification("info", "Verifying quest completion on Galxe...");
      const response = await fetch("/api/check-eligibility", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questId, userAddress: formData.evm_address }),
      });
      const eligibility: EligibilityResponse = await response.json();

      if (!response.ok || !eligibility.isCompleted) {
        setJoinwaitlistpop(true);
        setJoinwaitlistMessage(
          `Quest not completed for ${formData.evm_address}. Complete the Galxe quest first to join the waitlist.`
        );
        return;
      }

      addNotification("success", `Quest completed! Proceeding to waitlist...`);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      console.error("Galxe check failed:", err);
      setJoinwaitlistpop(true);
      setJoinwaitlistMessage(
        `Error checking quest completion: ${errorMessage}. Please try again.`
      );
      return;
    }

    if (!authenticated || !user) {
      addNotification(
        "error",
        "You must be authenticated to join the waitlist."
      );
      return;
    }

    if (!formData.email || !formData.evm_address) {
      addNotification("error", "Email and EVM Address are mandatory.");
      return;
    }

    try {
      const { data: existing, error: checkError } = await supabase
        .from("waitlist")
        .select("id")
        .or(
          `email.eq.${formData.email},evm_address.eq.${formData.evm_address}`
        );

      if (checkError) throw checkError;

      if (existing?.length > 0) {
        addNotification(
          "error",
          "Email or EVM Address already exists in the waitlist."
        );
        return;
      }

      const { error } = await supabase.from("waitlist").insert([
        {
          evm_address: formData.evm_address,
          email: formData.email,
          discord: formData.discord,
          x_handle: formData.x_handle,
          telegram_handle: formData.telegram_handle,
          user_id: user?.id || null, // Ensure user_id is not undefined
        },
      ]);

      if (error) throw error;

      addNotification("success", "Successfully joined the waitlist!");
      setFormData({
        evm_address: "",
        email: "",
        discord: "",
        x_handle: "",
        telegram_handle: "",
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to join waitlist";
      console.error("Form submission error:", errorMessage);
      addNotification("error", `Failed to join waitlist: ${errorMessage}`);
    }
  };

  const handleCheckEvm = async () => {
    if (!checkEvm) {
      setPopupMessage("Please enter an EVM address to check.");
      setPopupVisible(true);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("waitlist")
        .select("id,email")
        .eq("evm_address", checkEvm);

      if (error) throw error;

      setPopupMessage(
        data?.length > 0
          ? `EVM Address exists in waitlist! Email: ${data[0].email}`
          : "EVM Address not found in waitlist."
      );
      setPopupVisible(true);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setPopupMessage(`Error checking EVM address: ${errorMessage}`);
      setPopupVisible(true);
    }
  };

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto min-h-screen px-4 py-10">
        <div className="notification-container fixed top-4 right-4 space-y-2">
          {notifications.map((n) => (
            <Notification
              key={n.id}
              type={n.type}
              message={n.message}
              onClose={() => removeNotification(n.id)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 shadow-[8px_8px_8px_8px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden">
          <div className="p-6 md:p-12 flex flex-col justify-center">
            <p className="p-3 rounded-lg text-left mt-2 sm:mt-4 mb-6 text-sm sm:text-base leading-7 text-purple-500 bg-[#F2ECFE]">
              Just share your real IDs which you use in Galxe quest, or you
              might get disqualified from the race!
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {Object.entries(formData).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                    {key.replace("_", " ").toUpperCase()}
                  </label>
                  <input
                    type={key === "email" ? "email" : "text"}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    placeholder={`Your ${key.replace("_", " ")}`}
                    className="mt-1 w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-purple-500 focus:ring focus:ring-purple-300"
                    required={key === "email" || key === "evm_address"}
                  />
                </div>
              ))}

              <button
                type="submit"
                className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-[#F5ABA1] to-[#703AE6] py-3 text-white font-semibold hover:opacity-90 transition"
                disabled={!authenticated}
              >
                Join Waitlist
              </button>
            </form>

            <div className="mb-4 flex gap-2 mt-4">
              <input
                type="text"
                placeholder="Check EVM Address"
                value={checkEvm}
                onChange={(e) => setCheckEvm(e.target.value)}
                className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-purple-500 focus:ring focus:ring-purple-300"
              />
              <button
                onClick={handleCheckEvm}
                className="bg-purple-600 text-white px-4 py-3 rounded-xl hover:bg-purple-700"
              >
                Check
              </button>
            </div>

            {/* Galxe Verification Failed Popup */}
            {popUpJoinwaitlist && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div
                  className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-md"
                  onClick={() => setJoinwaitlistpop(false)}
                ></div>
                <div className="relative bg-white rounded-xl p-6 max-w-md w-full text-center shadow-lg z-60 max-h-[80vh] overflow-y-auto">
                  <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
                    onClick={() => setJoinwaitlistpop(false)}
                    aria-label="Close"
                  >
                    &#x2715;
                  </button>
                  <div className="mb-4 text-6xl">⚠️</div>
                  <h3 className="text-lg font-semibold text-red-600 mb-2">
                    Galxe Verification Failed
                  </h3>
                  <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                    {popUpJoinwaitlistmessage ||
                      "Your EVM address couldn't be verified on Galxe. To avoid disqualification from quests and the waitlist race, please complete verification first. Once verified, return here to join securely!"}
                  </p>
                  <div className="space-y-3">
                    <a
                      href="https://app.galxe.com/quest/VannaProtocol/GCaUtt8sek"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 font-semibold transition"
                    >
                      Verify on Galxe
                    </a>
                    <button
                      className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 font-semibold transition"
                      onClick={() => setJoinwaitlistpop(false)}
                    >
                      Try Again
                    </button>
                  </div>
                  <p className="mt-4 text-xs text-gray-500">
                    Need help?{" "}
                    <a
                      href="https://docs.galxe.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-600"
                    >
                      Galxe Docs
                    </a>
                  </p>
                </div>
              </div>
            )}

            {popupVisible && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div
                  className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-md"
                  onClick={() => setPopupVisible(false)}
                ></div>
                <div className="relative bg-white rounded-xl p-6 max-w-md w-full text-center shadow-lg z-60">
                  <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    onClick={() => setPopupVisible(false)}
                    aria-label="Close"
                  >
                    &#x2715;
                  </button>
                  <p className="mb-4">{popupMessage}</p>
                  <button
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    onClick={() => setPopupVisible(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-6 hidden md:flex justify-center items-center">
            <TiltImage src="right.svg" alt="Dashboard Preview" />
          </div>
        </div>
      </div>
    </section>
  );
}
