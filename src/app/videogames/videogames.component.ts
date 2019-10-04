import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';
import { Videogames } from '../Videogames';

@Component({
  selector: 'app-videogames',
  templateUrl: './videogames.component.html',
  styleUrls: ['./videogames.component.scss'],
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

export class VideogamesComponent implements OnInit {

  itemCount : number = 1
  btnText : string = "Agregar un videogame"
  goalText : string = ""
  goalDeveloper : string = ""
  goalGamesystem : string = ""
  goalGenre : string = ""
  goalYear : number

  goals = [];

  constructor(private _data: DataService) { }

  ngOnInit() {
    this.getVideogames();
  }

  getVideogames() {
      
    return this._data.getVideogames()
     .subscribe((data: any) => {
      console.log("videogames :" + data );
      this.goals = data;
      //alert("entidades " + data);
    }) 
  
  } 
  addItem() {
    //this.goals.push(this.goalText);
    
    this.itemCount = this.goals.length;
    //this._data.changeGoal(this.goals);
    var mydata = new Videogames;
     
    mydata.name = this.goalText;
    mydata.developer = this.goalDeveloper;
    mydata.gamesystem = this.goalGamesystem;
    mydata.genre = this.goalGamesystem;
    mydata.year = this.goalYear;

    return this._data.postVideogames(mydata)
     .subscribe((data: any) => {
      console.log("pos videogames :" + data );
      this.goalText = '';
      this.goalDeveloper = '';
      this.goalGamesystem = '';
      this.goalGenre = '';
      this.goalYear = null;
      this.getVideogames();
  
      //this.goals = data;
      //alert("entidades " + data);
    }) 
  }
  
  removeItem(i) {
    //this.goals.splice(i, 1);
  //  this.itemCount = this.goals.length;
    //this._data.changeGoal(this.goals);
  return this._data.deleteVideogames(i)
    .subscribe((data: any) => {
     console.log("deleted entidad :" + data );
     //alert("id" + i);
     this.getVideogames();
  
     //this.goals = data;
     //alert("entidades " + data);
   }) 
  
  
  
  }


}
