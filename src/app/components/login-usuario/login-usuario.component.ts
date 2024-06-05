import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-login-usuario',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-usuario.component.html',
  styleUrl: './login-usuario.component.css'
})
export class LoginUsuarioComponent {


  //atributos
  mensagemErro: string = '';


  //método construtor
  constructor(
    private httpClient: HttpClient
  ) {}


  //formulário
  form = new FormGroup({
    email : new FormControl('',
      [Validators.required, Validators.email]),
    senha : new FormControl('',
      [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])(?!.*\s).{8,}$/)])
  });


  //função para verificar os erros do formulário
  get f() {
    return this.form.controls;
  }

  //função para capturar o submit do formulário
  onSubmit(): void {

    this.mensagemErro = '';

    //fazendo a requisição para a API
    this.httpClient.post(environment.apiUsuarios + "/autenticar", this.form.value)
    .subscribe({
      next: (data: any) => { //capturando resposta de sucesso
        
        //criptografar os dados
        let dados = CryptoJS.AES.encrypt
          (JSON.stringify(data), environment.cryptoKey).toString()

        //salvar os dados local storage do navegador
        localStorage.setItem('auth', dados);

        //redirecionando para a página de consulta de tarefas
        location.href = '/pages/consulta-tarefas';
      },
      error: (e) => { //capturando resposta de erro
        this.mensagemErro = e.error.message;
      }
    })

  }

}





