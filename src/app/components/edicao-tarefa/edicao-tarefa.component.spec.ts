import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoTarefaComponent } from './edicao-tarefa.component';

describe('EdicaoTarefaComponent', () => {
  let component: EdicaoTarefaComponent;
  let fixture: ComponentFixture<EdicaoTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdicaoTarefaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdicaoTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
