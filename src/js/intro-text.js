export default function (el, timeout = 3000, animate = 400) {
    const wrapper = document.querySelector(el);
    const items = wrapper.children;
    const lineHeight = getComputedStyle(items[0]).lineHeight;

    wrapper.style.height = lineHeight;

    setInterval(() => {
        const first = items[0];
        first.style.marginTop = `-${lineHeight}`;

        setTimeout(() => {
            wrapper.appendChild(items[0]);
            first.style.marginTop = "";
        }, animate);
    }, timeout);
}
