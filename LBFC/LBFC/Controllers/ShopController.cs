using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LBFC.Models.Entities;
using LBFC.Models.ViewModels;
using LBFC.Models.Services;
using AutoMapper;

namespace LBFC.Controllers
{
    public class ShopController : Controller
    {
        // GET: Shop
        public ActionResult Index()
        {
            IShopService service = new ShopService();
            List<Shop> shops = service.GetAll();
            return View(shops);
        }

        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Create(ShopCreateViewModel model)
        {
            Shop shop = new Shop();
            shop.Name = model.Name;
            shop.Address = model.Address;
            shop.Latitude = model.Latitude;
            shop.Longitude = model.Longtitude;
            IShopService service = new ShopService();
            shop = service.Create(shop);
            return Json(new { shop = shop, status = true });
        }

        [HttpGet]
        public JsonResult NearbyShop(float longtitude, float latitude)
        {
            IShopService service = new ShopService();
            return Json(service.GetNearbyShop(longtitude, latitude), JsonRequestBehavior.AllowGet);
        }
    }
}