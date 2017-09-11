using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LBFC.Models.Services;

namespace LBFC.Controllers
{
    public class ProductController : Controller
    {
        // GET: Product
        public ActionResult Index()
        {
            return View();
        }

        public string Get()
        {
            IProductService service = new ProductService();
            return service.GetByShopId(1)[0].Name;
        }
    }
}