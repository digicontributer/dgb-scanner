import {Component, OnInit, ViewChild} from '@angular/core';
import {AgmMap, GoogleMapsAPIWrapper} from '@agm/core';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {LatLngBounds, LatLngBoundsLiteral, MapTypeStyle, LatLng} from '@agm/core';
import {NodeDto, NodeService, NodesByType} from "../node.service";
import { DataSource } from '@angular/cdk/collections';
import {MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  lat: number;
  lng: number;

  nodes: NodeDto[];
  nodeVersions:  NodesByType[];
  dataSource : ExampleDataSource;
  typeSource: MyDataSource
  @ViewChild(AgmMap) map: AgmMap;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private nodeService: NodeService,
    private mapApi: GoogleMapsAPIWrapper
  ) { }

  ngOnInit() {
    this.nodeService.listNodes().subscribe((res) => {
      this.nodes = res;
      const types = {};
      res.forEach(node => {
        if(types[node.userAgent]) {
          types[node.userAgent] =  types[node.userAgent] + 1;
        } else {
          types[node.userAgent] = 1;
        }
      });
      const nodeVersions = Object.keys(types).map(key => {
        return { version: key, count: types[key] };
      }).sort((a, b) => b['count'] - a['count']);
      this.dataSource = new ExampleDataSource(this.nodes, this.nodeService);
      this.typeSource = new MyDataSource(nodeVersions);
    });
  }

}

export class MyDataSource extends DataSource<any> {
  constructor(private data: any) {
    super();
  }

  connect(): Observable<any> {
    return Observable.of(this.data);
  }
  
  disconnect() {}
}

export class ExampleDataSource extends DataSource<NodeDto> {
  constructor(private _exampleDatabase: NodeDto[], private nodeService: NodeService) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<NodeDto[]> {
    return this.nodeService.listNodes();
  }

  disconnect() {}
}