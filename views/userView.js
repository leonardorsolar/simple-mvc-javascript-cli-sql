const readline = require('readline');
const userController = require('../controllers/userController');
const rl = readline.createInterface({
    
    input: process.stdin,
    output: process.stdout,
    prompt:'OHAI> '
    
});

rl.prompt();
rl.setMaxListeners(100);

const showOptions = () => {
    
    console.table(
        [
            { comando: 'LISTAR' },
            { comando: 'BUSCAR' },
            { comando: 'CRIAR' },
            { comando: 'EXCLUIR' },
            { comando: 'ATUALIZAR' },
            {comando: 'SAIR'}
        ]
        );
        console.log('ESCOLHA UMA OPÇÃO: ...');
        
    };
    
rl.on('line', async res => {
        
    switch (res) {
        case '0' || 'LISTAR':
            const users = await userController.index();
            console.table(users);
            showOptions();
            break;
            
        case '1' || 'BUSCAR':
            console.log('..... Buscando');
            rl.question('Informe o id do usuário: ', async (id) => {
                const user = await userController.show(id);
                console.table(user);
                showOptions();
            });
            break;
            
        case '2' || 'CRIAR':
            console.log('..... Criando');
            rl.question('Informe o nome do usuário: ', async (name) => {
                rl.question('Informe o email: ', async (email) => {
                    rl.question('Informe uma senha: ', async (password) => {
                        await userController.store(name, email, password);
                        console.log('');
                        console.log('[][]....USUÁRIO CRIADO COM SUCESSO!!!');
                        console.log('');
                        showOptions();
                    });
                });
            });
            break;
            
        case '3' || 'EXCLUIR':
            rl.question('Informe o id do usuário que você deseja excluir: ', async (id) => {
                await userController.destroy(id);
                showOptions();
            });
            break;
            
        case '4' || 'ATUALIZAR':
            console.log('..... Atualizando');
            rl.question('Informe o id do usuário que você deseja atualizar: ', async (id) => {
                rl.question('Informe o nome do usuário: ', async (name) => {
                    rl.question('Informe o email: ', async (email) => {
                        rl.question('Informe uma senha: ', async (password) => {
                            await userController.update(name, email, password, id);
                            console.log('');
                            console.log('[][]....USUÁRIO ATUALIZADO COM SUCESSO!!!');
                            console.log('');
                            showOptions();
                        });
                    });
                });
            });
            break;
            
        case '5' || 'SAIR':
            console.log('');
            console.log('[][]....VALEU, ATÉ MAIS!!!');
            console.log('');
            rl.close();
            break;
            
        default:
            console.log('OPÇÃO INVÁLIDA [][]...');
            showOptions();
            break;
    }
        
});
    
showOptions();