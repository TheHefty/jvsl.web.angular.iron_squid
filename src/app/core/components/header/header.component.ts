import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  menuItems: { name: string; route: string }[] = [
    { name: 'Home', route: '/home' },
    { name: 'Challenges', route: '/challenges' },
  ];

  constructor(private router: Router) {}

  isMenuActive(route: string) {
    return this.router.url.startsWith(route);
  }
}
