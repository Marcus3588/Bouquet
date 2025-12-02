//Handle client feedback
// admin/js/messages.js
// Sample messages (only runs once)
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('valspack_messages')) return;

  const sampleMessages = [
    { name: "Chioma Okeke", time: "2 min ago", subject: "Delivery Update Needed", preview: "Hello Val, please can you confirm if my order (#ORD-048) will arrive before 6pm today?", unread: true },
    { name: "Tunde Balogun", time: "15 min ago", subject: "Can I customize the card message?", preview: "Hi! Placing an order for the Pink Tulip Box. Can I write a longer message?", unread: true },
    { name: "Aisha Yusuf", time: "1 hour ago", subject: "Thank you so much!", preview: "The bouquet was absolutely stunning! My mom cried happy tears.", unread: false },
    { name: "David Okafor", time: "Yesterday", subject: "Bulk order for office", preview: "Good afternoon, we’d like to place a monthly order for 10 bouquets...", unread: false }
  ];
  localStorage.setItem('valspack_messages', JSON.stringify(sampleMessages));
});