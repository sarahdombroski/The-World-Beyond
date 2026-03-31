// Index.html
import { createSparkle } from "./utils.mjs"

document.addEventListener('mousemove', (e) => {
    createSparkle(e.clientX, e.clientY);
})

let lastSparkle = 0;

document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastSparkle > 30) {
        createSparkle(e.clientX, e.clientY);
        lastSparkle = now;
    }
});

document.addEventListener("click", (e) => {
    for (let i = 0; i < 10; i++) {
        createSparkle(e.clientX, e.clientY);
    }
});