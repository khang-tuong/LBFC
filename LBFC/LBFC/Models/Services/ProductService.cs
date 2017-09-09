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
    }

    public partial class ProductService
    {
        public List<Product> GetByShopId(int shopId)
        {
            return this.repo.Get(q => q.ShopId == shopId).ToList();
        }
    }
}