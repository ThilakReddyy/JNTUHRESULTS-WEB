self.addEventListener("push", function (event) {
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/android-chrome-512x512.png",
      url: "https://jntuhresults.vercel.app/academicresult",
    }),
  );
});
