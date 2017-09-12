using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LBFC.Models.Entities;

namespace LBFC.Models.Services
{
    public partial interface IProductService
    {
        List<Product> GetByShopId(int shopId);
        List<Product> GetActive(Func<Product, bool> predicate);
    }

    public partial class ProductService
    {
        public List<Product> GetByShopId(int shopId)
        {
            return this.repo.Get(q => q.ShopId == shopId).ToList();
        }
    }
}