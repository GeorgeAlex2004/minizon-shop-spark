import { Review } from "@/types";

export const reviews: Review[] = [
  // Reviews for Premium Wireless Headphones (id: "1")
  {
    id: "r1",
    productId: "1",
    userId: "u1",
    userName: "Sarah Johnson",
    userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
    rating: 5,
    title: "Excellent sound quality!",
    comment: "These headphones are amazing! The noise cancellation works perfectly and the sound quality is crystal clear. Battery life is also impressive - I can use them all day without charging. Highly recommend!",
    date: "2024-01-15",
    verified: true,
    helpful: 12
  },
  {
    id: "r2",
    productId: "1",
    userId: "u2",
    userName: "Mike Chen",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    rating: 4,
    title: "Great headphones with minor issues",
    comment: "Overall very satisfied with the purchase. Sound quality is excellent and the build feels premium. The only downside is that the ear cups can get a bit warm during long listening sessions. Still worth the money!",
    date: "2024-01-10",
    verified: true,
    helpful: 8
  },
  {
    id: "r3",
    productId: "1",
    userId: "u3",
    userName: "Emily Davis",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    rating: 5,
    title: "Perfect for work from home",
    comment: "I use these for video calls and music while working. The microphone quality is great and the noise cancellation helps me focus. The comfort is outstanding - I can wear them for hours without discomfort.",
    date: "2024-01-08",
    verified: true,
    helpful: 15
  },

  // Reviews for Smart Fitness Watch (id: "2")
  {
    id: "r4",
    productId: "2",
    userId: "u4",
    userName: "David Wilson",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    rating: 5,
    title: "Game changer for fitness tracking",
    comment: "This watch has completely transformed my fitness routine. The heart rate monitoring is accurate, sleep tracking is detailed, and the battery lasts a full week. The app integration is seamless. Love it!",
    date: "2024-01-12",
    verified: true,
    helpful: 20
  },
  {
    id: "r5",
    productId: "2",
    userId: "u5",
    userName: "Lisa Anderson",
    userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    rating: 4,
    title: "Great features, could be more comfortable",
    comment: "The fitness tracking features are comprehensive and accurate. The GPS works well for running. My only complaint is that the band can feel a bit tight during intense workouts. Overall, very happy with the purchase.",
    date: "2024-01-05",
    verified: true,
    helpful: 6
  },

  // Reviews for Professional Camera (id: "3")
  {
    id: "r6",
    productId: "3",
    userId: "u6",
    userName: "Alex Rodriguez",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    rating: 5,
    title: "Professional quality at an amazing price",
    comment: "As a professional photographer, I'm impressed with the image quality and build of this camera. The autofocus is fast and accurate, and the low-light performance is excellent. This is a steal at this price point!",
    date: "2024-01-14",
    verified: true,
    helpful: 18
  },
  {
    id: "r7",
    productId: "3",
    userId: "u7",
    userName: "Jessica Brown",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    rating: 4,
    title: "Great camera for beginners",
    comment: "I'm new to photography and this camera has been perfect for learning. The interface is intuitive and the image quality is fantastic. The only learning curve is understanding all the manual settings, but that's expected.",
    date: "2024-01-09",
    verified: true,
    helpful: 9
  },

  // Reviews for Gaming Laptop (id: "4")
  {
    id: "r8",
    productId: "4",
    userId: "u8",
    userName: "Ryan Thompson",
    userAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
    rating: 5,
    title: "Beast of a gaming machine",
    comment: "This laptop handles everything I throw at it. Games run smoothly at high settings, the display is crisp, and the keyboard feels great for gaming. The cooling system keeps it from overheating during long sessions.",
    date: "2024-01-11",
    verified: true,
    helpful: 22
  },
  {
    id: "r9",
    productId: "4",
    userId: "u9",
    userName: "Amanda Lee",
    userAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100",
    rating: 4,
    title: "Powerful but heavy",
    comment: "The performance is incredible for gaming and content creation. However, it's quite heavy and the battery life isn't great when gaming. Perfect for desktop replacement, but not ideal for frequent travel.",
    date: "2024-01-07",
    verified: true,
    helpful: 11
  },

  // Reviews for Wireless Speaker (id: "5")
  {
    id: "r10",
    productId: "5",
    userId: "u10",
    userName: "Chris Martinez",
    userAvatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100",
    rating: 5,
    title: "Amazing sound for the size",
    comment: "I'm blown away by the sound quality from such a compact speaker. The bass is surprisingly deep and the overall sound is well-balanced. Perfect for outdoor activities and parties. Waterproof feature is a bonus!",
    date: "2024-01-13",
    verified: true,
    helpful: 14
  },
  {
    id: "r11",
    productId: "5",
    userId: "u11",
    userName: "Rachel Green",
    userAvatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100",
    rating: 4,
    title: "Great portable speaker",
    comment: "Love the portability and sound quality. The battery lasts all day and the Bluetooth connection is stable. The only minor issue is that it can get a bit quiet at maximum volume in noisy environments.",
    date: "2024-01-06",
    verified: true,
    helpful: 7
  },

  // Reviews for Smartphone (id: "6")
  {
    id: "r12",
    productId: "6",
    userId: "u12",
    userName: "Kevin Park",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    rating: 5,
    title: "Best phone I've ever owned",
    comment: "The camera system is incredible - photos look professional quality. The battery life is excellent and charges super fast. The display is gorgeous and the performance is smooth. Worth every penny!",
    date: "2024-01-16",
    verified: true,
    helpful: 25
  },
  {
    id: "r13",
    productId: "6",
    userId: "u13",
    userName: "Michelle Taylor",
    userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
    rating: 4,
    title: "Great phone with minor drawbacks",
    comment: "Overall excellent phone with amazing features. The camera is outstanding and the performance is top-notch. My only complaints are the price and the fact that it's quite large for smaller hands.",
    date: "2024-01-04",
    verified: true,
    helpful: 13
  },

  // Reviews for Tablet (id: "7")
  {
    id: "r14",
    productId: "7",
    userId: "u14",
    userName: "Daniel Kim",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    rating: 5,
    title: "Perfect for productivity and entertainment",
    comment: "This tablet is fantastic for both work and play. The screen is beautiful, the performance is smooth, and the battery lasts all day. Great for reading, watching videos, and even light productivity tasks.",
    date: "2024-01-17",
    verified: true,
    helpful: 16
  },
  {
    id: "r15",
    productId: "7",
    userId: "u15",
    userName: "Sophie Williams",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    rating: 4,
    title: "Great tablet, wish it had more storage",
    comment: "Love the display quality and the overall user experience. The only issue is that the base storage fills up quickly with apps and media. Would recommend getting the higher storage option if you plan to use it heavily.",
    date: "2024-01-03",
    verified: true,
    helpful: 10
  },

  // Reviews for Wireless Earbuds (id: "8")
  {
    id: "r16",
    productId: "8",
    userId: "u16",
    userName: "Tom Wilson",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    rating: 5,
    title: "Perfect earbuds for daily use",
    comment: "These earbuds are exactly what I needed. Great sound quality, comfortable fit, and the case is compact. The noise cancellation works well and the battery life is impressive. Highly recommend!",
    date: "2024-01-18",
    verified: true,
    helpful: 19
  },
  {
    id: "r17",
    productId: "8",
    userId: "u17",
    userName: "Nina Patel",
    userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    rating: 4,
    title: "Good earbuds with room for improvement",
    comment: "Solid earbuds with good sound quality and decent battery life. The fit is comfortable for most people. My only wish is that they had better water resistance for workouts. Overall satisfied with the purchase.",
    date: "2024-01-02",
    verified: true,
    helpful: 5
  },

  // Reviews for Mechanical Keyboard (id: "9")
  {
    id: "r18",
    productId: "9",
    userId: "u18",
    userName: "Jake Miller",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    rating: 5,
    title: "Typing experience is incredible",
    comment: "This keyboard has completely changed my typing experience. The mechanical switches feel amazing and the build quality is top-notch. Perfect for both gaming and productivity. Worth every penny!",
    date: "2024-01-19",
    verified: true,
    helpful: 21
  },
  {
    id: "r19",
    productId: "9",
    userId: "u19",
    userName: "Grace Chen",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    rating: 4,
    title: "Great keyboard, loud switches",
    comment: "Love the feel and responsiveness of this keyboard. The RGB lighting is beautiful and customizable. The only downside is that the switches are quite loud, which might bother others in shared spaces.",
    date: "2024-01-01",
    verified: true,
    helpful: 8
  },

  // Reviews for Monitor (id: "10")
  {
    id: "r20",
    productId: "10",
    userId: "u20",
    userName: "Brandon Davis",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    rating: 5,
    title: "Stunning display quality",
    comment: "This monitor is absolutely gorgeous. The colors are vibrant and accurate, the resolution is crisp, and the refresh rate is smooth for gaming. The adjustable stand is a nice touch. Highly recommend for professionals and gamers alike.",
    date: "2024-01-20",
    verified: true,
    helpful: 17
  }
];

// Helper function to get reviews for a specific product
export const getReviewsByProductId = (productId: string): Review[] => {
  return reviews.filter(review => review.productId === productId);
};

// Helper function to get average rating for a product
export const getAverageRating = (productId: string): number => {
  const productReviews = getReviewsByProductId(productId);
  if (productReviews.length === 0) return 0;
  
  const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / productReviews.length;
};

// Helper function to get review count for a product
export const getReviewCount = (productId: string): number => {
  return getReviewsByProductId(productId).length;
};
