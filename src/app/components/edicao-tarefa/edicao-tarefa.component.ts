import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edicao-tarefa',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edicao-tarefa.component.html',
  styleUrl: './edicao-tarefa.component.css'
})
export class EdicaoTarefaComponent implements OnInit {

  //variável
  mensagem: string = '';

  //método construtor
  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  //método executado no momento em que o componente é aberto
  ngOnInit(): void {
    
    //capturando o id enviado na URL da ROTA
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    
    //fazendo uma requisição para consultar tarefa por ID
    this.httpClient.get(environment.apiTarefas + '/' + id)
    .subscribe({
      next: (data: any) => { //resposta de sucesso
        
        //preenchendo os campos do formulário
        this.formulario.controls['id'].setValue(data.id);
        this.formulario.controls['nome'].setValue(data.nome);
        this.formulario.controls['dataHora'].setValue(data.dataHora);
        this.formulario.controls['descricao'].setValue(data.descricao);
        this.formulario.controls['prioridade'].setValue(data.prioridade);

      },
      error: (e) => { //resposta de erro
        console.log(e.error);
      }
    });

  }

  //objeto para capturarmos os campos do formulário
  formulario = new FormGroup({

    //campo 'id'
    id : new FormControl(''),

    //campo 'nome'
    nome : new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100)]),

    //campo 'dataHora'
    dataHora : new FormControl('', [
      Validators.required]),

    //campo 'prioridade'
    prioridade : new FormControl('', [
      Validators.required]),

    //campo 'descricao'
    descricao : new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(250)])
  });

  //função auxilizar para verificar se os campos do formulário possuem algum erro de validação
  get f() {
    return this.formulario.controls;
  }

  //função executada no SUBMIT do formulário
  atualizarTarefa(): void {

    //fazendo uma requisição PUT para o serviço de edição da API
    this.httpClient.put(environment.apiTarefas, this.formulario.value)
      .subscribe({
        next: (data: any) => {
          this.mensagem = 'Tarefa atualizada com sucesso. ID: ' + data.id;
        },
        error: (e) => {
          console.log(e.error);
        }
      })
  }

}
