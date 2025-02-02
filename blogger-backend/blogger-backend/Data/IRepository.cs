using System.Linq.Expressions;

namespace blogger_backend.Data
{
    public interface IRepository<T> where T : class
    {
        Task<List<T>> GetAll();
        Task<List<T>> GetAll(Expression<Func<T, bool>> filter);
        Task<T> GetById(int Id);
        Task AddAsync(T entity);
        void UpdateAsync(T entity);
        Task DeleteAsync(int Id);
        Task SaveChangesAsync();
    }
}
