import { AnimationFade } from "../../../components/Animations/AnimationFade";
import { AnimationAppear } from "../../../components/Animations/AnimationAppear";

export const visibleForm = (loading) => {
    document.querySelector('.loader').style.display = loading ? 'inline-block' : 'none';

    document.querySelector('.back-button').disabled = loading ? true : false;

    if (loading) {
        AnimationFade("#form-indefication");
        AnimationFade("#changeForm");
        AnimationFade(".back-button");
        AnimationAppear(".loader");
    } else if (!loading) {
        AnimationAppear("#form-indefication");
        AnimationAppear("#changeForm");
        AnimationAppear(".back-button");
        AnimationFade(".loader");
    }
}