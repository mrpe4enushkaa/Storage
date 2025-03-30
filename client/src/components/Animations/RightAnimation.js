import gsap from "gsap";

export default function RightAnimation(nameElement, duration = .3){
    gsap.to(nameElement, {
        x: 380, 
        duration: duration
    });
}