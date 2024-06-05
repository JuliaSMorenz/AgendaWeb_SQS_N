import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-criar-usuario',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.css'
})
export class CriarUsuarioComponent {

  //atributos
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  //método construtor
  constructor(
    private httpClient: HttpClient
  ) {}

  //objeto do formulário
  form = new FormGroup({
    nome: new FormControl('',
      [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
    email: new FormControl('',
      [Validators.required, Validators.email]),
    senha: new FormControl('',
      [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])(?!.*\s).{8,}$/)]),
    senhaConfirmacao: new FormControl('',
      [Validators.required])
  });


  //função para verificar se o formulário possui erros de validação
  get f() {
    return this.form.controls;
  }


  //função para capturar o submit do formulário
  onSubmit(): void {
    
    //limpar as mensagens
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    //fazendo a comparação das senhas..
    if(this.form.value.senha == this.form.value.senhaConfirmacao) {

      //fazendo a requisição para a API
      this.httpClient.post(environment.apiUsuarios + "/criar", this.form.value)
      .subscribe({
        next: (data: any) => { //capturar resposta de sucesso
          this.mensagemSucesso = data.message; //exibir mensagem de sucesso
          this.form.reset(); //limpar o formulário
        },
        error: (e) => { //capturar resposta de erro
          this.mensagemErro = e.error.message; //exibir mensagem de erro
        }
      });
    }
    else {
      this.mensagemErro = 'Senhas não conferem, por favor verifique.';
    }
  }


}