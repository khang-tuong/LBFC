using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LBFC.Models.ViewModels;
using LBFC.Models.Entities;

namespace LBFC.Models.Services
{
    public partial interface IShopService
    {
        List<ShopViewModel> GetNearbyShop(double longtitude, double latitude);
        List<Shop> GetActive();
    }

    public partial class ShopService
    {
        public List<Shop> GetActive()
        {
            return this.repo.Get(q => q.IsActive == true).ToList();
        }

        public List<ShopViewModel> GetNearbyShop(double longtitude, double latitude)
        {
            double minLong = longtitude != 0 ? longtitude - 0.02 : -179.999;
            double minLat = latitude != 0 ? latitude - 0.02 : -179.999;
            double maxLong = longtitude != -179.999 ? longtitude + 0.02 : 0;
            double maxLat = latitude != -89.999 ? latitude + 0.02 : 0;

            var result = this.GetActive().Where(
                q => minLong <= q.Longitude && q.Longitude <= maxLong
                && minLat <= q.Latitude && q.Latitude <= maxLat);
            var result2 = result.Select(q => new ShopViewModel() {
                    Name = q.Name,
                    Address = q.Address,
                }).ToList();
            return result2;
        }

    }
}