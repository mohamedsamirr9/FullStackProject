import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Nav } from '../../../shared/components/nav/nav';
import { Footeer } from '../../../shared/components/footeer/footeer';

@Component({
  selector: 'app-user-layout',
  imports: [RouterModule, Nav, Footeer],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.css',
})
export class UserLayout {}
