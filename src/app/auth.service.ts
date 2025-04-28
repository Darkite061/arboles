import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() {}

    isAutenticated(): boolean {
        return sessionStorage.getItem("SM") !== null;
    }

    login(userData: any): void {
        sessionStorage.setItem("SM",JSON.stringify(userData));
    }

    logout(): void {
        sessionStorage.removeItem("SM");
    }
}