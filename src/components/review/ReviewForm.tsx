import { useState } from "react";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface ReviewFormProps {
  productId: string;
  onSubmit: (review: {
    rating: number;
    title: string;
    comment: string;
  }) => void;
}

export const ReviewForm = ({ productId, onSubmit }: ReviewFormProps) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please log in to write a review");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!title.trim()) {
      toast.error("Please enter a review title");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a review comment");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit({
        rating,
        title: title.trim(),
        comment: comment.trim(),
      });
      
      // Reset form
      setRating(0);
      setTitle("");
      setComment("");
      toast.success("Review submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground mb-4">
            Please log in to write a review
          </p>
          <Button asChild>
            <a href="/login">Log In</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Rating *
            </label>
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  onMouseEnter={() => setHoveredRating(i + 1)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-6 w-6 transition-colors ${
                      i < (hoveredRating || rating)
                        ? "fill-accent text-accent"
                        : "text-muted-foreground hover:text-accent"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating > 0 && (
                  rating === 1 ? "Poor" :
                  rating === 2 ? "Fair" :
                  rating === 3 ? "Good" :
                  rating === 4 ? "Very Good" :
                  "Excellent"
                )}
              </span>
            </div>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Review Title *
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your review in a few words"
              maxLength={100}
            />
          </div>

          {/* Comment */}
          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-2">
              Your Review *
            </label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell others about your experience with this product"
              rows={4}
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {comment.length}/1000 characters
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || rating === 0 || !title.trim() || !comment.trim()}
            className="w-full"
          >
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
