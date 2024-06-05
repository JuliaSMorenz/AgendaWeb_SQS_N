import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cadastro-tarefa',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-tarefa.component.html',
  styleUrl: './cadastro-tarefa.component.css'
})
export class CadastroTarefaComponent {

  //variáveis
  mensagem: string = '';

  //injeção de dependência
  constructor(
    private httpClient : HttpClient
  ){}

  //objeto para capturarmos os campos do formulário
  formulario = new FormGroup({
    nome : new FormControl('', [
      Validators.required, 
      Validators.minLength(8), 
      Validators.maxLength(100)]), //campo 'nome'
    dataHora : new FormControl('', [Validators.required]), //campo 'dataHora'
    prioridade : new FormControl('', [Validators.required]), //campo 'prioridade'
    descricao : new FormControl('', [
      Validators.required, 
      Validators.minLength(8), 
      Validators.maxLength(250)]) //campo 'descricao'
  });

  //função auxiliar para verificar se os campos do formulário possuem algum erro de validação
  get f() {
    return this.formulario.controls;
  }

  //função executada no evento SUBMIT do formulário
  cadastrarTarefa() : void{
    //executando uma chamada POST para a API
    this.httpClient.post(environment.apiTarefas, this.formulario.value)
    .subscribe({
      next: (data: any) => { //retorno de sucesso
        this.mensagem = 'Tarefa cadastrada com sucesso. ID: ' + data.id;
        this.formulario.reset(); //limpar os campos do formulário
      },
      error: (e) =>{ //retorno de erro
        console.log(e.error);
      }
    })
  }
}
