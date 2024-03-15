import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [RouterTestingModule,
        FormsModule,
        ReactiveFormsModule],
      providers: [BsModalService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should show the empty list placeholder", () => {
    component.taskList = [];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.innerHTML).toContain("List is empty!");
  });

  it("should filter the list", () => {
    component.allTaskList = [
      {
        id: 0,
        title: "Install a monitor arm",
        description: "Install a monitor arm description",
        assigneeId: 111,
        completed: false
      },
      {
        id: 1,
        title: "Move the desk",
        description: "Move the desk to the new location",
        assigneeId: 333,
        completed: true
      },
      {
        id: 2,
        title: "Mive the desk2",
        description: "Move the desk to the new location",
        assigneeId: 111,
        completed: true
      },
      {
        id: 3,
        title: "Move the desk3",
        description: "Move the desk to the new location",
        assigneeId: 111,
        completed: true
      },
      {
        id: 4,
        title: "Move the desk4",
        description: "Move the desk to the new location",
        assigneeId: 111,
        completed: false
      },
      {
        id: 5,
        title: "Mive the desk5",
        description: "Move the desk to the new location",
        assigneeId: 333,
        completed: true
      },
      {
        id: 6,
        title: "Move the desk6",
        description: "Move the desk to the new location",
        assigneeId: 111,
        completed: true
      }
    ];
    component.searchByTitle = 'Move';
    component.isUserFilter = true;
    component.selectedStatus = 'Completed';
    component.currentUser = { id: 111, name: "Mike" };
    component.loadData();
    expect(component.taskList).toEqual([
      {
        id: 3,
        title: "Move the desk3",
        description: "Move the desk to the new location",
        assigneeId: 111,
        completed: true
      },
      {
        id: 6,
        title: "Move the desk6",
        description: "Move the desk to the new location",
        assigneeId: 111,
        completed: true
      }
    ]);
  });

  it("should validate the add task form", () => {
    component.curNewTaskForm.setValue(
      {
        title: '',
        description: '',
        assigneeId: '',
      }
    );
    expect(component.curNewTaskForm.valid).toEqual(false);
  });

  it("should add new task", () => {
    component.onCreateInit();
    component.curNewTaskForm.setValue(
      {
        title: 'Test1 title with number 76681 for checking',
        description: 'Test1 Description with number 9951632 for checking',
        assigneeId: '111',
      }
    );
    component.onSubmit();
    expect(component.allTaskList.find(i => i.title == 'Test1 title with number 76681 for checking')?.description).toEqual('Test1 Description with number 9951632 for checking');
  });
});
