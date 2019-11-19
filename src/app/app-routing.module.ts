import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'; //Add this
import { AboutComponent } from './about/about.component'; //Add this
import { VideogamesComponent } from './videogames/videogames.component';
import { PokemonesComponent } from './pokemones/pokemones.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'videogames',
    component: VideogamesComponent
  },
  {
    path: 'pokemones',
    component: PokemonesComponent
  },
  {
    path: 'about/:id',
    component: AboutComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
