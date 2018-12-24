cd %~dp0
call npm install
node proxy.js
start chrome http://localhost:4200 & ng serve
