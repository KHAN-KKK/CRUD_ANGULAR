import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {

  @ViewChild('mymodal') modal : ElementRef | undefined;
  studentObj : StudentModel = new StudentModel();
  StudentsList : StudentModel[] = [];

  ngOnInit(): void {
    this.getStudentList();
  }

  Open(){
    debugger;
    const stdModel = document.getElementById('myModal');
    if(stdModel != null){
      stdModel.style.display = 'block';
    }
  }

  Close(){
    if(this.modal != null){
      this.modal.nativeElement.style.display = 'none';
    }
    this.studentObj = new StudentModel();
  }

  Save(){
    debugger;
    const localData = localStorage.getItem('studentData');
    if(localData != null){
      const stuData = JSON.parse(localData);
      this.studentObj.id = stuData.length + 1;
      stuData.push(this.studentObj);
      localStorage.setItem('studentData',JSON.stringify(stuData));
    }
    else{
      const newStudent = [];
      this.studentObj.id = 1;
      newStudent.push(this.studentObj);
      localStorage.setItem('studentData',JSON.stringify(newStudent));
    }
    this.Close();
    this.getStudentList();
  }

  getStudentList(){
    debugger;
    const localData = localStorage.getItem('studentData');
    if(localData != null){
      this.StudentsList = JSON.parse(localData);
    }
  }

  UpdateStudent(){
    const updateStu = this.StudentsList.find(x=>x.id === this.studentObj.id);
    if(updateStu != undefined){
      updateStu.name    = this.studentObj.name;
      updateStu.mobile  = this.studentObj.mobile; 
      updateStu.email   = this.studentObj.email; 
      updateStu.gender  = this.studentObj.gender; 
      updateStu.doj     = this.studentObj.doj;
      updateStu.address = this.studentObj.address; 
      updateStu.status  = this.studentObj.status; 
    }
    localStorage.setItem('studentData',JSON.stringify(this.studentObj));
    this.Close();
    this.getStudentList();
  }

  OnEditStudent(studentData : StudentModel){
    this.studentObj = studentData;
    this.Open();
  }

  OnDeleteStudent(data : StudentModel){
    const isConfirmed = confirm('Do you want to delete student');
    if(isConfirmed)
    {
      const studentToDelete = this.StudentsList.findIndex(x=>x.id === data.id);
      this.StudentsList.splice(studentToDelete,1);
      localStorage.setItem('studentData',JSON.stringify(this.StudentsList));
    }
  }
}

export class StudentModel{
  id :number;
  name :string;
  mobile :string;
  email :string;
  gender : string;
  doj : string;
  address:string;
  status : boolean;

  constructor(){
    this.id =0;
    this.name = "";
    this.mobile = "";
    this.email = "";
    this.gender = "";
    this.doj = "";
    this.address = "";
    this.status = false;
  }

}
