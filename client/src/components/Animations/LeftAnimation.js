import gsap from "gsap";

export default function LeftAnimation(nameElement, duration = .3) {
    gsap.fromTo(nameElement, {
        x: 280
    }, {
        x: 0,
        ease: "back.out(1)",
        duration: duration
    });
}