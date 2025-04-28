import { loginnCreds } from "../models/loginCreds";

class SessionHelper {
    public login(data:loginnCreds){
        sessionStorage.setItem("SM", JSON.stringify(data));
    }

    public signout(){
        if(sessionStorage.getItem("SM") != null){
            sessionStorage.removeItem("SM");
        }
    }

    // public changeSection(sect:string){
    //     let x:loginnCreds | null = this.getUserData();
    //     if(x === null){
    //         return;
    //     }else{
    //         x.loginnCreds.partUrl = sect;

    //         sessionStorage.setItem("SM", JSON.stringify(x));
    //     }
    // }
}

let sh = new SessionHelper();

export default sh;