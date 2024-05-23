it('deve retornar os detalhes do banner se o ID for válido', async () => {
    const response = await GET({ params: { billboardId: '123' } });
    expect(response.status).toBe(200); // Status 200 OK
  });
  
  it('deve excluir o banner se o usuário estiver autenticado e o ID for válido', async () => {
    const response = await DELETE({ params: { billboardId: '123', storeId: '456' } });
    expect(response.status).toBe(204); // Status 204 No Content (sem conteúdo)
  });
  
  it('deve atualizar o banner se o usuário estiver autenticado e os dados forem válidos', async () => {
    const response = await PATCH({
      params: { billboardId: '123', storeId: '456' },
      json: () => ({ label: 'Novo Label', imageUrl: 'https://example.com/image.jpg' }),
    });
    expect(response.status).toBe(200); // Status 200 OK
  });
  
  it('deve atualizar o banner se o usuário estiver autenticado e os dados forem válidos', async () => {
    const response = await PATCH({
      params: { billboardId: '123', storeId: '456' },
      json: () => ({ label: 'Novo Label', imageUrl: 'https://example.com/image.jpg' }),
    });
    expect(response.status).toBe(200); // Status 200 OK
  });
  
  
  // Exemplo de teste para a função GET
  it('deve retornar um erro se o ID do banner não for fornecido', async () => {
    const response = await GET({ params: {} });
    expect(response.status).toBe(400);
  });
  
  // Exemplo de teste para a função DELETE
  it('deve retornar um erro se o usuário não estiver autenticado', async () => {
    const response = await DELETE({ params: { billboardId: '123', storeId: '456' } });
    expect(response.status).toBe(403);
  });
  
  // Exemplo de teste para a função PATCH
  it('deve retornar um erro se a coluna "label" não for fornecida', async () => {
    const response = await PATCH({ params: { billboardId: '123', storeId: '456' }, json: () => ({ imageUrl: 'https://example.com/image.jpg' }) });
    expect(response.status).toBe(400);
  });