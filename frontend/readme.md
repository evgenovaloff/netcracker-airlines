# GulpWorkFlow v0.1

WorkFlow для сборки frontend-проектов.

## Установка

Для установки используйте клонирование Git:  
```
git clone https://evgenovaloff@bitbucket.org/evgenovaloff/gulpworkflow.git
```

## Настройка

В файле ``` gulpfile.js ``` вставьте в поля ``` proxy ``` и ``` host ``` имя домена 
(если вы запускаете сервер в прокси-режиме с помощью доп. сервера, напр. с помощью Apache/Nginx).

## Запуск

### Полная сборка:
- билд всех файлов
- отслеживание изменений
- LiveReload (перезагрузка страницы)  

``` gulp ```



### Сборка HTML:  
``` gulp html:build ```  
### Сборка Javascript:  
``` gulp js:build ```  
### Сборка SASS:  
``` gulp style:build ```  
### Сборка шрифтов:  
``` gulp fonts:build ```  
### Сборка изображений:  
``` gulp image:build ```
### Отслеживание изменений: 
Отслеживание происходит на основе event (событий) изменения кода файлов.
Для каждого типа файлов предназначена своя сборка.   
``` gulp watch ```  
### Запуск LiveReload-сервера:  
``` gulp webserver ``` 

> Женя Новалов 