import { Routes } from '@angular/router';
import { CadastroTarefaComponent } from './components/cadastro-tarefa/cadastro-tarefa.component';
import { ConsultaTarefasComponent } from './components/consulta-tarefas/consulta-tarefas.component';
import { EdicaoTarefaComponent } from './components/edicao-tarefa/edicao-tarefa.component';
import { LoginUsuarioComponent } from './components/login-usuario/login-usuario.component';
import { CriarUsuarioComponent } from './components/criar-usuario/criar-usuario.component';
import { AuthGuard } from './guards/auth.guard';

//mapeamento das rotas do projeto
export const routes: Routes = [
    {
        //ROTA (URL)
        path: 'pages/login-usuario',
        component: LoginUsuarioComponent
    },
    {
        //ROTA (URL)
        path: 'pages/criar-usuario',
        component: CriarUsuarioComponent
    },
    {
        //ROTA (URL)
        path: 'pages/cadastro-tarefas',
        component: CadastroTarefaComponent,
        canActivate: [AuthGuard]
    },
    {
        //ROTA (URL)
        path: 'pages/consulta-tarefas',
        component: ConsultaTarefasComponent,
        canActivate: [AuthGuard]
    },
    {
        //ROTA (URL)
        path: 'pages/edicao-tarefas/:id',
        component: EdicaoTarefaComponent,
        canActivate: [AuthGuard]
    },
    {
        //ROTA DEFAULT (RAIZ)
        path: '',
        pathMatch: 'full',
        redirectTo: '/pages/login-usuario'
    }
];
