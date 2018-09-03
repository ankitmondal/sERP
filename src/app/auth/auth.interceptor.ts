import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service"
import { AdminServiceProvider } from "../../providers/admin-service/admin-service"
import 'rxjs/add/operator/do';
import { Injectable } from "@angular/core";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') == "True") {
            return next.handle(req.clone());
        }
        else {
            if (localStorage.getItem('userToken') != null) {
                const clonedreq = req.clone({
                    headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('userToken'))
                });
                return next.handle(clonedreq)
                    .do(
                        succ => { },
                        err => {
                            if (err.status === 401) { }
                            //  this.router.navigateByUrl('/login');
                        }
                    );
            }
            else {
                //  this.router.navigateByUrl('/home');
            }
        }
    }
}