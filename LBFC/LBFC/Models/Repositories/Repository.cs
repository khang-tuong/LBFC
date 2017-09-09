using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LBFC.Models.Entities;

namespace LBFC.Models.Repositories
{
    public class Repository<E> : IRepository<E> where E : class
    {
        private LBFCEntities entities = new LBFCEntities();

        public E Add(E entity)
        {
            if (entity != null)
            {
                E e = entities.Set<E>().Add(entity);
                entities.SaveChanges();
                return e;
            }
            return null;
        }

        public void Delete(E entity)
        {
            if (entity != null)
            {
                entities.Set<E>().Remove(entity);
                entities.SaveChanges();
            }
        }

        public E Get<TKey>(TKey id)
        {
            return entities.Set<E>().Find(id);
        }

        public List<E> GetAll()
        {
            return entities.Set<E>().ToList();
        }

        public E SingleOrDefault(Func<E, bool> predicate)
        {
            return entities.Set<E>().SingleOrDefault(predicate);
        }

        public void Update(E entity)
        {
            if (entity != null)
            {
                entities.SaveChanges();
            }
        }

    }
}