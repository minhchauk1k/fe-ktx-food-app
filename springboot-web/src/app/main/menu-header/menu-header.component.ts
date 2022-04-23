import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.css']
})
export class MenuHeaderComponent implements OnInit {
  public languages: any[] = [];
  public selectedLanguage: any;
  public textSearch:string = '';

  constructor(
    public translateService: TranslateService

  ) {
    translateService.use("vi");
    this.languages = [
      { name: 'language.vi', code: 'vi' },
      { name: 'language.en', code: 'en' },
    ];
  }

  ngOnInit(): void {

  }

  public changeDropdownLanguage(): void {
    this.translateService.use(this.selectedLanguage.code);
  }

}
