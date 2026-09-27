import { AfterViewInit, Component, HostListener, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements AfterViewInit, OnDestroy {
  isLoading = false;
  isSticky = false;

  private loaderTimer?: ReturnType<typeof setTimeout>;

  ngAfterViewInit(): void {
    this.loaderTimer = setTimeout(() => {
      this.isLoading = false;
    }, 100);

    this.updateScrollState();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateScrollState();
  }

  private updateScrollState(): void {
    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop ||
      0;

    this.isSticky = scrollTop > 200;
  }

  ngOnDestroy(): void {
    if (this.loaderTimer) {
      clearTimeout(this.loaderTimer);
    }
  }
}
