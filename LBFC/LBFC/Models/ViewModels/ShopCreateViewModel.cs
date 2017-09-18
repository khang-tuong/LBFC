using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LBFC.Models.ViewModels
{
    public class ShopCreateViewModel
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public double Latitude { get; set; }
        public double Longtitude { get; set; }
    }
}