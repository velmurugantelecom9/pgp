import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  showBackToTop = false;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop ||
      0;

    this.showBackToTop = scrollTop > 300;
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
