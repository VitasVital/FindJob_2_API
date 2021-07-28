using System;
using System.Collections.Generic;

#nullable disable

namespace FindJob_2_API.Models
{
    public partial class Response
    {
        public int Id { get; set; }
        public int? ClientId { get; set; }
        public int? VacancyId { get; set; }
    }
}
