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
    
    
    public partial interface IAspNetUserLoginService : IBaseService<AspNetUserLogin>
    {
    }
    
    public partial class AspNetUserLoginService :  BaseService<AspNetUserLogin>, IAspNetUserLoginService
    {
        public AspNetUserLoginService(AspNetUserLogin e) : base(e)
        {
        }
    }
}
