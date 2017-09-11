using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;
using LBFC.Models.Repositories;

namespace LBFC.Models.Services
{
    public interface IBaseService<T> where T : class
    {
        T GetById(int id);
        List<T> GetAll();
        List<T> Get(Func<T, bool> predicate);
        T SingleOrDefault(Func<T, bool> predicate);
        T Create(T entity);
        void Update(T entity);
        void Delete(T entity);
    }

    public abstract class BaseService<T> : IBaseService<T> where T : class
    {
        protected IRepository<T> repo;

        public BaseService()
        {
            this.repo = new Repository<T>();
        }

        public T Create(T entity)
        {
            return this.repo.Add(entity);
        }

        public void Delete(T entity)
        {
            this.repo.Delete(entity);
        }

        public List<T> Get(Func<T, bool> predicate)
        {
            return repo.Get(predicate);
        }

        public List<T> GetAll()
        {
            return repo.GetAll();
        }

        public T GetById(int id) {
            return this.repo.Get<int>(id);
        }

        public T SingleOrDefault(Func<T, bool> predicate)
        {
            return repo.SingleOrDefault(predicate);
        }

        public void Update(T entity)
        {
            repo.Update(entity);
        }
    }
}
