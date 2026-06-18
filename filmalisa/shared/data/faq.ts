// shared/data/faq.ts
// FAQ data — edit content here, Accordion component stays untouched.

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    id: "what-is-filmalisa",
    question: "What is Filmalisa?",
    answer:
      "Filmalisa is a movie search platform where you can discover, browse, and keep track of your favourite films and TV shows — all in one place.",
  },
  {
    id: "cost",
    question: "How much does Filmalisa cost?",
    answer:
      "Filmalisa is completely free to use. Create an account and start exploring instantly — no credit card required.",
  },
  {
    id: "where-watch",
    question: "Where can I watch?",
    answer:
      "You can access Filmalisa on any device with a browser — desktop, laptop, tablet, or phone. Watch anywhere, anytime.",
  },
  {
    id: "cancel",
    question: "How do I cancel?",
    answer:
      "You can delete your account at any time from your Account settings page. There are no subscriptions or commitments.",
  },
  {
    id: "what-content",
    question: "What can I watch on Filmalisa?",
    answer:
      "Filmalisa aggregates information on thousands of movies and TV shows across all genres. Use it to search titles, read details, and save your favourites.",
  },
  {
    id: "kids",
    question: "Is Filmalisa good for kids?",
    answer:
      "Yes. You can filter content by rating and genre to find age-appropriate titles. We recommend parents review selections together with younger children.",
  },
];
