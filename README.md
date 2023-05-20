# CRM-clients

CRM-clients - Программа для ведения учета клиентов.

<img width="500" alt="Screenshot 2023-05-19 at 20 36 46" src="https://github.com/vladmikhalev/CRM-clients/assets/107835280/c4c49efd-356d-4f6e-a4a5-3041feb213d1">

<img width="500" alt="Screenshot 2023-05-19 at 20 37 14" src="https://github.com/vladmikhalev/CRM-clients/assets/107835280/cb04f07f-e7b2-45c4-b53f-cc7b86ec76e3">


Функционал программы:
1. Осуществлена возможность добавления нового клинта, нажав на кнопку "Добавить клинта". В открывшемся модальном окне нужно ввести ФИО клиента и при необходимости контакты клиента (телефон, email, vk, facebook). Максимум можно добавить 10 контактов. Все поля проходят валидацию.

2. После добавление клиента, его строка имеет следующие колоки:
    - уникальный идентификатор
    
    - Фамилия Имя Отчество
    
    - Дата и время создания клиента
    
    - Дата и время последнего реадктирования данных о клиенте
    
    - Иконки контактов клиента. По наведению на иконку всплывает подсказка с детальной информацие
    
    - Кнопка изменения данных клиента
    
    - Кнопка удаления клиента
    
Все данные о клиентах хранятся на сервере, который запускается локально командой "node index" из папки "backend". После длбавления, изменения или удаления клиента все данные идут на сервер. И на основе обновленных данных сервера, с помощью fetch запросов, осуществляется отрисовка клиентов.

CRM система имеет сортировку клиентов по следующим параметрам (по нажатию на заголовки таблицы):
    - Сортировка по ID, по возростанию, при повтороном клике по убыванию.
    
    - Сортировка по ФИО, по алфавиту, при повтороном клике сортировка в обратном порядке.    
    
    - Сортировка по дате создания клиента, по возростанию, при повтороном клике по убыванию.
    
    - Сортировка по по дате изменения клиента, по возростанию, при повтороном клике по убыванию.    
    
В header закреплена форма поиска клиентов по ID и ФИО. Это упрощает поиск определенного клиента при большом количестве.    
    
