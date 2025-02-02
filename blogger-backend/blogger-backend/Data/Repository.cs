
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace blogger_backend.Data
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly AppDbContext _context;

        public Repository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
        }

        public async Task DeleteAsync(int Id)
        {
            T entity = await _context.Set<T>().FindAsync(Id);
            _context.Set<T>().Remove(entity);
        }

        public async Task<List<T>> GetAll()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<List<T>> GetAll(Expression<Func<T, bool>> filter)
        {
            return await _context.Set<T>().Where(filter).ToListAsync();
        }

        public async Task<T> GetById(int Id)
        {
            return await _context.Set<T>().FindAsync(Id);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void UpdateAsync(T entity)
        {
            _context.Set<T>().Update(entity);
        }
    }
}
