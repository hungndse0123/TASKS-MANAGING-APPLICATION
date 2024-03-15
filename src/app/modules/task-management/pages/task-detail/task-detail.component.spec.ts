import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailComponent } from './task-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskDetailComponent],
      imports: [RouterTestingModule,
        FormsModule,
        ReactiveFormsModule],
      providers: [BsModalService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should show the complete button on incompleted task", () => {
    component.currentTask.completed = false;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.innerHTML).toContain("Complete Task");
  });

  it("should not show the complete button on completed task", () => {
    component.currentTask.completed = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.innerHTML).not.toContain("Complete Task");
  });

  it("should complete the task", () => {
    component.currentTask.completed = false;
    component.onComplete();
    expect(component.currentTask.completed).toEqual(true);
  });

  it("should assign the task to user", () => {
    component.onOpenAssign();
    component.curForm.setValue({
      assigneeId: 111
    });
    component.onSubmit();
    expect(component.currentTask.assigneeId).toEqual(111);
  });
});
