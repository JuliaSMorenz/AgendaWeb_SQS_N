import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as CryptoJS from 'crypto-js';
import { environment } from "../../environments/environment";


@Injectable({
    providedIn: 'root'
})
export class AuthGuard {


    //construtor
    constructor(
        private router: Router
    ) {}


    //método para verificar se o usuário
    //está autenticado
    canActivate() {
        //ler os dados gravados na local storage
        let data = localStorage.getItem('auth');
       
        //verificando se os dados existem
        if(data != null) {
            //descriptografar os dados gravados na local storage
            let dados = JSON.parse(CryptoJS.AES.decrypt(data, environment.cryptoKey)
                            .toString(CryptoJS.enc.Utf8));
            //ler os dados do usuário autenticado
            let usuario = dados.response;


            //capturar a data atual e a data e hora de expiração do token
            const dataAtual = new Date();
            const dataExpiracao = new Date(usuario.dataHoraExpiracao);


            //verificando se há um token JWT e se a data de expiração ainda é válida
            return usuario.accessToken != '' && dataAtual < dataExpiracao;
        }
       
        this.router.navigate(['/pages/login-usuario']);
        return false;
    }
}