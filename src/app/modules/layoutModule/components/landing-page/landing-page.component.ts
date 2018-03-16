import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/authService/auth.service';
import { SpeechService } from '../../../../services/speachSevice/speech.service';
import { ProductsService } from '../../../../services/products/products.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private authService: AuthService,
              public speech: SpeechService,
              public productsService: ProductsService) { }

  ngOnInit() {
    // this.authService.checkLoggedIn()
    //   .subscribe(response => {
    //     console.log('res checkLoggedIn', response)
    //   })
  }
  getProducts() {
    this.productsService.getProducts()
      .subscribe(res => {
        console.log('res', res);
      })
  }

}
