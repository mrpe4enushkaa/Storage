import { AnimationFade } from "../components/Animations/AnimationFade";
import { AnimationAppear } from "../components/Animations/AnimationAppear";

export const visibleForm = (loading, isSignIn) => {
    // document.getElementById("form-indefication").style.display = loading ? 'none' : 'flex';
    // document.getElementById("changeForm").style.display = loading ? 'none' : 'block';

    document.querySelector('.loader').style.top = isSignIn ? '12.5vh' : '20.5vh';
    document.querySelector('.loader').style.display = loading ? 'inline-block' : 'none';

    if (loading) {
        AnimationFade("#form-indefication");
        AnimationFade("#changeForm");
        AnimationAppear(".loader");
    } else if (!loading) {
        AnimationFade(".loader");
        AnimationAppear("#form-indefication");
        AnimationAppear("#changeForm");
    }
}