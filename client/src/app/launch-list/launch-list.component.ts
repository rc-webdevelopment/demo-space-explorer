import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const LAUNCH_FRAGMENT = gql`
  fragment LaunchTile on Launch {
    __typename
    id
    # TODO: enable this field when apollo client cache is implemented
    # isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`;

export const GET_LAUNCHES = gql`
  query GetLaunchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_FRAGMENT}
`;

@Component({
  selector: 'app-launch-list',
  templateUrl: './launch-list.component.html',
  styleUrls: ['./launch-list.component.less']
})
export class LaunchListComponent implements OnInit {
  launches: Observable<any>;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.launches = this.apollo
    .watchQuery<any>({
        query: GET_LAUNCHES,
      })
      .valueChanges
      .pipe(map(({ data }) => data?.launches?.launches));
  }

}
