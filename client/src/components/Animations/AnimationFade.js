import gsap from "gsap";

export const AnimationFade = (element, duration = .3) => {
    gsap.fromTo(element, {
        opacity: 1
    }, {
        opacity: 0,
        duration: duration
    });
}