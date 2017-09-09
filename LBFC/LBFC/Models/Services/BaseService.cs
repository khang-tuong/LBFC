using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;
using LBFC.Models.Repositories;

namespace LBFC.Models.Services
{
    public abstract class BaseService<E> where E : class
    {
        protected IRepository<E> repo;

        public BaseService(E e)
        {
            this.repo = new Repository<E>();
        }

        public E GetById(int id) {
            return this.repo.Get<int>(id);
        }
    }
}
