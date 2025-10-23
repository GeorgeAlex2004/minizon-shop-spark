import { useState, useMemo } from "react";
import { Star, Filter, SortAsc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReviewCard } from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";
import { getReviewsByProductId, getAverageRating, getReviewCount } from "@/data/reviews";
import { Review } from "@/types";

interface ReviewsSectionProps {
  productId: string;
}

export const ReviewsSection = ({ productId }: ReviewsSectionProps) => {
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "highest" | "lowest" | "helpful">("newest");
  const [filterBy, setFilterBy] = useState<"all" | "5" | "4" | "3" | "2" | "1">("all");
  const [showForm, setShowForm] = useState(false);

  const reviews = getReviewsByProductId(productId);
  const averageRating = getAverageRating(productId);
  const reviewCount = getReviewCount(productId);

  // Rating distribution
  const ratingDistribution = useMemo(() => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  }, [reviews]);

  // Filtered and sorted reviews
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviews;

    // Filter by rating
    if (filterBy !== "all") {
      filtered = filtered.filter(review => review.rating === parseInt(filterBy));
    }

    // Sort reviews
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "highest":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest":
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case "helpful":
        filtered.sort((a, b) => b.helpful - a.helpful);
        break;
    }

    return filtered;
  }, [reviews, sortBy, filterBy]);

  const handleReviewSubmit = async (reviewData: {
    rating: number;
    title: string;
    comment: string;
  }) => {
    // In a real app, this would make an API call
    console.log("New review submitted:", reviewData);
    setShowForm(false);
  };

  const handleHelpful = (reviewId: string) => {
    // In a real app, this would make an API call
    console.log("Marked review as helpful:", reviewId);
  };

  if (reviewCount === 0) {
    return (
      <section className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Reviews</h2>
          <Button onClick={() => setShowForm(!showForm)}>
            Write a Review
          </Button>
        </div>

        {showForm && (
          <div className="mb-8">
            <ReviewForm productId={productId} onSubmit={handleReviewSubmit} />
          </div>
        )}

        <div className="text-center py-12">
          <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
          <p className="text-muted-foreground mb-4">
            Be the first to review this product!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          Write a Review
        </Button>
      </div>

      {showForm && (
        <div className="mb-8">
          <ReviewForm productId={productId} onSubmit={handleReviewSubmit} />
        </div>
      )}

      {/* Rating Summary */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Overall Rating */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Overall Rating</h3>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(averageRating)
                        ? "fill-accent text-accent"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Based on {reviewCount} review{reviewCount !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Rating Distribution</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingDistribution[rating as keyof typeof ratingDistribution];
              const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0;
              
              return (
                <div key={rating} className="flex items-center space-x-2">
                  <span className="text-sm w-8">{rating}</span>
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <Select value={filterBy} onValueChange={(value: any) => setFilterBy(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stars</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <SortAsc className="h-4 w-4" />
          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="lowest">Lowest Rated</SelectItem>
              <SelectItem value="helpful">Most Helpful</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredAndSortedReviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onHelpful={handleHelpful}
          />
        ))}
      </div>

      {filteredAndSortedReviews.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No reviews match your current filters.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setFilterBy("all")}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </section>
  );
};
