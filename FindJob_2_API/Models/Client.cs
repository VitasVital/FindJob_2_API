using System;
using System.Collections.Generic;

#nullable disable

namespace FindJob_2_API.Models
{
    public partial class Client
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int? CityId { get; set; }
        public DateTime? DateBirth { get; set; }
        public int? GenderId { get; set; }
        public int? CitizenshipId { get; set; }
        public string TelephoneNumber { get; set; }
        public int? RoleId { get; set; }
    }
}
