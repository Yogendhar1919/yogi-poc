import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Item } from './item';
import { ItemService } from './item.service';
import { LocationService } from '../location.service';

@Component({
  selector: 'ns-details',
  templateUrl: './item-detail.component.html',
})
export class ItemDetailComponent implements OnInit {
  item: Item;
  direction: string = '';
  private locationManager: CLLocationManager;
  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private locationService: LocationService
  ) {
    this.locationService.startUpdatingLocation();
    this.locationService.startUpdatingHeading();
    this.locationService.startWatchLocation();
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.params.id;
    this.item = this.itemService.getItem(id);

    // log the item to the console
    console.log(this.item);
  }

  takePicture(): void {
    this.direction = this.locationService.convertDegreesToDirectionText(
      this.locationService.getDirection()
    );
  }
}
