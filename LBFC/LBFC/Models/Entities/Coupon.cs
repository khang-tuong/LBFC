//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace LBFC.Models.Entities
{
    using System;
    using System.Collections.Generic;
    
    public partial class Coupon
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Nullable<short> Type { get; set; }
        public Nullable<decimal> Amount { get; set; }
        public Nullable<int> GiftId { get; set; }
        public Nullable<int> CampaignId { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public string Code { get; set; }
        public Nullable<int> Quantity { get; set; }
    }
}