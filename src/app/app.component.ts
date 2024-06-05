import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  //atributos
  isAuthenticated: boolean = false;
  nomeUsuario: string = '';

  ngOnInit(): void {
    //verificar se existe um usuário autenticado na local storage
    let data = localStorage.getItem('auth');
    if(data != null) {
      this.isAuthenticated = true;
      //descriptografar os dados do usuário autenticado
      let dados = JSON.parse(CryptoJS.AES.decrypt(data, environment.cryptoKey)
                      .toString(CryptoJS.enc.Utf8));
      //ler o nome do usuário
      this.nomeUsuario = dados.response.nome;
    }
  }

  //função para fazer o logout do usuário
  logout(): void {
    if(confirm('Deseja realmente sair do sistema?')) {
      //apagar os dados na local storage
      localStorage.removeItem('auth');
      //redirecionar de volta para a página de autenticação
      location.href = '/pages/login-usuario';
    }
  }
    
}
