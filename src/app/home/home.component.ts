import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';
import { Entidades } from '../entidades';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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

export class HomeComponent implements OnInit {
  
  itemCount : number = 1
  btnTxt : string = "Agregar un gamesystem"
  goalText : string = "Nombre..."
  goals = [];

constructor(private _data: DataService) { }

ngOnInit() {
  //this.itemCount = this.goals.length;
  //this._data.goal.subscribe(res => this.goals = res);
  //this._data.changeGoal(this.goals);
  this.getEntidades();
}

getEntidades() {
      
  return this._data.getEntidades()
   .subscribe((data: any) => {
    console.log("entidades :" + data );
    this.goals = data;
    //alert("entidades " + data);
  }) 

} 
addItem() {
  //this.goals.push(this.goalText);
  
  //this.itemCount = this.goals.length;
  //this._data.changeGoal(this.goals);
  var mydata = new Entidades;
   
  mydata.name = this.goalText;
  mydata.description = this.goalText;

  return this._data.postEntidades(mydata)
   .subscribe((data: any) => {
    console.log("pos entidades :" + data );
    this.goalText = '';
    this.getEntidades();

    //this.goals = data;
    //alert("entidades " + data);
  }) 
}

removeItem(i) {
  //this.goals.splice(i, 1);
//  this.itemCount = this.goals.length;
  //this._data.changeGoal(this.goals);
return this._data.deleteEntidades(i)
  .subscribe((data: any) => {
   console.log("deleted entidad :" + data );
   //alert("id" + i);
   this.getEntidades();

   //this.goals = data;
   //alert("entidades " + data);
 }) 



}
}
