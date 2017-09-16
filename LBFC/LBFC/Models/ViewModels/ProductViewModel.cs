using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LBFC.Models.ViewModels
{
    public class ProductViewModel
    {
        public string Name { get; set; }
        public decimal? Price { get; set; }
        public string ImageLink { get; set; }
    }
}