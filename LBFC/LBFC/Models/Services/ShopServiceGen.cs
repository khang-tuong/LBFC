//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace LBFC.Models.Services
{
    using System;
    using System.Collections.Generic;
    using LBFC.Models.Entities;
    
    
    public partial interface IShopService : IBaseService<Shop>
    {
    }
    
    public partial class ShopService :  BaseService<Shop>, IShopService
    {
        public ShopService() : base()
        {
        }
    }
}
