# CRM-Company
CRM application to manage the employees of a company


## Get started
### 1. Install Ionic
`npm install -g ionic`

### 2. Clone this repo
`git clone https://github.com/estebancastrosola/CRM-Company.git`

### 3. Install modules
`cd myApp`  
`npm install`

### 4. Run mock api
`json-server --watch db.json`

### 5. Run the app
`ionic serve`

## Creator's Note
Do not forget that all the criticisms and contributions will be well received since this project is created to learn technology and entertain me!

Forgive my English if it is not as good as you want, but this also helps me to learn.

## User manual
### 0. Important note.
All the actions you perform in the application will not take effect when you restart it, because the api is "mocketed" and nothing has persistence. In addition some actions such as "searches" or "creations" also have no real effect or real functionality since they have the predefined actions.
This is because only the front of the application has been designed, in the future it is expected to add a real REST API to 100% support the actions of the application.
Thank you for understanding!

### 1. Tabs.
The application consists of 3 tabs:

The first tab is that of "employees", in it you will always see a list of employees that will change according to the actions you do.
In this tab, you also have a button to "Add employees".
For each of the employees in the list, you can press with the finger and drag to the left to show the options of each one.
These options are: Delete the employee, and edit it.


The second tab is that of "departments". In this tab you will see a list of "departments". You also have a button to create more "departments". For each object of the list you can press with the finger and drag to the right to show the options. The options are: look for employees in that department. If you click on this option, the application will move us to the employees tab refreshing the list and showing the employees of the selected department. When you do this, the "Add employee" button will change to the "load all employees" button.


The third tab is the "employee search engine according to its date of incorporation into the company".
In this tab it will show you a date picker and a search button. When you press the search button, the application will move to the first employee tab, refreshing the list by the search results. When you do this, the "Add employee" button will change to "load all employees"


### 2. Create new employee.

When you click on the "Add employee" button, the application will move to the employee form. In this form you will be able to fill in the basic information of the employee being mandatory the name and email. By clicking on the save button, the application will return to the list of employees (tab 1) and refresh the list by adding the new employee

### 3. Delete employee.

If you press the delete button from the employee's actions the application will ask you for confirmation of this option asking if you are sure to carry it out. If you press "sure", the list of employees will be refreshed by deleting the employee.


## Application design notes

This application has been structured in 3 tabs, so that the first tab will always show a list of employees. This list will change according to the action we want to do.
1) See all employees (default when starting the application)
2) See the employees of a specific department.
3) Search for employees who have registered with the company after a certain day.

In addition, to facilitate the user of the application and always know which list of employees is being displayed, the header of the tab shows the descriptive text.
In addition, all possible actions for an employee are shown in the same tab, either by clicking and dragging on the employee object on which we want to act (edit, delete), or add more employees.

To search the employees of a department, it has been designed as simply as possible, since you only have to click and drag in the department and click on the corresponding action

To perform the department search according to the date of incorporation into the company, it has been decided to create a new additional tab so as not to saturate the other 2 tabs with options.

## Ionic/Angular components used in the application
Ionic version 4.7.1 has been used to develop this project.
The json-server packet was used to develop the api
It has been used Observables, custom components, form builders, ion-skeleton-text, toast, loading, among others ...

Find out for yourself!




