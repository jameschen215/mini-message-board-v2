// public/js/sticky-notes.js
document.addEventListener("DOMContentLoaded", function () {
  const notes = document.querySelectorAll("a.note");
  const colors = [
    "bg-yellow-300",
    "bg-pink-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-purple-300",
  ];

  console.log(notes);
  notes.forEach((note, index) => {
    // Small random offset within grid cell (max 20px in any direction)
    const offsetX = (Math.random() - 0.5) * 40; // -20px to 20px
    const offsetY = (Math.random() - 0.5) * 40; // -20px to 20px
    const rotation = (Math.random() - 0.5) * 8; // -4 to 4 degrees

    // Random color
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Apply styles - translate keeps it in grid but adds messiness
    note.style.transform = `rotate(${rotation}deg) translate(${offsetX}px, ${offsetY}px)`;
  });
});
