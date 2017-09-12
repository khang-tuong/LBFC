using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LBFC.Models.Entities;

namespace LBFC.Models.Services
{
    public partial interface IShopCategoryService
    {
        List<ShopCategory> GetActive();
    }
    public partial class ShopCategoryService
    {
        public List<ShopCategory> GetActive()
        {
            return this.repo.Get(q => q.IsActive == true);
        }
    }
}