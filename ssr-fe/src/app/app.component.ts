import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConvertService } from './services/convert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public form: FormGroup;
  public isLoading: Boolean = false;

  constructor(
    private convertService: ConvertService,
  ) {
    this.form = new FormGroup({ youtubeLink: new FormControl('') });
  }

  submit() {
    this.isLoading = true;

    this.convertService.convertYoutubeLink(this.form.value).subscribe({
      next: (v: any) => {
        console.log(v);
        // console.log('hit');
        this.isLoading = false;
      },
      error: (e: HttpErrorResponse) => {
        alert(e.message);
      },
      complete: () => console.info('complete')
    })
  }
}