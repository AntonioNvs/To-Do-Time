# To-Do-Time
Aplicativo básico de gerenciamento de tarefas feito em com a tecnologia React Native e o RealmDB.

Tem como objetivo administrar atividades cadastradas pelo usuário, visualizadas na tela de Dashboard, para que ele possa se organizar melhor em suas tarefas, com opções de
delete e realização da atividade.

As tarefas tem como dados:
    
   - Título
   - Data de criação
   - Data em que deve ser finalizada
   - Duração da atividade
   
Pode ser cadastrada uma atividade na tela de adição, no qual é pedido os dados de data e hora com a biblioteca 'datetimepicker', junto com estados de ativação ao serem clicadas no Input,
além do título. Com algumas verificações, como nunca pode ter duas atividades com o mesmo título ou sem título.

Para o armazenamento dos dados, foi utilizado o RealmDB, um banco de dados para aplicações mobile.

A atividade só será realizada e excluída automaticamente após o usuário terminá-la no programa. Para isso, há a tela Timer, em que consiste num cronômetro, no qual quando
o usuário realiza a atividade cadastrada, ele roda o cronômetro, e, quando terminá-la, pode cadastradar esse tempo, sendo subtraído do já configurado. Assim, após o usuário
terminar sua atividade (com o cronômetro), ele será avisado, e a atividade será concluída.

Aplicativo em sua versão inicial com fins de aprendizado.

