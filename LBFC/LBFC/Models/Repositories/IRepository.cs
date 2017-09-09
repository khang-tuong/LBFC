using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LBFC.Models.Entities;
using System.Data.Entity;
using System.Linq.Expressions;

namespace LBFC.Models.Repositories
{
    public interface IRepository<E>
    {
        List<E> GetAll();
        E Add(E entity);
        void Delete(E entity);
        void Update(E entity);
        E SingleOrDefault(Func<E, bool> predicate);
        E Get<TKey>(TKey id);
    }

}