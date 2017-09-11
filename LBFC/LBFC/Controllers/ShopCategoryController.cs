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
    }
}