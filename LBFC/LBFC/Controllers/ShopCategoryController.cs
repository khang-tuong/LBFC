using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LBFC.Models.Services;

namespace LBFC.Controllers
{
    public class ShopCategoryController : Controller
    {
        // GET: ShopCategory
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetActive()
        {
            IShopCategoryService service = new ShopCategoryService();
            return Json(service.GetActive(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Create()
        {
            IShopCategoryService service = new ShopCategoryService();
            service.Create(new Models.Entities.ShopCategory() { IsActive = true, Name = "New" });
            return Json("okay", JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update()
        {
            IShopCategoryService service = new ShopCategoryService();
            Models.Entities.ShopCategory c = service.GetById(2);
            c.Name = "Newwwwwwww";
            service.Update(c);
            return Json(service.GetById(2), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete()
        {
            IShopCategoryService service = new ShopCategoryService();
            Models.Entities.ShopCategory c = service.GetById(2);
            service.Delete(c);
            return Json(service.GetById(2), JsonRequestBehavior.AllowGet);
        }
    }
}