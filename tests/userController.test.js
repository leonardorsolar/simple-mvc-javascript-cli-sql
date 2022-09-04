const user = require('../controllers/userController');
let idUltimoUsuarioSalvo;


describe('Grupo de teste para salvar usuário ', () => {
    
    test('Deve buscar o usuário id 1', async () => {
        const result = await user.show(1);
        expect(result).toEqual({
            id: 1,
            email:'dani@mail.com',
            password: '123',
            name: 'Dani'
        });
    });
    
    test('Deve salvar um novo usuário', async () => {
        const result = await user.store('alessandro', 'alessandro@mail.com', '1255');
        const [serverStatus, id] = [result[0].serverStatus, result[0].insertId];
        idUltimoUsuarioSalvo = id;
        expect(serverStatus).toBe(2);
    });
    
    test('Deve listar todos os usuários cadastrados ', async () => {
        const result = await user.index();
        expect(result.length).toBeGreaterThan(2);
    });
    
    test('Deve atualizar o usuário 3 para o nome de Larissa', async () => {
        await user.update('Larissa', 'larissa@gmail.com', '123456', 3);
        const result = await user.show(3);
        expect(result).toEqual({
            id: 1,
            email:'larissa@gmail.com',
            password: '123456',
            name: 'Larissa'
        });
    });
    
    test('Deve voltar as propriedades do usuario 3 ', async () => {
        await user.update('Luana', 'luana@gmail.com', '199sf6', 3);
        const result = await user.show(3);
        expect(result).toEqual({
            id: 3,
            email:'luana@gmail.com',
            password: '199sf6',
            name: 'Luana'
        });
    });
    
    test('Deve excluir o ultimo usuário que foi salvo', async () => {
        await user.destroy(idUltimoUsuarioSalvo);
        const result = await user.show(idUltimoUsuarioSalvo);
        expect(result).toBe(`Usuário ${idUltimoUsuarioSalvo} não existe`);
    });
    
});