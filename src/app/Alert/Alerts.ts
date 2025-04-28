import Swal, { SweetAlertOptions } from "sweetalert2";

class Alerts {
    constructor() {}

    CloseAlert() {
        Swal.close();
    }

    Error(Title: string, Msg: string) {
        let opts: SweetAlertOptions = {
            title: Title,
            text: Msg,
            icon: "error",
            background: "#000",
            color: "white",
            confirmButtonText: "OK", // Botón "OK" agregado
        };
        Swal.fire(opts).then();
    }

    Loading(Title: string, Msg: string) {
        let opts: SweetAlertOptions = {
            title: Title,
            text: Msg,
            icon: "info",
            background: "#000",
            color: "white",
            showConfirmButton: false,  // No se muestra el botón "OK" en Loading
            html: '<div class="spinner"></div>',
        };
        Swal.fire(opts).then();
    }

    Correct(Title: string, Msg: string) {
        let opts: SweetAlertOptions = {
            title: Title,
            text: Msg,
            icon: "success",
            background: "#000",
            color: "white",
            confirmButtonText: "OK", // Botón "OK" agregado
        };
        Swal.fire(opts).then();
    }

    changeSpinnerToCheckmark() {
        Swal.update({
            html: `
                <div class="checkmark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check">
                        <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                </div>
            `,
            confirmButtonText: "OK", // Botón "OK" agregado
        });
    }

    Question(Title: string, Msg: string): Promise<boolean> {
        let opts: SweetAlertOptions = {
            title: Title,
            text: Msg,
            icon: "question",
            background: "#000",
            color: "white",
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "No",
        };
        return Swal.fire(opts).then((result) => result.isConfirmed);
    }
}

let alerts = new Alerts();

export default alerts;
