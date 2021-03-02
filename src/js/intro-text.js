export default function (el, timeout = 4000, offset = 500) {
    const wrapper = document.querySelector(el);
    const items = wrapper.children;
    const lineHeight = getComputedStyle(items[0]).lineHeight;

    wrapper.style.height = lineHeight;
    for (let i of wrapper.children) {
        i.style.transition = "all " + offset / 1000 + "s";
    }

    setInterval(() => {
        const first = items[0];
        first.style.marginTop = `-${lineHeight}`;

        setTimeout(() => {
            wrapper.appendChild(items[0]);
            first.style.marginTop = "";
        }, offset);
    }, timeout);
}
