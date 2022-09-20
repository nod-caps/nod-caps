import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuickCapService {

    capList = [
        {
            name: 'Black Sheep',
            metaTitle: 'The Black Sheep Baseball Cap - Black | nod caps',
            metaDescription: 'The Black Sheep from nod caps is the perfect addition to your everyday accessories. Buy this 100% cotton black dad cap and get free UK delivery.',
            description: 'This black casual baseball cap featuring our signature feather logo is the perfect accessory to grab on your way out the door. With an adjustable rear buckle strap, all the nod Original Collection caps offer a relaxed and unstructured fit for that laid-back, not trying too hard look.',
            imageMobile: 'https://nod-caps.web.app/assets/img/The-Original-Collection/Black-Sheep-Mobile.jpg',
            imageLarge: 'https://nod-caps.web.app/assets/img/The-Original-Collection/Black-Sheep-Large.jpg'
        },
        {
            name: 'Devil Wears nod',
            metaTitle: 'Devil Wears nod Baseball Cap - Red | nod cap',
            metaDescription: "We've got you covered (literally) with this 100% cotton dark red dad cap. Get FREE delivery to the UK at nod caps. Devil wears nod is part of The Original Collection..",
            description: "As the brighter and bolder option of the Original Collection, the Devil Wears nod baseball cap is a real head-turner. This six panel, 100% cotton dad cap is designed to be worn anywhere and everywhere.  With a relaxed fit and rear adjustable strap.",
            imageMobile: 'https://nod-caps.web.app/assets/img/The-Original-Collection/Devil-Wears-nod-Mobile.jpg',
            imageLarge: 'https://nod-caps.web.app/assets/img/The-Original-Collection/Devil-Wears-nod-Large.jpg'
        }, {
            name: 'Down to Earth',
            metaTitle: 'Down to Earth Baseball Cap - Olive Green | nod caps',
            metaDescription: 'The Down to Earth is nod just your average baseball cap. Get yours from the nod caps Original Collection today with free UK delivery. 100% cotton.',
            description: 'Sunny days, rainy days, windy days, cold days - these are all perfect conditions to throw on a baseball cap.  Our 100% cotton, Down to Earth dad cap provides a fuss-free look to finish off any outfit making it a year-round essential.',
            imageMobile: 'https://nod-caps.web.app/assets/img/The-Original-Collection/Down-to-Earth-Mobile.jpg',
            imageLarge: 'https://nod-caps.web.app/assets/img/The-Original-Collection/Down-to-Earth-Large.jpg'
        },{
            name: 'Out of the Blue',
            metaTitle: 'Out of the Blue Baseball Cap - Light Blue | nod caps',
            metaDescription: 'Our light blue unstructured baseball cap is sure to get the nod of approval. Get your Out of the Blue nod cap from the Original Collection with free UK delivery.',
            description: "Whether you're taking the dog for a walk or just trying to cover up a bad hair day, this Out of the Blue nod dad cap is sure to get the nod of approval. Our light blue baseball cap's rear buckle strap can be adjusted for the perfect fit.",
            imageMobile: 'https://nod-caps.web.app/assets/img/The-Original-Collection/Out-of-the-Blue-Mobile.jpg',
            imageLarge: 'https://nod-caps.web.app/assets/img/The-Original-Collection/Out-of-the-Blue-Large.jpg'
        },
    ]


  constructor() { }

 getCap(name: string) {
    return this.capList.find(item => item.name === name);
 }


}