import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';
import { Pokemones } from '../Pokemones';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemones.component.html',
  styleUrls: ['./pokemones.component.scss'],
  animations: [
    trigger ('goals', [
      transition('* => *', [
        query(':enter', style({opacity:0}), {optional : true}),
        query(':enter', stagger ('300ms', [
          animate('.6s ease-in', keyframes([
            
            style({opacity:0, transform: 'translateY(-75%)', offset:0}),
            style({opacity:0.5, transform: 'translateY(35px)', offset:0.3}),
            style({opacity:1, transform: 'translateY(0)', offset:1}),

          ]))]), {optional:true}),
          query(':leave', stagger ('300ms', [
            animate('.6s ease-in', keyframes([
              
              style({opacity:1, transform: 'translateY(0)', offset:0}),
              style({opacity:0.5, transform: 'translateY(35px)', offset:0.3}),
              style({opacity:0, transform: 'translateY(-75%)', offset:1}),
            ]))]), {optional:true})
          ])
        ])
      ]
    })

export class PokemonesComponent implements OnInit {

  itemCount : number = 1
  btnText : string = "Agregar un pokemon"
  goalText : string = ""
  goalDes : string = ""
  goalImagelink : string = ""
  goalPower : number
  goalLocationlat : string = ""
  goalLocationlong : string = ""
  goalIscatch : boolean 

  goals = [];

  constructor(private _data: DataService) { }

  ngOnInit() {
    this.getPokemones();
  }

  getPokemones() {
      
    return this._data.getPokemones()
     .subscribe((data: any) => {
      console.log("pokemones :" + data );
      this.goals = data;
      //alert("entidades " + data);
    }) 
  
  } 
  addItem() {
    //this.goals.push(this.goalText);
    
    this.itemCount = this.goals.length;
    //this._data.changeGoal(this.goals);
    var mydata = new Pokemones;
     
    mydata.name = this.goalText;
    mydata.des = this.goalDes;
    mydata.imageLink = this.goalImagelink;
    mydata.power = this.goalPower;
    mydata.locationLat = this.goalLocationlat;
    mydata.locationLong = this.goalLocationlong;
    mydata.isCatch = this.goalIscatch;

    return this._data.postVideogames(mydata)
     .subscribe((data: any) => {
      console.log("pos videogames :" + data );
      this.goalText = '';
      this.goalDes = '';
      this.goalImagelink = '';
      this.goalPower = null;
      this.goalLocationlat = '';
      this.goalLocationlong = '';
      this.goalIscatch = true;
      this.getPokemones();
  
      //this.goals = data;
      //alert("entidades " + data);
    }) 
  }
  
  removeItem(i) {
    //this.goals.splice(i, 1);
  //  this.itemCount = this.goals.length;
    //this._data.changeGoal(this.goals);
  return this._data.deletePokemones(i)
    .subscribe((data: any) => {
     console.log("deleted pokemon :" + data );
     //alert("id" + i);
     this.getPokemones();
  
     //this.goals = data;
     //alert("entidades " + data);
   }) 
  
  
  
  }


}