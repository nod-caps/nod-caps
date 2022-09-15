import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuickCapService {

    capList = [
        {
            name: 'Out of the Blue',
            metaTitle: 'Out of the Blue Baseball Cap - Light Blue | nod caps',
            metaDescription: 'Our light blue unstructured baseball cap is sure to get the nod of approval. Get your Out of the Blue nod cap from the Original Collection with free UK delivery.',
            description: 'Out of the Blue is part of the nod caps Original Collection. All of these caps feature a 6 panel design made from 100% cotton.',
            image: 'https://firebasestorage.googleapis.com/v0/b/projecttwo-c4839.appspot.com/o/images%2Fcaps%2FThe-Original-Collection%2FOut-of-the-Blue-1.jpg?alt=media&token=010eafb3-8499-4261-abc5-4409ab2dcee0'
        }, {
            name: 'Down to Earth',
            metaTitle: 'Down to Earth Baseball Cap - Olive Green | nod caps',
            metaDescription: 'The Down to Earth is nod just your average baseball cap. Get yours from the nod caps Original Collection today with free UK delivery. 100% cotton.',
            description: 'Down to Earth is part of the nod caps Original Collection. All of these caps feature a 6 panel design made from 100% cotton.',
            image: 'https://firebasestorage.googleapis.com/v0/b/projecttwo-c4839.appspot.com/o/images%2Fcaps%2FThe-Original-Collection%2FDown-to-Earth-1.jpg?alt=media&token=0921706f-8f91-43a3-9674-69edb2fadbf6'
        },{
            name: 'Devil Wears nod',
            metaTitle: 'Devil Wears nod Baseball Cap - Red | nod cap',
            metaDescription: "We've got you covered (literally) with this 100% cotton dark red dad cap. Get FREE delivery to the UK at nod caps. Devil wears nod is part of The Original Collection..",
            description: "As the brighter and bolder option of the Original Collection, the Devil Wears nod baseball cap is a real head-turner. This six panel, 100% cotton dad cap is designed to be worn anywhere and everywhere.  With a relaxed fit and rear adjustable strap. ",
            image: './assets/img/The-Original-Collection/DevilWearsNod1Mobile.jpg'
        }, {
            name: 'Black Sheep',
            metaTitle: 'The Black Sheep Baseball Cap - Black | nod caps',
            metaDescription: 'The Black Sheep from nod caps is the perfect addition to your everyday accessories. Buy this 100% cotton black dad cap and get free UK delivery. ',
            description: 'Daily Driver is part of the nod caps Original Collection. All of these caps feature a 6 panel design made from 100% cotton.',
            image: './assets/img/The-Original-Collection/DevilWearsNod1Mobile.jpg'
        }
    ]


  constructor() { }

 getCap(name: string) {
    return this.capList.find(item => item.name === name);
 }


}