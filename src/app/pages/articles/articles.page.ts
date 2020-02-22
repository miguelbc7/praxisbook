import { Component, OnInit, ViewEncapsulation    } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticlesPage implements OnInit {

  constructor() { }

  ngOnInit() {

    var segment = document.querySelector('ion-segment');
    var slides = document.querySelector('ion-slides');
    var status;
    
    segment.addEventListener('ionChange', (ev) => onSegmentChange(ev));
    slides.addEventListener('ionSlideDidChange', (ev) => onSlideDidChange(ev));

    // On Segment change slide to the matching slide
    function onSegmentChange(ev) {
      slideTo(ev.detail.value);
    }

    function slideTo(index) {
      slides.slideTo(index);
    }

    // On Slide change update segment to the matching value
    async function onSlideDidChange(ev) {
      var index = await slides.getActiveIndex();
      clickSegment(index);

    }

    function clickSegment(index) {
      segment.value = index;
      status = index;
      console.log(status);
    }
  }
}
