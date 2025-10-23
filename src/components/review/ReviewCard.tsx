import { Star, ThumbsUp, CheckCircle } from "lucide-react";
import { Review } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ReviewCardProps {
  review: Review;
  onHelpful?: (reviewId: string) => void;
}

export const ReviewCard = ({ review, onHelpful }: ReviewCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="border rounded-lg p-6 space-y-4">
      {/* Review Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={review.userAvatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"}
            alt={review.userName}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold">{review.userName}</h4>
              {review.verified && (
                <Badge variant="secondary" className="text-xs">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified Purchase
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{formatDate(review.date)}</p>
          </div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < review.rating
                  ? "fill-accent text-accent"
                  : "text-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Review Content */}
      <div className="space-y-2">
        <h5 className="font-medium text-lg">{review.title}</h5>
        <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
      </div>

      {/* Helpful Button */}
      <div className="flex items-center justify-between pt-2 border-t">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onHelpful?.(review.id)}
          className="text-muted-foreground hover:text-foreground"
        >
          <ThumbsUp className="h-4 w-4 mr-1" />
          Helpful ({review.helpful})
        </Button>
      </div>
    </div>
  );
};
