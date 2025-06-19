"use client";
import React, { useEffect, useState } from "react";

interface Review {
  _id: string;
  productId: string;
  name: string;
  rating: number;
  text: string;
  status: string;
  createdAt: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchReviews = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/reviews?admin=1");
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data = await res.json();
      setReviews(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleAction = async (id: string, action: "publish" | "remove") => {
    setActionLoading(id + action);
    try {
      const res = await fetch("/api/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      if (!res.ok) throw new Error("Failed to update review");
      await fetchReviews();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-black mb-6">Customer Reviews Moderation</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 md:p-3 text-black font-bold">Product ID</th>
                <th className="p-2 md:p-3 text-black font-bold">Name</th>
                <th className="p-2 md:p-3 text-black font-bold">Rating</th>
                <th className="p-2 md:p-3 text-black font-bold">Text</th>
                <th className="p-2 md:p-3 text-black font-bold">Status</th>
                <th className="p-2 md:p-3 text-black font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id} className="border-b">
                  <td className="p-2 md:p-3 text-black font-bold">{review.productId}</td>
                  <td className="p-2 md:p-3 text-black font-bold">{review.name}</td>
                  <td className="p-2 md:p-3 text-black font-bold">{review.rating}</td>
                  <td className="p-2 md:p-3 text-black font-bold">{review.text}</td>
                  <td className="p-2 md:p-3 text-black font-bold">{review.status}</td>
                  <td className="p-2 md:p-3 flex gap-2">
                    {review.status === "pending" && (
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded"
                        onClick={() => handleAction(review._id, "publish")}
                        disabled={actionLoading === review._id + "publish"}
                      >
                        {actionLoading === review._id + "publish" ? "Publishing..." : "Publish"}
                      </button>
                    )}
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => handleAction(review._id, "remove")}
                      disabled={actionLoading === review._id + "remove"}
                    >
                      {actionLoading === review._id + "remove" ? "Removing..." : "Remove"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 