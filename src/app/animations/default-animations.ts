import { createAnimation } from '@ionic/core';

export const enterAnimation = (baseEl: any) => { // HTMLElement
    const backdropAnimation = createAnimation()
        .addElement(baseEl.querySelector('ion-backdrop'))
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = createAnimation()
        .addElement(baseEl.querySelector('.modal-wrapper'))
        .keyframes([
            { offset: 0, opacity: '0', transform: 'translate3D(100%,0,0)' },  //  scale(0)
            { offset: 1, opacity: '0.99', transform: 'translate3D(0,0,0)' } // scale(1)
        ]);

    return createAnimation()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(200)
        .addAnimation([backdropAnimation, wrapperAnimation]);
};

export const leaveAnimation = ( baseEl: any) => {
    return enterAnimation(baseEl).direction('reverse');
}