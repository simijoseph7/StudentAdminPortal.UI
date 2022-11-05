import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../models/ui-models/student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  //property called students of type Students[] array (Students from models-ui)
  students: Student[]=[];
  //new aarray of string elements that are to be displayed in columns
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile', 'gender'];
  //define dataSource
  dataSource: MatTableDataSource<Student>= new MatTableDataSource<Student>();
  //inject paginator
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  //inject sorter
  @ViewChild(MatSort) matSort!: MatSort;
  //initiate it as an empty string
  filterString='';

  constructor(private studentsService: StudentService) { }

  ngOnInit() {
    //Fetch students
    //Have to subscribe() to initiate the call because it is an Observable
    this.studentsService.getStudent().subscribe(
      (successResponse) =>{
        this.students = successResponse;
        this.dataSource = new MatTableDataSource<Student>(this.students);

        if(this.matPaginator){
        this.dataSource.paginator= this.matPaginator;
        }

        if(this.matSort){
          this.dataSource.sort= this.matSort;
        }
      //,
      // (errorResponse) =>{
      //   console.log(errorResponse);
      // }
      });
  }

  filterStudents(){
    this.dataSource.filter= this.filterString.trim().toLowerCase();
  }

}
