import gsap from "gsap";

export const AnimationAppear = (element, duration = .3) => {
    gsap.fromTo(element, {
        opacity: 0
    }, {
        opacity: 1,
        duration: duration
    });
}