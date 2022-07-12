import { SearchModel } from './model/search.model';
import { DataService } from './service/data.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HotelSearch';

  form = new FormGroup({
    destination: new FormControl(''),
    groupSize: new FormControl(''),
    range: new FormGroup({
      start: new FormControl(''),
      end: new FormControl('')
    })
  });

  results$ = this.dataSvc.results$;
  destinations$ = this.dataSvc.getDestinations$();

  constructor(private dataSvc: DataService) {}

  searchClick() {
    if(!this.form.valid) {
      return;
    }

    const searchModel: SearchModel = this.makeSearchModel(this.form);

    this.dataSvc.searchHotels(searchModel);
  }



  makeSearchModel(myForm: FormGroup) {
    const { destination, range } = myForm.value;
    const groupSize = myForm.value.groupSize || 2;
    const start = range?.start ? new Date(range.start) : null;
    const end  = range?.end ? new Date(range.end) : null;

    const searchModel: SearchModel = { destination: destination || '', groupSize, start, end };

    return searchModel;
  }
}
