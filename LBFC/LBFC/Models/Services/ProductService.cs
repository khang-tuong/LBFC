using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LBFC.Models.Entities;
using AutoMapper;
using LBFC.Models.ViewModels;

namespace LBFC.Models.Services
{
    public partial interface IProductService
    {
        List<Product> GetByShopId(int shopId);
        List<Product> GetActive(Func<Product, bool> predicate);
        List<ProductViewModel> GetRecommend(int amount);
        List<Product> GetActive();
    }

    public partial class ProductService
    {
        public List<Product> GetByShopId(int shopId)
        {
            return this.repo.Get(q => q.ShopId == shopId).ToList();
        }

        public List<Product> GetActive()
        {
            return this.repo.Get(q => q.IsActive == true);
        }

        public List<Product> GetActive(Func<Product, bool> predicate)
        {
            return this.repo.Get(q => q.IsActive == true).Where(predicate).ToList();
        }

        public List<ProductViewModel> GetRecommend(int amount)
        {
            var result = this.GetActive().OrderByDescending(q => q.Rating).Take(amount).Select(q => new ProductViewModel() {
                Name = q.Name,
                Price = q.Price,
                ImageLink = q.ImageLinks.SingleOrDefault(z => z.ProductId == q.Id).Link,
            }).ToList();
            return result;
        }

    }
}