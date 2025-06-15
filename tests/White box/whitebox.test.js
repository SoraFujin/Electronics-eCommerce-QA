import handler from '../../pages/api/category/[id]';

describe('GET /api/category/[id]', () => {
  it('returns category for valid id', async () => {
    const req = {
      method: 'GET',
      query: { id: '123' },
    };
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status };

    await handler(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({ id: '123', name: 'Category 123' });
  });

  it('returns 404 for invalid id', async () => {
    const req = {
      method: 'GET',
      query: { id: '999' },
    };
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status };

    await handler(req, res);

    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({ error: 'Category not found' });
  });

  it('returns 405 for unsupported method', async () => {
    const req = {
      method: 'POST',
      query: { id: '123' },
    };
    const end = jest.fn();
    const res = { status: jest.fn(() => ({ end })) };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(end).toHaveBeenCalled();
  });
});