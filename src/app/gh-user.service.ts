import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";

export interface GithubUser {
  name: string;
  avatarUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class GithubUserService {

  private http = inject(HttpClient);

  public getGithubUsers(searchTerm: string): Observable<GithubUser[]> {
    return this.http.get<any>(
      `https://api.github.com/search/users?q=${searchTerm}`
    ).pipe(
      map(response =>
        response.items.map((user: any) => ({
          name: user.login,
          avatarUrl: user.avatar_url
        }))
      ),
    );
  }
}
